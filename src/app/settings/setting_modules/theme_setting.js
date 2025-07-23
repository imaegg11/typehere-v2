import { useTheme } from "next-themes";
import { Check, Laptop } from "lucide-react";
import { useEffect, useState } from "react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { lsm } from '../../utils/localStorage_manager';

export function ThemeSetting(name, type) {

    let gTheme = "system"
    const { theme, setTheme, systemTheme } = useTheme(gTheme);

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
    }

    const load = () => {
        if (lsm.getItem("theme_setting") === null) {
            update("system")
        } else {
            import_setting(lsm.getItem("theme_setting"))
        }
    }

    const update = (value) => {
        
        gTheme = value 
        
        lsm.setItem("theme_setting", get());

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
                "theme": "light",
                "displayColor": "white",
                "children": <></>,
                "selected": false
            },
            {
                "themeName": "dark",
                "theme": "dark",
                "displayColor": "black",
                "children": <></>,
                "selected": false
            },
            {
                "themeName": "system",
                "theme": systemTheme,
                "displayColor": "transparent",
                "children": <Laptop className="fixed text"></Laptop>,
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

        useEffect(() => {
            update_theme(gTheme)
        }, [gTheme])

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">
                <p className="font-semibold">{name}</p>
                <div className="flex justify-between content-center items-center">
					<p className="content-center text-sm">Display Theme</p>
                    <div id="themes" className="flex items-center">
                        {
                            themes.map((value, index) => {
                                return (
                                    <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div 
                                                    className={`h-8 w-8 ml-auto rounded-md mr-2 border-2 cursor-pointer flex justify-center items-center ${value.selected ? "border-green-600" : "border-[#595959]"}`}
                                                    style={{
                                                        backgroundColor: value.displayColor
                                                    }}
                                                    onClick={() => update_theme(value.themeName)}
                                                >
                                                    {value.children}
                                                    {/* <Check size={20} className={`${value.selected ? "" : "hidden"} fixed]`} color="#16a34a"></Check> */}
                                                    <div className={`${value.selected ? "" : "hidden"} absolute bg-green-600 rounded-full h-2 w-2`}></div>
                                                    
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{value.themeName} theme</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )
                                
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    const render = (key, r) => <Component key={key} isHidden={r}/>

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