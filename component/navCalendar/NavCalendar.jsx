import { IconArrowLeft, IconArrowRight } from '@/assets/svg';
import React, { useEffect, useState } from 'react';
import BtnSelect from '../button/BtnSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getEventMonthSmall, getMonthIndex, nextMonth, prevMonth, resetMonth } from '@/store/slice/useSlice';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const NavCalendar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const getMonthIdx = useSelector(getMonthIndex);
    const getEventMonth = useSelector(getEventMonthSmall);
    const [monthYear, setMonthYear] = useState();

    useEffect(() => {
        if (getEventMonth === null) {
            setMonthYear(getMonthIdx);
        } else {
            setMonthYear(getEventMonth);
        }
    }, [getMonthIdx, getEventMonth]);

    const handlePrevMonth = async () => {
        await dispatch(prevMonth());
    };
    const handleNextMonth = async () => {
        await dispatch(nextMonth());
    };
    const handleToday = async () => {
        await dispatch(resetMonth());
    };
    return (
        <div className="flex justify-between items-center pt-[14px] px-7">
            <div className="flex items-center space-x-4">
                <button className="block lg:hidden" onClick={() => router.back()}>
                    <IconArrowLeft className="w-6 h-6  text-dark_blue" />
                </button>
                <button className="btn-outline" onClick={handleToday}>
                    Today
                </button>
                <div className="flex items-center space-x-[20px] sm:space-x-[32px] lg:space-x-[16px]">
                    <button className="h-6 w-6 text-dark_blue font-bold" onClick={handlePrevMonth}>
                        <IconArrowLeft />
                    </button>
                    <button className="h-6 w-6 text-dark_blue font-bold" onClick={handleNextMonth}>
                        <IconArrowRight />
                    </button>
                    <span className="hidden md:block md:text-2xl lg:text-3xl font-semibold text-dark_blue">
                        {dayjs(new Date(dayjs().year(), monthYear)).format('MMMM YYYY')}
                    </span>
                </div>
            </div>
            <BtnSelect />
        </div>
    );
};

export default NavCalendar;
