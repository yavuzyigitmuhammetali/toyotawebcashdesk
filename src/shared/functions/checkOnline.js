import {getStatus} from "../state/api";

export async function checkOnline() {
    try {
        const apiData = await getStatus().then(response => response.data);

        const currentDate = new Date();
        const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
        const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        return checkDayAndTime(apiData.schedule, currentDay, currentTime);
    } catch (error) {
        console.error('Bir hata oluştu:', error.message);
    }
}


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

export function parseTimeToDate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

export function updateOnlineStatus(setOnline,schedule) {
    console.log(schedule)
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

export function setupTimer(setOnline,schedule) {
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

    return setTimeout(()=>updateOnlineStatus(setOnline,schedule), delay);
}

