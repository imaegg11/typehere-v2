export const formatBytes = (bytes) => {
    const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB']
    
    let i = 0
    while (bytes >= 1000 && i < units.length - 1) {
        bytes /= 1000
        i++
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}