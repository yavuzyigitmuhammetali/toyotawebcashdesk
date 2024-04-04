import {getStatus} from "../state/AppStatus/api";

/**
 * Asynchronous function to check online status based on schedule
 * @returns {boolean} - Returns true if the current time falls within the scheduled time, otherwise false
 */
export async function checkOnline() {
    try {
        const apiData = await getStatus().then(response => response.data);

        const currentDate = new Date();
        const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
        const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        return checkDayAndTime(apiData.schedule, currentDay, currentTime);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

/**
 * Function to check if the current time falls within the scheduled time for a specific day
 * @param {Object} schedule - The schedule object containing day-wise time ranges
 * @param {string} currentDay - The current day of the week
 * @param {string} currentTime - The current time in HH:mm format
 * @returns {boolean} - Returns true if the current time falls within the scheduled time for the current day, otherwise false
 */
function checkDayAndTime(schedule, currentDay, currentTime) {
    const daySchedule = schedule[currentDay];

    if (!daySchedule) {
        return false;
    }

    const startHour = parseInt(daySchedule.start.split(':')[0]);
    const startMinute = parseInt(daySchedule.start.split(':')[1]);
    const endHour = parseInt(daySchedule.end.split(':')[0]);
    const endMinute = parseInt(daySchedule.end.split(':')[1]);

    const currentHour = parseInt(currentTime.split(':')[0]);
    const currentMinute = parseInt(currentTime.split(':')[1]);

    return (
        (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
        (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))
    );
}

/**
 * Function to parse a time string into a Date object
 * @param {string} timeString - The time string in HH:mm format
 * @returns {Date} - Returns a Date object with the parsed time
 */
export function parseTimeToDate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

/**
 * Function to update the online status based on the current schedule
 * @param {function} setOnline - The function to set the online status
 * @param {Object} schedule - The schedule object containing day-wise time ranges
 */
export function updateOnlineStatus(setOnline, schedule) {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const dailySchedule = schedule[dayOfWeek];

    if (!dailySchedule) {
        setOnline(false);
        return;
    }

    const startTime = parseTimeToDate(dailySchedule.start);
    const endTime = parseTimeToDate(dailySchedule.end);

    setOnline(now >= startTime && now < endTime);
}

/**
 * Function to set up a timer for updating the online status based on the schedule
 * @param {function} setOnline - The function to set the online status
 * @param {Object} schedule - The schedule object containing day-wise time ranges
 * @returns {number|null} - Returns the setTimeout ID if the timer is set, otherwise null
 */
export function setupTimer(setOnline, schedule) {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const dailySchedule = schedule[dayOfWeek];

    if (!dailySchedule) return null;

    const startTime = parseTimeToDate(dailySchedule.start);
    const endTime = parseTimeToDate(dailySchedule.end);
    let delay;

    if (now < startTime) {
        delay = startTime.getTime() - now.getTime();
    } else if (now >= startTime && now < endTime) {
        delay = endTime.getTime() - now.getTime();
    } else {
        delay = 24 * 60 * 60 * 1000 - now.getTime() + startTime.getTime();
    }

    return setTimeout(() => updateOnlineStatus(setOnline, schedule), delay);
}
