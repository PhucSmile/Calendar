import { IconCalendar } from '@/assets/svg';
import { Container } from '@/component/common';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ModalLogin = dynamic(() => import('@/component/modal/ModalLogin').then((module) => module), {
    ssr: false,
});

const Header = () => {
    let [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="shadow ">
            <Container>
                <div className="flex justify-between items-center px-2 py-4">
                    <Link href={'/'}>
                        <div className="flex items-center space-x-2 text-dark_blue ">
                            <span className="block w-8 h-8 lg:w-10 lg:h-10">
                                <IconCalendar />
                            </span>
                            <h4 className="text-2xl lg:text-3xl font-semibold ">Calendar</h4>
                        </div>
                    </Link>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Image
                            src={session?.user?.image || '/images/NoUser.png'}
                            alt="Img-user"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        {session?.user?.name}
                    </div>
                </div>
            </Container>
            {isOpen && <ModalLogin setIsOpen={setIsOpen} session={session} />}
        </header>
    );
};

export default Header;
