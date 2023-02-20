export const setNote = (data) => {
    localStorage.setItem('note', JSON.stringify(data));
};
