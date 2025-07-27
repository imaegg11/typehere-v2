import { useEffect, useState } from "react"
import uuidv4 from "../utils/uuidv4"
import { idm } from "../utils/indexeddb_manager"
import { Toast } from "@radix-ui/react-toast"
import { NM } from "../utils/note_manager"

export function Textarea() {

    const nm = new NM()

    const update_textarea = (key) => {
        idm.findItem(key).then(r => {
            if (r == undefined) Toast.error(`No note with key of ${key}`)
            else document.getElementById("textarea").value = r.content
        })
    }

    const onType = (value) => {
        nm.updateNote(nm.getCurrent(), "default", value)
    }


    useEffect(() => {
        idm.init().then(r => {
            nm.init_notes(update_textarea)
        })
    })

    return (
        <textarea
            id="textarea"
            className="font-mono h-[calc(100vh-1px)] w-full outline-none border-none resize-none m-0 bg-inherit p-4 text-lg"
            onChange={(e) => onType(e.target.value)}
        ></textarea>
    )
}