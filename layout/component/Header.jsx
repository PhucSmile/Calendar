import { IconCalendar } from '@/assets/svg';
import { Container } from '@/component/common';

import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="shadow ">
            <Container>
                <div className="flex  items-center px-2 py-4">
                    <Link href={'/'}>
                        <div className="flex items-center space-x-2 text-dark_blue ">
                            <span className="block w-8 h-8 lg:w-10 lg:h-10">
                                <IconCalendar />
                            </span>
                            <h4 className="text-2xl lg:text-3xl font-semibold ">Calendar</h4>
                        </div>
                    </Link>
                </div>
            </Container>
        </header>
    );
};

export default Header;
