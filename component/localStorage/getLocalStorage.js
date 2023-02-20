// SEARCH
export const fetchNoteLocal = () => {
    if (typeof window !== 'undefined') {
        let result = localStorage.getItem('note');
        if (result) {
            return JSON.parse(localStorage.getItem('note'));
        } else {
            return [];
        }
    }
};
