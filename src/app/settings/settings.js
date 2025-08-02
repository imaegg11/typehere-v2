import { useState, useReducer, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Toast } from "../utils/toast";

export function Settings() {
    let settings = [];
    let settingTypesNeedSaving = []
    let isLoaded = false;

    function exportSettings() {
        let export_object = {};

        for (let setting of settings) {
            export_object = { ...export_object, ...setting.export() };
        }

        return export_object;
    }

    function importSettings(import_object) {
        for (let setting of settings) {
            setting.import(import_object[setting.name]);
        }
    }

    function add(setting) {
        if (get(setting.name) == null) settings.push(setting);
    }

    function load() {

        if (isLoaded) return

        for (let setting of settings) {
            setting.load();
        }

        isLoaded = false;
    }

    function remove(name) {
        for (let i = 0; i < settings.length; i++) {
            let setting = settings[i];

            if (setting.name == name) {
                settings.splice(i, 1);
                break;
            }
        }
    }

    function get(name) {
        for (let i = 0; i < settings.length; i++) {
            let setting = settings[i];

            if (setting.name == name) {
                return setting;
            }
        }

        return null;
    }

    function getAll() {
        return settings;
    }

    function addSettingTypeNeedSaving(settingType) {
        settingTypesNeedSaving.push(settingType)
    }

    function Component() {
        const [settingType, setSettingType] = useState(settings.length == 0 ? [] : settings[0].type)

        const settingTypes = settings.length == 0 ? [] : [...new Set(settings.map(setting => setting.type))]

        const clear_all = () => {
            for (let child of document.getElementById("settings-types").children) {
                child.classList.remove("bg-[hsl(var(--background-10))]")
                child.classList.remove("text")
                child.classList.add("muted")
            }
        }

        const handle_type_switch = (event, type) => {
            clear_all()
            event.target.classList.add("bg-[hsl(var(--background-10))]")
            event.target.classList.remove("muted")
            event.target.classList.add("text")
            setSettingType(type)
        }

        const savePreferences = () => {

            settings.filter(setting => setting.type == settingType).map(setting => {
                if (setting.save != null) {
                    setting.save()
                }
            })

            Toast.success("Saved")
        }

        return (
            <div className="h-[60vh]">
                <div className="flex w-[50vw] h-[55vh] pb-4 relative top-0">
                    <div id="settings-types" className="w-1/3 my-2 overflow-y-auto"> {/* TO-DO */}
                        {settingTypes.map((type, index) =>
                            <p className={`${index == 0 ? "bg-[hsl(var(--background-10))] text " : "muted "}px-4 my-1 py-2 rounded-[0.25rem] hover:cursor-pointer hover:bg-[hsl(var(--background-10))] text-sm`} onClick={(e) => handle_type_switch(e, type)} key={type}>{type}</p>
                        )}
                    </div >
                    <Separator className="mx-4" orientation="vertical"></Separator>
                    <ScrollArea type="always" className="w-full my-2 overflow-y-auto px-6">
                        <p className="text-xl text font-semibold mb-4">{settingType}</p>
                        {settings.map(setting =>
                            setting.render(setting.name, setting.type != settingType)
                        )}
                    </ScrollArea>
                </div>
                {settingTypesNeedSaving.includes(settingType) ? <div className="w-full flex justify-end px-4">
                    <Button onClick={() => savePreferences()} className="bg-[hsl(var(--accent-color))] text-[hsl(var(--accent-text))] hover:bg-[hsl(var(--buttons-secondary))]">Save Preferences</Button>
                </div> : <></>}
            </div>
        )
    }

    function render() {
        return <Component key={Math.random()} />
    }

    return {
        "export": exportSettings,
        "import": importSettings,
        "add": add,
        "addNeedSaving": addSettingTypeNeedSaving,
        "load": load,
        "remove": remove,
        "get": get,
        "getAll": getAll,
        "render": render
    };
}

export const globalSettings = new Settings(); 