import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"

import { BookPlus, Book, Trash, Plus, } from "lucide-react";
import { useEffect, useState } from "react"
import { nm } from "../utils/note_manager";
import { idm } from "../utils/indexeddb_manager";
import Fuse from "fuse.js";
import { Backdrop } from "../utils/backdrop";
import { formatDate } from "../utils/formatDate";


export function CommandComponent() {

    const [cmdOpen, setCMDOpen] = useState(false)
    const [value, setValue] = useState("")

    const resetCommand = (e) => {
        setValue("")
        setCMDOpen(e);
        document.getElementById("textarea").focus()
    }

    useEffect(() => {
        const toggleCMD = (e) => {
            if (e.keyCode === 75 && e.ctrlKey) {
                e.preventDefault();
                resetCommand(prev => !prev);
            } else if (e.key == "d" && e.ctrlKey) {
                e.preventDefault();
                // Well fuck nvm we are so back :speaking_head:  
                document.execCommand('insertText', false, "hi")
            }
        };

        window.addEventListener("keydown", toggleCMD);
        return () => window.removeEventListener("keydown", toggleCMD);
    })

    const create = () => {
        nm.createNote(value).then(r => nm.updateKeys())
    }

    const compareFn = (a, b) => {
        a = a.last_edited
        b = b.last_edited

        if (a > b) {
            return -1;
        } else if (a < b) {
            return 1;
        }
        return 0;
    }

    const fuseSearch = () => {

        let keys = nm.getKeys()

        let data = Object.keys(keys).filter(key => key != "key").map(key => {
            return { "key": key, "name": keys[key].details.name, "last_edited": keys[key].details.last_edited }
        })

        data.sort(compareFn)

        if (value == "") {
            return data.map(item => { return { "item": item } })
        }

        let options = {
            "isCaseSensitive": false,
            "keys": ["name"]
        }

        const fuse = new Fuse(data, options)

        return fuse.search(value).sort()
    }

    const getCommand = () => {

        const searchResults = fuseSearch()

        return (
            <CommandList>
                <CommandGroup heading="Notes" className="commandGroup">
                    {
                        searchResults.map(value => {
                            let data = nm.getKeys()[value.item.key].details

                            const animateWidthIn = (key) => {
                                let e = document.getElementById(key)
                                const fullWidth = e.children[1].scrollWidth;
                                e.children[1].style.width = fullWidth + 'px';
                            }

                            const animateWidthOut = (key) => {
                                document.getElementById(key).children[1].style.width = '0px';
                            }

                            return (
                                <CommandItem className="commandItem" onSelect={() => { nm.switchToNote(value.item.key); resetCommand(false) }} key={value.item.key}>
                                    <div>
                                        <p className="line-clamp-1">{value.item.name}</p>
                                        <div className="text-xs muted">
                                            <p className="line-clamp-1">{formatDate(data.creation_date)} - {formatDate(data.last_edited)}</p>
                                        </div>
                                    </div>
                                    {value.item.key != nm.getDefault() &&
                                        <div onMouseEnter={() => animateWidthIn(value.item.key)} onMouseLeave={() => animateWidthOut(value.item.key)} id={value.item.key} className="trashDiv flex p-1 ml-auto rounded cursor-pointer text-red-600 w-max [&_p]:transition-all" onClick={(e) => {
                                            e.stopPropagation();
                                            nm.delete_note(value.item.key);
                                            nm.switchToNote(nm.getDefault());
                                            resetCommand(false);
                                        }}>
                                            <Trash></Trash>
                                            <p className="mx-1 w-0 overflow-hidden">Delete</p>
                                        </div>
                                    }

                                    <span className="hidden">{value.item.key}</span>
                                </CommandItem>
                            )
                        })
                    }
                    {
                        value != "" &&
                        <CommandItem onSelect={() => {
                            create()
                            setCMDOpen(false)
                        }}>
                            <Plus className=""></Plus>
                            <p className="line-clamp-1">Create note: {value}</p>
                        </CommandItem>
                    }
                </CommandGroup>

            </CommandList>
        )
    }


    return (
        <Dialog modal={false} open={cmdOpen} onOpenChange={resetCommand} className="rounded-lg border shadow-md w-[50%] h-[50%]">
            <DialogTitle></DialogTitle>
            <Backdrop open={cmdOpen}></Backdrop>
            <DialogContent className="overflow-hidden p-0 [&>button]:hidden">
                <Command shouldFilter={false}>
                    <CommandInput placeholder="Type a command or search..." onValueChange={(e) => setValue(e)} />
                    {getCommand()}
                </Command>
            </DialogContent>
        </Dialog>

    )
}
