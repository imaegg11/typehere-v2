import { useSettings } from "./settings/setting_provider";
import { useEffect } from "react";

import { 
    ThemeSetting, 
    AboutSetting, 
    ExportSetting, 
    ImportSetting, 
    CSSSetting
} from "./settings/all_settings"

export function SetupSettings({ onLoad }) {
    const settings = useSettings()

    // SETTINGS HERE

    const about = AboutSetting("About", "About")
    const theme = ThemeSetting("Theme", "Appearance")
    const exp = ExportSetting("Export Setting", "Settings")
    const imp = ImportSetting("Import Setting", "Settings")

    const css = CSSSetting("Custom CSS", "CSS")

    const all_settings = [
        theme,
        css,
        imp,
        exp,
        about,
    ]

    const setting_types_need_saving = [
        "Appearance",
        "Widgets",
        "CSS"
    ]

    // SETTINGS END HERE

    useEffect(() => {

        for (let setting of all_settings) {
            settings.add(setting)
        }

        for (let setting_type of setting_types_need_saving) {
            settings.addNeedSaving(setting_type)
        }

        settings.load()
        onLoad()

    }, [settings])

    return null
}
