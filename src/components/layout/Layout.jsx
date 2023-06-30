import Header from "../header/Header";
import Footer from "../footer/Footer";
import Nav from "../nav/Nav";
import { Outlet } from 'react-router-dom';
import "../../index.css";

const Layout = ({ search, setSearch }) => {
    return (
        <div className="App">
            <Header title="React JS Blog" />
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;