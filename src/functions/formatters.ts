import {TimekeeperRenderizableValue} from "../interfaces/Time";

export const formatTimeValue = ({
                            hours,
                            minutes,
                            seconds
                        }: TimekeeperRenderizableValue) => {
    const formatValue = (value: number) => value.toString().padStart(2, '0');
    return `${formatValue(hours)}:${formatValue(minutes)}:${formatValue(seconds)}`
};