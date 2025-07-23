'use client'

import { useState, useEffect } from "react";

import { DialogSettings } from "./settings/settings_component";


export default function Typehere() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div></div>
    }

    return (
        <>
            <textarea id="textarea" className="font-mono h-[calc(100vh-1px)] w-full outline-none border-none resize-none m-0 bg-inherit p-4 text-lg"></textarea>
            <DialogSettings onClose={() => document.getElementById("textarea").focus()}></DialogSettings>
        </>
    )
}
