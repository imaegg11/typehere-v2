export function Backdrop({ open }) {
    return (
        <div 
            data-state={open ? "open" : "closed"} 
            className={`${open ? "bg-black/80" : "bg-black/0 pointer-events-none"} ` + "fixed inset-0 z-50 transition-all"}
        ></div>
    )
}