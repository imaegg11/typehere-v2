import { Switch } from "@/components/ui/switch";
import { lsm } from "../../utils/localStorage_manager"
import { useEffect, useState } from "react";

export function TypehereSetting(name, type) {

    let updateLocalstorageSettings = null;
    let updateAfterImport = null

    let options = {
        "smallWidth": {
            "label": "Enable Small Width",
            "value": false
        },
        "hideScrollbar": {
            "label": "Hide Scrollbar",
            "value": false
        },
        "spellCheck": {
            "label": "Enable Spellcheck",
            "value": false
        },
    }

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }

    const import_setting = (import_object) => {
        update(import_object["options"])

        if (updateAfterImport !== null) updateAfterImport()
    }

    const load = () => {
        if (lsm.getItem(name) === null) {
            update(options)
        } else {
            import_setting(lsm.getItem(name))
        }
    }

    const setClass = (el, cls, add) => {
        if (el.classList.contains(cls) && !add) el.classList.remove(cls)
        else if (!el.classList.contains(cls) && add) el.classList.add(cls)
    }

    const update = (value) => {
        console.log(value)
        options = value

        lsm.setItem(name, get());

        let element = document.getElementById("textarea")

        element.setAttribute("spellcheck", `${options["spellCheck"].value}`);
        setClass(element, "hideScrollbar", options["hideScrollbar"].value)
        setClass(element, "smallWidth", options["smallWidth"].value)
    }

    const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }

    const get = () => {
        return {
            "options": options
        }
    }

    function Component({ isHidden }) {

        const [opt, setOpt] = useState(options)

        const update_opt = (e, key) => {
            let temp = opt 
            temp[key].value = e 

            setOpt(temp)
        }

		updateLocalstorageSettings = () => {
			update(opt);
		}
        
        updateAfterImport = () => setOpt(options)
        
        return isHidden ? <div className="hidden"></div> : (
            <div className="text">
                <p className="font-semibold">{name}</p>
                {
                    Object.keys(opt).map(key => {
                        return (
                            <div className="flex justify-between content-center my-3 text-sm" key={key}>
                                <p className="content-center">
                                    {opt[key].label}
                                </p>
                                <Switch defaultChecked={opt[key].value} onCheckedChange={(e) => update_opt(e, key)} className="mr-2 data-[state=unchecked]:[&>span]:bg-[hsl(var(--text))]" />
                            </div>
                        )
                    })
                }
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
        "type": type
    }
}