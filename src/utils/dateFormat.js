export const dateFormat = (date) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' }); // 'August'
    const day = dateObj.getDate();

    return `${month} ${day}, ${year}`
}