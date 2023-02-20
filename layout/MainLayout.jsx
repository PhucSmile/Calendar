import Header from './component/Header';

export function MainLayout({ children }) {
    return (
        <div className=" bg-secondary">
            <Header />
            <main>{children}</main>
        </div>
    );
}
