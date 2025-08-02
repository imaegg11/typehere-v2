export const formatTime = (time) => {
    if (time < 1) return `${Math.round(time * 60)}s`
    else if (time < 60) return `${Math.floor(time)}m ${formatTime(time - Math.floor(time))}` 
    else return `${Math.floor(time/60)}h ${formatTime(time % 60)}`
}