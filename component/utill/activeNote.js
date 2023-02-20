import { getListNote } from '@/store/slice/useSlice';
import { useSelector } from 'react-redux';

// active list notes
export const ActiveNote = ({ currentDay }) => {
    const currentListNote = useSelector(getListNote);

    if (currentListNote?.length)
        return currentListNote?.find((note) => (note?.time === currentDay.format('DD-MM-YY') ? 'bg-secondary' : null));
};
