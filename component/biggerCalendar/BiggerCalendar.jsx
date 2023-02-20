import React, { useEffect, useState } from 'react';
import Day from '../day/Day';

import NavCalendar from '../navCalendar/NavCalendar';
import getMonth from '../utill/getMonth';
import { useSelector } from 'react-redux';
import { getEventMonthSmall, getMonthIndex } from '@/store/slice/useSlice';

const BiggerCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const getMonthIdx = useSelector(getMonthIndex);

    // event click month small-> will change the currentMonth Big
    const getEventMonth = useSelector(getEventMonthSmall);

    useEffect(() => {
        if (getEventMonth === null) {
            setCurrentMonth(getMonth(getMonthIdx));
        } else {
            setCurrentMonth(getMonth(getEventMonth));
        }
    }, [getMonthIdx, getEventMonth]);
    return (
        <div className=" lg:bg-white lg:border lg:border-solid lg:border-[#cccc] mt-6 pb-7 lg:pb-0 lg:mt-0">
            <NavCalendar />
            <div className="grid grid-cols-7 gap-2 sm:gap-4 lg:gap-0">
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <div key={idx}>
                                {i === 0 && (
                                    <h4 className="text-center py-4  text-lg lg:text-xl font-semibold">
                                        {day.format('ddd')}
                                    </h4>
                                )}
                                <Day currentDay={day} MonthIndex={i} />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BiggerCalendar;
