export const clearLocalStorage = () => {
    const keysToClear = ["recentProfile", "offline"];

    keysToClear.forEach(key => {
        localStorage.removeItem(key);
    });
};
