import { lsm } from '../../utils/localStorage_manager';

export function AboutSetting(name, type) {

    const export_setting = () => {}

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    function Component({ isHidden }) {
        return isHidden ? <div className="hidden"></div> : (
            <div>
                {/* <p className="text-lg font-semibold">{name}</p> */}
                <p className="text mt-4 text-sm">Hi. I'll put something here someday... <br></br>In the meanwhile you can enjoy the random stuff I decide to make</p>
                <p className="mt-4 muted text-sm select-none">© imaegg11 2025 (No I don't actually have a copyright on this)</p>
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
        "render": render, 
        "name": name,
        "type": type 
    }
}