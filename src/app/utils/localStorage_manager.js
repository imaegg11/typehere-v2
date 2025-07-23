export class localStorageManager {
    constructor(website_name) {
        this.website_name = website_name;
    }

    getItem(setting) {
        if (localStorage.getItem(this.website_name) == null || localStorage.getItem(this.website_name) == "null" || localStorage.getItem(this.website_name) == undefined || localStorage.getItem(this.website_name) == "undefined") {
            localStorage.setItem(this.website_name, "{}");
            return null;
        } else {
            let settings = JSON.parse(localStorage.getItem(this.website_name));

            if (settings[setting] === undefined) {
                return null;
            } else {
                return settings[setting];
            }
        }
    }

    setItem(setting, value) {
        if (localStorage.getItem(this.website_name) == null) {
            localStorage.setItem(this.website_name, "{}")
        } 

        let settings = JSON.parse(localStorage.getItem(this.website_name));

        settings[setting] = value;

        localStorage.setItem(this.website_name, JSON.stringify(settings))

    }
}

export const lsm = new localStorageManager("home")