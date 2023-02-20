import React, { useEffect, useState } from 'react';

import getMonth from '../utill/getMonth';
import dayjs from 'dayjs';
import SmallNavCalendar from '../navCalendar/smallNavCalendar';
import { useSelector } from 'react-redux';
import { getMonthIndex, getResetSmallMonth } from '@/store/slice/useSlice';
import Day from '../day/Day';

const SmallCalendar = () => {
    const getMonthIdx = useSelector(getMonthIndex);
    const getReset = useSelector(getResetSmallMonth);
    // get the current month
    const [navSmallCurrentMonth, setNavSmallCurrentMonth] = useState(dayjs().month());
    // get all months in the calendar
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(navSmallCurrentMonth));
    }, [navSmallCurrentMonth]);

    useEffect(() => {
        setNavSmallCurrentMonth(getMonthIdx);
    }, [getMonthIdx]);

    //getReset onchange then auto reset the current small month
    useEffect(() => {
        setCurrentMonth(getMonth(dayjs().month()));
    }, [getReset]);

    return (
        <div className="mt-[20px] flex flex-col items-center justify-center lg:pb-5 lg:border-b-[3px] lg:border-solid lg:border-[#cccc]">
            <SmallNavCalendar
                navSmallCurrentMonth={navSmallCurrentMonth}
                setNavSmallCurrentMonth={setNavSmallCurrentMonth}
            />

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-4 sm:gap-6 md:gap-8 lg:gap-2 mx-auto pb-5 border-b-[3px] border-solid border-[#cccc] lg:pb-0 lg:border-none">
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <div key={idx}>
                                {i === 0 && (
                                    <h4 className="text-center py-4 text-lg font-semibold">{day.format('ddd')}</h4>
                                )}
                                <Day currentDay={day} MonthIndex={navSmallCurrentMonth} isSmall />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SmallCalendar;
