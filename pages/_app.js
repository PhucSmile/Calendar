import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';

import { ToastContainer } from 'react-toastify';
import { MainLayout } from '@/layout';

import { Provider } from 'react-redux';
import { store } from '@/store/store';

function MyApp(props) {
    const { Component, pageProps, session, settings } = props;

    const renderWithLayout =
        Component.getLayout ||
        function (page) {
            return <MainLayout>{page}</MainLayout>;
        };

    return (
        <>
            <Head>
                <title>Calendar</title>
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <ToastContainer
                        theme="light"
                        position="top-center"
                        autoClose={1500}
                        closeOnClick
                        pauseOnHover={false}
                    />
                    {renderWithLayout(<Component {...pageProps} />)}
                </Provider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
