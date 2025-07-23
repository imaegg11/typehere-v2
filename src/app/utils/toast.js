import { toast } from "sonner";

export class Toast {
    static info(message, description=null) {
        toast.info(message, {
            description: description,
            classNames: {
                closeButton: "!top-3 !left-[calc(100%-16px)] !border-none"
            },
            duration: 3000,
        })
    }

    static success(message, description=null) {
        toast.success(message, {
            description: description,
            classNames: {
                closeButton: "!top-3 !left-[calc(100%-16px)] !border-none"
            },
            duration: 3000,
        })
    }

    static warning(message, description=null) {
        toast.warning(message, {
            description: description,
            classNames: {
                closeButton: "!top-3 !left-[calc(100%-16px)] !border-none"
            },
            duration: 3000,
        })
    }

    static error(message, description=null) {
        toast.error(message, {
            description: description,
            classNames: {
                closeButton: "!top-3 !left-[calc(100%-16px)] !border-none"
            },
            duration: 3000,
        })
    }
}