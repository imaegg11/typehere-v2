'use client'


import { useState, useEffect } from "react";

import { Toast } from "./toast";
import { Time } from "./components/time";
import { Date_C } from "./components/date";
import { SearchBar } from "./components/search";
import { get_settings } from "./settings.config";

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


export default function Home() {

    // TODO: https://stackoverflow.com/questions/77026759/using-next-themes-for-dark-mode-generates-hydration-failed-error

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [mounted, setMounted] = useState(false);

    const settings = get_settings();

    useEffect(() => {
        setMounted(true); 

        settings.load()

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
        <div id="date-div" className="text-[--text] select-none grid place-items-center content-center h-screen w-screen">
            <div className="text-6xl font-medium"><Time></Time></div>
            <Date_C></Date_C>
            <br></br>
            <div className="mt-8 w-1/2 flex justify-center"><SearchBar searchSettings={settings.get("Search Shortcuts").get()}></SearchBar></div>
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogContent hideClose={true} className="min-w-fit" onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }} onCloseAutoFocus={(e) => {
                    document.getElementById("search-bar").focus()
                }}>
                    <DialogHeader>
                        <DialogTitle className="text-[--text] text-3xl">Settings Menu</DialogTitle>
                        <DialogDescription>Manage your preferences here</DialogDescription>
                    </DialogHeader>
                    <settings.render></settings.render>
                </DialogContent>
            </Dialog>
        </div>
    )
}
