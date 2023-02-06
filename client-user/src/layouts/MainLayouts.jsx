import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayouts = () => {
    return (
        <>
        <Navbar />
        <div className="pt-14 w-full h-screen">
            <Outlet />
            <Footer/>
        </div>
        </>
    );
}
export default MainLayouts