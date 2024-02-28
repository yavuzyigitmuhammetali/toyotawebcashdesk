export function getNextOpening(schedule){
    const now = new Date();
    const weekDay = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i <= 7; i++) {
        const checkDayIndex = (weekDay + i) % 7;
        const checkDay = daysOfWeek[checkDayIndex];
        const scheduleForDay = schedule[checkDay];

        if (scheduleForDay) {
            const openingTime = new Date(now);
            const [hours, minutes] = scheduleForDay.start.split(':');
            openingTime.setDate(now.getDate() + i);
            openingTime.setHours(hours, minutes, 0, 0);

            if (openingTime > now) {
                return openingTime;
            }
        }
    }
    return null;
}