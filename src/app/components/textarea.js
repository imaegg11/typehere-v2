import { useEffect, useState } from "react"
import uuidv4 from "../utils/uuidv4"
import { IDM } from "../utils/indexeddb_manager"
import { Toast } from "@radix-ui/react-toast"

export function Textarea() {

    let idm = new IDM("typehere")

    let keys = {}
    let def = null

    const createNote = (name) => {
        let currentTime = Date.now()

        let item = {
            "key": uuidv4(),
            "name": name,
            "content": "",
            "creation_date": currentTime,
            "last_edited": currentTime,
        }

        return idm.putItem(item)
    }

    const updateNote = (key, name, content) => {
        console.log(content)
        return idm.findItem(key).then(r => {

            if (r == undefined) {
                Toast.error(`No note found with key ${key}`)
                return
            }

            let item = {
                "key": key,
                "name": name,
                "content": content,
                "creation_date": r.creation_date,
                "last_edited": Date.now(),
            }

            return idm.putItem(item)
        })
    }

    const delete_note = (key) => {
        if (def == key) {
            idm.deleteItem(key).then(r => {
                createNote("default").then(r => {
                    keys[r.key] = {
                        "default": true
                    }

                    def = r.key
                })
            });

        }
    }

    const update_textarea = (key) => {
        idm.findItem(key).then(r => {
            if (r == undefined) Toast.error(`No note with key of ${key}`)
            else document.getElementById("textarea").value = r.content
        })
    }

    const init_notes = () => {
        idm.findItem("keys").then(r => {
            if (r == undefined) {
                createNote("default").then(r => {
                    keys = {
                        "key": "keys",
                        [r.key]: {
                            "default": true
                        }
                    }

                    idm.putItem(keys)
                })
            } else {
                keys = r
                for (let key of Object.keys(keys)) {
                    if (keys[key].default) { def = key }
                }

                update_textarea(def)
            }
        })
    }

    const onType = (value) => {
        updateNote(def, "default", value)
    }

    useEffect(() => {
        idm.init().then(r => {
            init_notes()
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