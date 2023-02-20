import dayjs from 'dayjs';

// GET current day in month
export const CurrentDay = ({ currentDay }) => {
    return currentDay.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-dark_blue rounded-full text-white' : null;
};
