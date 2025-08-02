export const formatDate = (time) => {
    const past = new Date(time)
    const now = new Date()

    const diffMS = now - past

    if (diffMS > 86400000) {
        const day = String(past.getDate()).padStart(2, '0')
        const month = String(past.getMonth() + 1).padStart(2, '0')
        const year = past.getFullYear()

        return `${day}/${month}/${year}`
    } else {
        let hour = past.getHours();
        const minute = String(past.getMinutes()).padStart(2, '0')
        const second = String(past.getSeconds()).padStart(2, '0')
        const trail = hour >= 12 ? 'PM' : 'AM'


        if (hour > 12) hour %= 12
        else if (hour == 0) hour = 12

        return `${hour}:${minute}:${second} ${trail}`
    }
}