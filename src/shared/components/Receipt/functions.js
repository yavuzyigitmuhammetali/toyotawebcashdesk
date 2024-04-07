export function convertToDateFormat(isoString, lang) {
    if (lang === "tr" || lang === "en") {
        const months = lang === "en" ? [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ] : [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        const days = lang === "en" ? [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ] : [
            'Pazar', 'Pazartesi', 'Salı', 'Çarşamba',
            'Perşembe', 'Cuma', 'Cumartesi'
        ];

        const date = new Date(isoString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const dayIndex = date.getDay();

        const time = String(date.getHours()).padStart(2, '0') + ':' +
            String(date.getMinutes()).padStart(2, '0') + ':' +
            String(date.getSeconds()).padStart(2, '0');

        const dayString = `${day} ${months[monthIndex]} ${year} ${days[dayIndex]}`;
        const timeString = `${time}`;

        return {day: dayString, time: timeString};
    } else {
        return {day: "", time: ""}
    }

}
