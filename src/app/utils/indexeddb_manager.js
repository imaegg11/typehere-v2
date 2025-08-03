import { Toast } from "./toast";

class IDM {
    constructor(db_name) {
        this.db_name = db_name;

        this.db = null;
    }

    getDB() {
        return this.db
    }

    init() {
        return new Promise((resolve, reject) => {
            const open_request = window.indexedDB.open(this.db_name, 1);

            open_request.onsuccess = (e) => {
                this.db = e.target.result
                resolve(this.db)
            };

            open_request.onerror = (e) => {
                Toast.error("Failed to access IndexedDB, check console")
                console.error(e.target.error);
                reject(e.target.error)
            }

            open_request.onupgradeneeded = (e) => {
                this.db = e.target.result;

                this.db.createObjectStore("storage", { keyPath: "key" });
            }
        })
    }

    putItem(item) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("storage", "readwrite");
            const store = tx.objectStore("storage");

            let request = store.put(item);

            request.onsuccess = (e) => {
                resolve(item)
            }

            request.onerror = (e) => {
                Toast.error(`Failed to put item with key ${item.key}\n${e.target.error}`)
                reject(e.target.error);
            }
        })
    }

    findItem(key) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("storage", "readwrite");
            const store = tx.objectStore("storage");
            let request = store.get(key);

            request.onsuccess = (e) => {
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                Toast.error(`Failed to find item with key ${key}\n${e.target.error}`)
                reject(e.target.error);
            }
        })
    }

    deleteItem(key) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("storage", "readwrite");
            const store = tx.objectStore("storage");
            let request = store.delete(key);

            request.onsuccess = (e) => {
                resolve(key)
            }

            request.onerror = (e) => {
                Toast.error(`Failed to delete item with key ${key}\n${e.target.error}`)
                reject(e.target.error);
            }
        })
    }

    exportDB() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction("storage", "readonly");
            const store = tx.objectStore("storage");

            let request = store.getAll();

            request.onerror = (event) => {
                Toast.error("Failed to export content")
                reject(event.target.error)
            };

            request.onsuccess = (event) => {
                resolve(event.target.result)
            };
        })
    }
}

export const idm = new IDM("typehere")