import { getSelectDaySmall } from '@/store/slice/useSlice';

import { useSelector } from 'react-redux';

// active day
export const ActiveDay = ({ currentDay }) => {
    const currentSelectDaySmall = useSelector(getSelectDaySmall);

    if (currentSelectDaySmall !== null)
        return currentDay.format('DD-MM-YY') === currentSelectDaySmall ? 'bg-secondary' : null;
};
