import { useEffect } from "react"
import { idm } from "../utils/indexeddb_manager"
import { Toast } from "../utils/toast"
import { nm } from "../utils/note_manager"

export function Textarea() {

    const update_textarea = (key) => {
        idm.findItem(key).then(r => {
            if (r == undefined) Toast.error(`No note with key of ${key}`)
            else {
                document.getElementById("textarea").value = r.content
                document.getElementById("textarea").focus()
            }
        })
    }

    const onType = (value) => {
        nm.updateNote(nm.getCurrent(), nm.getKeys()[nm.getCurrent()].details.name, value).then(r => nm.updateKeys())
    }


    useEffect(() => {
        idm.init().then(r => {
            nm.init_notes(update_textarea)
        })
    })

    return (
        <textarea
            id="textarea"
            autoFocus
            className="font-mono h-[calc(100vh-1px)] w-full outline-none border-none resize-none m-0 bg-inherit p-4 text-lg text"
            onChange={(e) => onType(e.target.value)}
        ></textarea>
    )
}