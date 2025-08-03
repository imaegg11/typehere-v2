import { Button } from "@/components/ui/button"
import { Toast } from "@/app/utils/toast"
import { idm } from "@/app/utils/indexeddb_manager"
import { nm } from "@/app/utils/note_manager"


export function ImportDB(name, type) {

    const export_setting = () => {
        return {}
    }

    const import_setting = (import_object) => { }

    const load = () => { }

    const update = (value) => { }

    const get = () => { }

    function Component({ isHidden }) {

        const select_file = () => {
            document.getElementById("select-db").click();
        }

        const import_all = (e) => {
            let file = e.target.files[0]

            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (r) => {
                try {
                    idm.getDB().close()
                    const db = indexedDB.deleteDatabase("typehere");

                    db.onblocked = () => {
                        Toast.error("Please close all tabs and then try again")
                    }

                    db.onsuccess = () => {  
                        idm.init().then(res => {
                            let n = 0;

                            let data = JSON.parse(r.target.result)["data"]

                            for (let obj of data) {
                                idm.putItem(obj).then(item => {
                                    n += 1

                                    if (n == data.length) {
                                        nm.init_notes((key) => {
                                            idm.findItem(key).then(result => {
                                                if (result == undefined) Toast.error(`No note with key of ${key}`)
                                                else {
                                                    document.getElementById("textarea").value = result.content
                                                    document.getElementById("textarea").focus()
                                                }
                                            })
                                        })
                                        Toast.success("Imported successfully")
                                    }
                                })
                            }
                        })
                    }

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
                        <p className="content-center text-sm">Import Content From File</p>
                        <p className="content-center text-xs muted">Warning! You will lose all your current content!</p>
                    </div>
                    <input id="select-db" onChange={(e) => import_all(e)} className="hidden" type='file'></input>
                    <Button onClick={() => select_file()} variant="outline">Import</Button>
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
        "render": render,
        "name": name,
        "type": type,
    }
}