import { Button } from "@/components/ui/button"
import { lsm } from "../../utils/localStorage_manager"
import { globalSettings } from "../settings"
import { Toast } from "@/app/toast"

export function ImportSetting(name, type) {

    const export_setting = () => {
        return {}
    }

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    function Component({ isHidden })  {
        
        const select_file = () => {
            document.getElementById("select").click();
        }

        const import_all = (e) => {
            let file = e.target.files[0]

            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (r) => {
                try {
                    globalSettings.import(JSON.parse(r.target.result));

                    Toast.success("Imported successfully")
                } catch (error) {
                    Toast.error("Something went wrong...");

                    console.log(error)
                }
            }

            reader.onerror = (r) => {
                Toast.error("Something went wrong...")
            }
        }

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">

                <p className="font-semibold">{name}</p>
                <div className="flex justify-between content-center my-2">
                    <div>
                        <p className="content-center text-sm">Import Settings From File</p>
                        <p className="content-center text-xs muted">Warning! You will lose all your current settings!</p>
                    </div>
                    <input id="select" onChange={(e) => import_all(e)} className="hidden" type='file'></input>
					<Button onClick={() => select_file()} variant="outline">Import</Button>
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
        "render": render, 
        "name": name,
        "type": type,
    }
}