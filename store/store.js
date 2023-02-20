import { configureStore } from '@reduxjs/toolkit';
import useSlice from './slice/useSlice';

export const store = configureStore({
    reducer: {
        calendar: useSlice.reducer,
    },
});
