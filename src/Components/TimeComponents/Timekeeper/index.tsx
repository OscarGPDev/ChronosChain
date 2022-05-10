import {useEffect, useState} from "react";

const Timekeeper = () => {
    const [initialTime, setInitialTime] = useState<Date>();
    const [timekeeperValue, setTimekeeperValue] = useState<String>();
    const [start, setStart] = useState(false);//true for start, false to stop

    useEffect(() => {

        let interval: NodeJS.Timeout;
        if (start) {
            interval = setInterval(() => {
                // @ts-ignore
                setTimekeeperValue(`${(new Date().getHours() - initialTime.getHours()).toString().padStart(2, '0')}:${(new Date().getMinutes() - initialTime.getMinutes()).toString().padStart(2, '0')}:${(new Date().getSeconds()).toString().padStart(2, '0') - initialTime.getSeconds()}`);

            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }

    }, [start]);
    const handleClick = () => {
        setInitialTime(new Date());
        setStart(!start);
    };
    return (
        <div>
            {timekeeperValue}
            <button onClick={handleClick}>{">"}</button>
        </div>
    );
}
export default Timekeeper;