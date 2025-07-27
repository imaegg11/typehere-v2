import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    CommandDialog
} from "@/components/ui/command"
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react"

export function CommandComponent() {

    const [cmdOpen, setCMDOpen] = useState(false)

    useEffect(() => {
        const toggleCMD = (e) => {
            if (e.keyCode === 75 && e.ctrlKey) {
                e.preventDefault();
                setCMDOpen(prev => !prev);
            }
        };

        window.addEventListener("keydown", toggleCMD);
        return () => window.removeEventListener("keydown", toggleCMD);
    })

    return (
        <CommandDialog open={cmdOpen} onOpenChange={setCMDOpen} className="rounded-lg border shadow-md w-[50%] h-[50%]">
            <DialogTitle></DialogTitle>
            <CommandInput placeholder="Type a command or search..." onValueChange={(e) => console.log(e)} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Notes" className="group">
                    <CommandItem onSelect={() => console.log('hi')}>
                        <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                        <span>Search Emoji</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings" className="group">
                    <CommandItem>
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>

    )
}
