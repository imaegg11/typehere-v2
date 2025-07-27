const { idm } = require("./indexeddb_manager")
const { Toast } = require("./toast")


export class NM {
    constructor() {
        this.keys = {}
        this.def = null
        this.update_textarea = null

        this.current = null;
    }

    getCurrent() {
        return this.current
    }

    createNote(name) {
        return new Promise((resolve, reject) => {
            let currentTime = Date.now()
    
            let item = {
                "key": uuidv4(),
                "name": name,
                "content": "",
                "creation_date": currentTime,
                "last_edited": currentTime,
            }
    
            idm.putItem(item).then(r => {
                this.current = this.def 
                this.keys[item] = {
                    "default": name == "default"
                }

                resolve(item)
            }).catch(error => {
                reject(error)
            })
        })
    }

    updateNote(key, name, content) {
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

    delete_note(key) {
        if (this.def == key) {
            idm.deleteItem(key).then(r => {
                this.createNote("default").then(r => {

                    this.def = r.key
                })
            });

        }
    }

    init_notes(update_textarea) {
        this.update_textarea = update_textarea

        idm.findItem("keys").then(r => {
            if (r == undefined) {
                this.createNote("default").then(r => {
                    this.keys["key"] = "keys"
                    this.def = r.key

                    idm.putItem(this.keys)
                })
            } else {
                this.keys = r
                for (let key of Object.keys(this.keys)) {
                    if (this.keys[key].default) {
                        this.def = key
                        this.current = this.def
                    }
                }

                this.update_textarea(this.def)
            }
        })
    }
}