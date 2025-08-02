import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet"

import { useState, useEffect, useRef } from "react";
import { Backdrop } from "../utils/backdrop";
import { nm } from "../utils/note_manager";
import { idm } from "../utils/indexeddb_manager";
import { DialogTitle } from "@radix-ui/react-dialog";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime"
import { Check, Copy, Edit } from "lucide-react";
import { Toast } from "../utils/toast";

export function Sidebar() {
    const [sheetOpen, setSheetOpen] = useState(false)
    const editing = useRef(false)

    useEffect(() => {

        const toggleSettings = (e) => {
            if (e.keyCode === 74 && e.ctrlKey) {
                e.preventDefault();
                editing.current = false 

                setSheetOpen(prev => !prev);
                document.getElementById("textarea").focus()
            }
        };

        window.addEventListener("keydown", toggleSettings);
        return () => window.removeEventListener("keydown", toggleSettings);
    }, []);

    const SheetContentBody = () => {

        let key = nm.getCurrent()
        let timeout = useRef(null)

        const [data, setData] = useState(null)

        useEffect(() => {
            if (idm.getDB() != null) idm.findItem(key).then(r => setData(r))
        }, []) 

        const copy = () => {
            let parent = document.getElementById("uuidCopy")

            navigator.clipboard.writeText(data.key)

            if (timeout.current == null) {
                parent.children[0].classList.toggle("hidden")
                parent.children[1].classList.toggle("hidden")

                timeout.current = setTimeout(() => {
                    parent.children[0].classList.toggle("hidden")
                    parent.children[1].classList.toggle("hidden")
                    timeout.current = null
                }, 5000)
            } else {
                clearTimeout(timeout.current)

                timeout.current = setTimeout(() => {
                    parent.children[0].classList.toggle("hidden")
                    parent.children[1].classList.toggle("hidden")
                    timeout.current = null
                }, 5000)
            }
        }


        const edit = () => {
            let parent = document.getElementById("sheetHeader")
            let inputValue = document.getElementById("sheetHeaderInput").value

            if (inputValue == "") {
                Toast.error("Can't have note name as an empty string")
                parent.children[1].focus()

                return 
            }

            parent.children[0].classList.toggle("hidden")
            parent.children[1].classList.toggle("hidden")

            parent.children[2].classList.toggle("hidden")
            parent.children[3].classList.toggle("hidden")

            if (editing.current == true) {

                if (inputValue != data.name) {
                    Toast.success("Changed note name")
                    let current = nm.getCurrent()
    
                    document.getElementById("sheetHeader").children[0].innerText = inputValue
                    nm.updateNote(current, inputValue, data.content)
                } 

            } else {
                parent.children[1].focus()
            }

            editing.current = !editing.current
        }

        if (data != null) {

            let words = data.content.split(" ").filter(word => word != "").length

            console.log(words)
            return (
                <>
                    <div className="mt-4 items-center flex flex-wrap" id="sheetHeader">
                        <SheetTitle className="text-2xl line-clamp-6">{data.name}</SheetTitle>
                        <input defaultValue={data.name} id="sheetHeaderInput" className="hidden text-2xl outline-none font-semibold bg-transparent border-b-2 pb-1 px-1 border-[hsl(var(--text))]"></input>
                        <Edit onClick={() => edit()} className="ml-2 mt-0 cursor-pointer"></Edit>
                        <Check onClick={() => edit()} className="hidden ml-2 mt-0 cursor-pointer"></Check>
                    </div>
                    <div className="faded text-sm">
                        <div className="mt-2">
                            <p className="text-base">Info</p>
                            <p>Creation Date: {formatDate(data.creation_date)}</p>
                            <p>Last Edited: {formatDate(data.creation_date)}</p>
                            <div className="flex justify-between items-center">
                                <p>Key: {data.key} </p>
                                <div className="w-4 h-4 hover:cursor-pointer" id="uuidCopy" onClick={() => copy()}>
                                    <Copy className="absolute" size={16}></Copy>
                                    <Check className="absolute hidden" size={16}></Check>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-base">Count</p>
                            <div className="flex justify-between">
                                <p>Words:</p>
                                <p>{words.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Characters:</p>
                                <p>{data.content.length.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Characters excluding spaces:</p>
                                <p>{data.content.replace(" ", "").length.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-base">Speaking</p>
                            <div className="flex justify-between">
                                <p>Slow (100 WPM):</p>
                                <p>{formatTime(words / 100)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Average (130 WPM): </p>
                                <p>{formatTime(words / 130)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Fast (160 WPM):</p>
                                <p>{formatTime(words / 160)}</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-base">Reading</p>
                            <div className="flex justify-between">
                                <p>Slow (150 WPM):</p>
                                <p>{formatTime(words / 150)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Average (250 WPM): </p>
                                <p>{formatTime(words / 250)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Fast (400 WPM):</p>
                                <p>{formatTime(words / 400)}</p>
                            </div>
                        </div>
                        <p className="muted text-xsl">Based on this <a href="https://wordstotime.com/" className="accent-text pointer-events-auto">website.</a></p>
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} modal={false} className>
            <DialogTitle></DialogTitle>
            <Backdrop open={sheetOpen}></Backdrop>
            <SheetContent className="[&>button]:hidden text" onOpenAutoFocus={(e) => {
                e.preventDefault()
                document.activeElement.blur()
            }}>
                <SheetContentBody></SheetContentBody>
            </SheetContent>
        </Sheet>
    )
}