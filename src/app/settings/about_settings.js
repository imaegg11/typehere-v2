export function AboutSetting(name, type) {

    const export_setting = () => {}

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    const render = (key, r) => {
        return r ? <div className="hidden" key={key}></div> : (
            <div key={key}>
                {/* <p className="text-lg font-semibold">{name}</p> */}
                <p className="mt-4">Hi. I'll put something here someday... </p>
                <p className="mt-4 text-muted-foreground select-none">© imaegg11 2025 (No I don't actually have a copyright on this)</p>
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