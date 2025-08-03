import { lsm } from "../../utils/localStorage_manager"

export function Setting(name, type) {

    let updateLocalstorageSettings = null;

    const export_setting = () => {
        let export_object = {
            [name]: get()
        }

        return export_object;
    }
    
    const import_setting = (import_object) => {}

    const load = () => {
        if (lsm.getItem(name) === null) {
            update() // HERE
        } else {
            import_setting(lsm.getItem(name))
        }
    }
    
    const update = (value) => {}

    const save_preferences = () => {
        if (updateLocalstorageSettings !== null) updateLocalstorageSettings()
    }
    
    const get = () => {}

    function Component({ isHidden })  {
        return isHidden ? <div className="hidden"></div> : (
            <div>

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