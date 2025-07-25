import { SettingsProvider } from "./setting_provider";
import { globalSettings } from "./settings";

import { SetupSettings } from "@/app/settings.config";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useState, useEffect } from "react";

export function DialogSettings({ onClose }) {
    const [settingsOpen, setSettingsOpen] = useState(false)

    const [settingsReady, setSettingsReady] = useState(false)

    useEffect(() => {

        const toggleSettings = (e) => {
            if (e.key === "." && e.ctrlKey) {
                setSettingsOpen(prev => !prev);
            }
        };

        window.addEventListener("keydown", toggleSettings);
        return () => window.removeEventListener("keydown", toggleSettings);
    }, []);

    return (
        <SettingsProvider>
            <SetupSettings onLoad={() => setSettingsReady(true)} />

            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen} modal={false}>
                {settingsOpen && <div data-state={settingsOpen ? "open" : "closed"} className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>}
                <DialogContent className="min-w-fit h-[80vh] [&>button]:hidden" onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }} onCloseAutoFocus={(e) => {
                    onClose()
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
