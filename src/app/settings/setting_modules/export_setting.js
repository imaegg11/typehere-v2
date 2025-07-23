import { Button } from "@/components/ui/button"
import { lsm } from "../../utils/localStorage_manager"
import { globalSettings } from "../settings"
import { Toast } from "@/app/utils/toast"

export function ExportSetting(name, type) {

    const export_setting = () => {
        return {}
    }

    const import_setting = (import_object) => {}

    const load = () => {}

    const update = (value) => {}
    
    const get = () => {}

    function Component({ isHidden })  {
        const download_file = (content, fileName, contentType) => {
            var a = document.createElement("a");
            var file = new Blob([content], {type: contentType});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }

        const export_all = () => {
            download_file(JSON.stringify(globalSettings.export()), "settings.json", "JSON");

            Toast.success("Exported Successfully")
        }

        return isHidden ? <div className="hidden"></div> : (
            <div className="text mb-4">

                <p className="font-semibold">{name}</p>

                <div className="flex justify-between content-center my-2">
					<p className="content-center text-sm">Export Settings To File</p>
					<Button onClick={() => export_all()} variant="outline">Export</Button>
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
        "type": type 
    }
}