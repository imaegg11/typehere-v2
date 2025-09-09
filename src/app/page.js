'use client'

import { useState, useEffect } from "react";

import { DialogSettings } from "./settings/dialog_setting";
import { Textarea } from "./components/textarea";
import { CommandComponent } from "./components/command";
import { Sidebar } from "./components/sidebar";
import { Replace } from "./components/replace";


export default function Typehere() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [mounted, setMounted] = useState(false);
    const [settingsReady, setSettingsReady] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div></div>
    }

    return (
        <>
            <CommandComponent></CommandComponent>
            <Textarea></Textarea>
            <Sidebar></Sidebar>
            <Replace></Replace>
            <DialogSettings 
                onClose={() => document.getElementById("textarea").focus()}
                settingsReady={settingsReady}
                setSettingsReady={setSettingsReady}
            ></DialogSettings>
        </>
    )
}
