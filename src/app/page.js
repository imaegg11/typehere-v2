'use client'


import { useState, useEffect } from "react";

import { SettingsProvider } from "./settings/setting_provider";
import { globalSettings } from "./settings/settings";
import { SetupSettings } from "./settings.config";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function Typehere() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [mounted, setMounted] = useState(false);

    const [settingsReady, setSettingsReady] = useState(false)

    useEffect(() => {
        setMounted(true);

        const toggleSettings = (e) => {
            if (e.key === "." && e.ctrlKey) {
                setSettingsOpen(prev => !prev);
            }
        };

        window.addEventListener("keydown", toggleSettings);
        return () => window.removeEventListener("keydown", toggleSettings);
    }, []);

    if (!mounted) {
        return <div></div>
    }

    return (
        <SettingsProvider>
            <SetupSettings onLoad={() => setSettingsReady(true)} />
            <style id="styleLocation"></style>
            <textarea id="textarea" className="font-mono h-[calc(100vh-1px)] w-full outline-none border-none resize-none m-0 bg-inherit p-4 text-lg"></textarea>

            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen} modal={false}>
                {settingsOpen && <div data-state={settingsOpen ? "open" : "closed"} className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>}
                <DialogContent className="min-w-fit h-[80vh] [&>button]:hidden" onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }} onCloseAutoFocus={(e) => {
                    document.getElementById("textarea").focus()
                }}>
                    <DialogHeader>
                        <DialogTitle className="text text-3xl">Settings Menu</DialogTitle>
                        <DialogDescription className="muted">Manage your preferences here</DialogDescription>
                    </DialogHeader>
                    {settingsReady ? globalSettings.render() : <p>Loading settings...</p>}
                </DialogContent>
            </Dialog>
        </SettingsProvider>

    )
}
