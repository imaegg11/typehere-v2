import { useEffect, useState } from 'react'
import { lsm } from '../../utils/localStorage_manager';

export function CSSSetting(name, type) {

    let customCSS = "";

    let updateLocalstorageSettings = null;

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }

    const import_setting = (import_object) => {
        update(import_object["css"])
    }
    
    const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }

    const load = () => {
        if (lsm.getItem(name) === null) {
            update("")
        } else {
            import_setting(lsm.getItem(name))
        }
    }

    const update = (value) => {
        customCSS = value;

        lsm.setItem(name, get());
        
        document.getElementById("styleLocation").innerText = customCSS; 
    }
    
    const get = () => {
        return {
            "css": customCSS 
        }
    }

    function Component({ isHidden }) {

        const [css, setCSS] = useState(customCSS)

        useEffect(() => {
            setCSS(customCSS)
        }, [customCSS])

        updateLocalstorageSettings = () => update(css)

        const update_css = (e) => {
            let value = e.target.value

            setCSS(value)
        }

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">
                <p className="font-semibold">{name}</p>

                <div className="flex justify-between content-center my-2 flex-wrap">
                    <textarea 
                        autoFocus={false}
                        className="bg-inherit w-full h-[17rem] border border-gray-750 select-none rounded-sm p-2 focus-within:outline-none text-sm resize-none"
                        defaultValue={css}
                        onChange={(e) => update_css(e)}    
                    ></textarea>
                    <p className='muted text-sm mt-2'>Shhhhhh, I'll add syntax highlighting and other QOL features eventually...</p>
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
        "type": type 
    }
}