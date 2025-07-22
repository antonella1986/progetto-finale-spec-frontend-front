import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};