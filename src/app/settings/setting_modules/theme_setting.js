import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

import { lsm } from '../../utils/localStorage_manager';

export function ThemeSetting(name, type) {

    let gTheme = "system"
    const { theme, setTheme, systemTheme } = useTheme(gTheme);
    let updateAfterImport = null

    let updateLocalstorageSettings = null;

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }

    const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }

    const import_setting = (import_object) => {
        update(import_object["theme"])

        if (updateAfterImport !== null) updateAfterImport()
    }

    const load = () => {
        if (lsm.getItem(name) === null) {
            update("system")
        } else {
            import_setting(lsm.getItem(name))
        }
    }

    const update = (value) => {

        gTheme = value

        lsm.setItem(name, get());

        setTheme(value);
        // Bruh it literally just works (I'm going to have to fix something to get custom themes working eventually though)

        // if (value == "system") {
        //     value = systemTheme;
        // }

        // document.documentElement.classList.remove("light", "dark", "system");
        // document.documentElement.classList.add(` ${resolvedTheme}`.slice(1));
    };

    const get = () => {
        return {
            "theme": gTheme
        };
    }

    function Component({ isHidden }) {
        let data = [
            {
                "themeName": "light",
                "theme": "Light",
                "selected": false
            },
            {
                "themeName": "dark",
                "theme": "Dark",
                "selected": false
            },
            {
                "themeName": "system",
                "theme": "System",
                "selected": false
            }
        ]

        for (let e of data) {
            if (e.themeName == gTheme) {
                e.selected = true;
                break;
            }
        }

        const [themes, setThemes] = useState(data)

        let update_theme = (themeName) => {

            setThemes(themes.map(value => {
                value.selected = false;

                if (value.themeName == themeName) value.selected = true;

                return value;
            }))
        }

        updateLocalstorageSettings = () => update(themes.filter(theme => theme.selected == true)[0].themeName)
        updateAfterImport = () => update_theme(gTheme)

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">
                <p className="font-semibold">{name}</p>
                <div className="flex justify-between content-center items-center">
                    <div id="themes" className="text-sm flex flex-wrap justify-center items-center gap-1 w-full mx-2 mt-2 ring-1 p-1 ring-[hsl(var(--background-10))] rounded-[5px]">
                        {
                            themes.map((value, index) => {

                                return (
                                    <div
                                        key={index}
                                        className={`${value.selected ? "ring-2 text" : "muted hover:text-[hsl(var(--text))]"}` + " transition-all cursor-pointer ring-[hsl(var(--accent-color))] py-2 px-6 text-center rounded-[5px] flex-1 select-none whitespace-nowrap"}
                                        onClick={() => update_theme(value.themeName)}
                                        style={{
                                            backgroundColor: value.selected ? "color-mix(in srgb, hsl(var(--accent-color)) 15%, transparent)" : ""
                                        }}
                                    >
                                        <p>{value.theme}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    const render = (key, r) => <Component key={key} isHidden={r} />

    return {
        "export": export_setting,
        "import": import_setting,
        "load": load,
        "update": update,
        "get": get,
        "save": save_preferences,
        "render": render,
        "name": name,
        "type": type,
    }
}