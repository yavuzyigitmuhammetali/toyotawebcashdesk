/**
 * Get the next opening time based on the provided schedule.
 * @param {Object} schedule - The schedule object containing opening times for each day.
 * @returns {Date|null} - The next opening time or null if no opening time is found.
 */
export const getNextOpening = (schedule) => {
    if (!schedule) {
        return null;
    }

    const now = new Date();
    const weekDay = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i <= 7; i++) {
        const checkDayIndex = (weekDay + i) % 7;
        const checkDay = daysOfWeek[checkDayIndex];
        const scheduleForDay = schedule[checkDay];

        if (scheduleForDay && scheduleForDay.start) {
            const openingTime = new Date(now);
            const [hours, minutes] = scheduleForDay.start.split(':');
            openingTime.setDate(now.getDate() + i);
            openingTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            if (openingTime > now) {
                return openingTime;
            }
        }
    }
    return null;
};