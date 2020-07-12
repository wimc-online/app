import React, {useEffect, useState} from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<string>();

    useEffect(() => {
        const interval = setInterval(() => {
            let date = new Date;
            setTime(date.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval)
    });

    return (<div>{time}</div>)
};

export default Clock;