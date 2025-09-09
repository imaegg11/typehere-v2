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
import { useEffect, useState } from "react";

export function Replace() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        const toggleReplace = (e) => {
            if (e.keyCode === 72 && e.ctrlKey) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener("keydown", toggleReplace);
        return () => window.removeEventListener("keydown", toggleReplace);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <DialogTitle></DialogTitle>
            <DialogContent
                className="[&>button]:hidden p-2"
                onOpenAutoFocus={(e) => {
                    e.preventDefault()
                    document.activeElement.blur()
                }} onCloseAutoFocus={(e) => {
                    document.getElementById("textarea").focus()
                }}
            >
                <p>Hi!</p>
            </DialogContent>
        </Dialog>
    )
}
