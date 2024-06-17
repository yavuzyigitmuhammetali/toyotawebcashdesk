export const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.keys(theme).forEach(key => {
        root.style.setProperty(`--${key}`, theme[key]);
    });
};
