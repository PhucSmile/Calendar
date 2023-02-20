import { Dialog, Transition } from '@headlessui/react';
import { signIn, signOut } from 'next-auth/react';
import { Fragment } from 'react';

export default function ModalLogin({ setIsOpen, session }) {
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <Transition appear show as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {!session ? (
                                        <>
                                            <button
                                                className="btn-login flex justify-center items-center border border-solid border-dark_blue bg-white gap-4 text-base text-text font-medium"
                                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                            >
                                                <img src="/images/google.png" alt="" />
                                                <span>Login with Google</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn-login flex justify-center items-center border border-solid border-dark_blue bg-white gap-4 text-base text-text font-medium"
                                                onClick={() => signOut()}
                                            >
                                                <img src="/images/google.png" alt="" />
                                                <span>Logout</span>
                                            </button>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
