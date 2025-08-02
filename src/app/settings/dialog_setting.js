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
import { Backdrop } from "../utils/backdrop";

export function DialogSettings({ onClose, settingsReady, setSettingsReady }) {
    const [settingsOpen, setSettingsOpen] = useState(false)

    useEffect(() => {

        const toggleSettings = (e) => {
            if (e.keyCode === 190 && e.ctrlKey) {
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
                <Backdrop open={settingsOpen}></Backdrop>
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
