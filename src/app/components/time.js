import { useState, useEffect } from "react"

export function Time() {
    
    const [time, setTime] = useState(get_time());

    useEffect(() => {
        setInterval(() => {
            setTime(get_time());
        }, 1000);
    }, []);

    return (
        <p>{time}</p>
    )

}

function get_time() {
    const current_date = new Date();

    let hour = current_date.getHours()
    let minute = current_date.getMinutes()
    let trail = hour >= 12 ? "PM" : "AM"

    if (minute <= 9) minute = `0${minute}`;
    if (hour > 12) hour %= 12;
    else if (hour == 0) hour = 12;
    
    return `${hour}:${minute} ${trail}`;
}