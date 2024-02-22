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