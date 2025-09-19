import uuidv4 from "./uuidv4"
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

    getKeys() {
        return this.keys
    }

    getDefault() {
        return this.def
    }

    updateKeys() {
        idm.putItem(this.keys)
    }

    createNote(name, isDefault = false) {
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
                this.current = r.key

                this.keys[r.key] = {
                    "default": isDefault,
                    "details": {
                        "name": r.name,
                        "creation_date": r.creation_date,
                        "last_edited": r.last_edited,
                    }
                }

                this.update_textarea(r.key)
                resolve(item)
            }).catch(error => {
                reject(error)
            })
        })
    }

    switchToNote(key) {
        this.update_textarea(key)
        this.current = key
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

            this.keys[key].details = {
                "name": item.name,
                "creation_date": r.creation_date,
                "last_edited": item.last_edited,
            }           

            return idm.putItem(item)
        })
    }

    delete_note(key) {
        if (this.def == key) {
            idm.deleteItem(key).then(r => {
                delete this.keys[key]

                this.createNote("default", true).then(r => {
                    this.def = r.key
                    this.updateKeys()
                })
            });
        } else {
            idm.deleteItem(key)
            delete this.keys[key]
            
            this.updateKeys()
        }
    }

    init_notes(update_textarea) {
        this.update_textarea = update_textarea

        idm.findItem("keys").then(r => {
            if (r == undefined) {
                this.keys["key"] = "keys"
                this.createNote("default", true).then(r => {
                    this.def = r.key
                    this.updateKeys()
                })
            } else {
                this.keys = r

                for (let key of Object.keys(this.keys)) {
                    if (this.keys[key].default) {
                        this.def = key
                    }
                    
                }
                
                let most_recent = Object.keys(this.keys)
                .filter(key => key != 'key')
                .map(key => [this.keys[key].details.last_edited, key])
                .sort((a, b) => b[0] - a[0])[0]
                
                this.current = most_recent[1]
                this.update_textarea(most_recent[1])
            }
        })
    }
}

export const nm = new NM()