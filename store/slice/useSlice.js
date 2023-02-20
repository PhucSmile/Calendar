import { fetchNoteLocal } from '@/component/localStorage/getLocalStorage';
import { setNote } from '@/component/localStorage/setLocalStorage';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
// import { toast } from 'react-toastify';

const initialState = {
    monthIndex: dayjs().month(),
    resetSmallMonth: false,
    monthSmall: null,
    selectDaySmall: null,
    listNote: fetchNoteLocal(),
    dataEdit: null,
};

export const useSlice = createSlice({
    name: 'dateMonth',
    initialState,
    reducers: {
        prevMonth: (state) => {
            state.monthIndex -= 1;
            state.monthSmall = null;
        },
        nextMonth: (state) => {
            state.monthIndex += 1;
            state.monthSmall = null;
        },
        resetMonth: (state) => {
            state.monthIndex = dayjs().month();
            state.resetSmallMonth = !state.resetSmallMonth;
            state.monthSmall = null;
        },
        selectMonth: (state, action) => {
            state.monthIndex = action.payload;
            state.monthSmall = null;
        },
        // click on month small -> then get index month
        clickMonthSmall: (state, action) => {
            state.monthSmall = action.payload;
        },
        // get day calendar small to active  calendar big
        clickSelectDaySmall: (state, action) => {
            state.selectDaySmall = action.payload;
        },
        // add note
        addNote: (state, action) => {
            const newItem = action.payload;
            const isCheck = state.listNote.findIndex((item) => item.id === newItem.id);
            if (!isCheck >= 0) {
                state.listNote.push({
                    id: Math.floor(100000 + Math.random() * 900000),
                    title: newItem.title,
                    color: newItem.color,
                    time: newItem.time,
                    formatDate: newItem.formatDate,
                });
            }

            setNote(state.listNote);
            state.dataEdit = null;
        },
        // delete note
        deleteNote: (state, action) => {
            const id = action.payload;
            const isCheck = state.listNote.findIndex((item) => item.id === id);

            if (isCheck >= 0) {
                state.listNote = state.listNote.filter((item) => item.id !== id);
            }
            setNote(state.listNote);
            state.dataEdit = null;
        },
        setDataEdit: (state, action) => {
            state.dataEdit = action.payload;
        },
        // update note
        updateNote: (state, action) => {
            const newData = action.payload;
            const isCheck = state.listNote.findIndex((item) => item.id === newData.id);

            if (isCheck >= 0) {
                state.listNote[isCheck] = newData;
            }
            setNote(state.listNote);
            state.dataEdit = null;
        },
    },
});

// Action creators are generated for each case reducer function

export const {
    prevMonth,
    nextMonth,
    resetMonth,
    selectMonth,
    clickMonthSmall,
    clickSelectDaySmall,
    addNote,
    deleteNote,
    updateNote,
    setDataEdit,
} = useSlice.actions;
export const getMonthIndex = (state) => state.calendar.monthIndex;
export const getResetSmallMonth = (state) => state.calendar.resetSmallMonth;
export const getEventMonthSmall = (state) => state.calendar.monthSmall;
export const getSelectDaySmall = (state) => state.calendar.selectDaySmall;
export const getListNote = (state) => state.calendar.listNote;
export const getDataEdit = (state) => state.calendar.dataEdit;

export default useSlice;
