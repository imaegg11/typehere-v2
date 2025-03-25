export function Setting(name, type) {

    const export_setting = () => {}

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    const render = (key, r) => {
        return r ? <div className="hidden" key={key}></div> : (
            <div key={key}>

            </div>
        )
    }

    return {
        "export": export_setting,
        "import": import_setting,
        "load": load,
        "update": update,
        "get": get,
        "render": render, 
        "name": name,
        "type": type 
    }
}