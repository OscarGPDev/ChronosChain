import {useEffect, useState} from "react";
import {TimekeeperRenderizableValue, TimekeeperValue} from "../../../interfaces/Time";
import {formatTimeValue} from "../../../functions/formatters";


const Timekeeper = () => {
    const [initialTime, setInitialTime] = useState<Date>();
    const timekeeperValueInitialValue = {seconds: 0, displayValue: '00:00:00'};
    const [timekeeperValue, setTimekeeperValue] = useState<TimekeeperValue>(timekeeperValueInitialValue);
    const [start, setStart] = useState(false);//true for start, false to stop

    useEffect(() => {
        const calculateTimekeeperValue = () => {
            if (!initialTime) return timekeeperValue;
            const secondsSinceStart = Math.floor(
                (new Date().getTime() - initialTime.getTime()) / 1000
            ) + timekeeperValue.seconds;
            const minutesSinceStart = Math.floor(secondsSinceStart / 60);

            const values: TimekeeperRenderizableValue = {
                seconds: secondsSinceStart % 60,
                minutes: minutesSinceStart % 60,
                hours: Math.floor(minutesSinceStart / 60)
            };

            return {displayValue: formatTimeValue(values), seconds: secondsSinceStart};
        };
        let interval: NodeJS.Timeout;
        if (start) {
            interval = setInterval(() => setTimekeeperValue(calculateTimekeeperValue()), 1000);
        }

        return () => {
            clearInterval(interval);
        }

    }, [start]);
    const handleStartPause = () => {
        setInitialTime(new Date());
        setStart(!start);
    };
    const handleClear = () => {
        setTimekeeperValue(timekeeperValueInitialValue);
    };
    return (
        <div>
            <div>{timekeeperValue.displayValue}</div>
            <div>
                <button onClick={handleStartPause}>{start ? "pause" : "start"}</button>
                {!start &&
                    initialTime &&
                    <button onClick={handleClear}>
                        Clear
                    </button>}
            </div>

        </div>
    );
}
export default Timekeeper;