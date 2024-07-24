import "./NavHeader.scss";
import React, { useContext } from 'react';
import logo from "../../assets/images/logo.png";
import { NavLink, Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavHeader = () => {
    const { user, logoutContext } = useContext(UserContext);
    const history = useHistory();

    const handleLogout = async () => {
        localStorage.removeItem("user"); // clear local storage
        logoutContext();    // clear user in UserContext
        history.push('/login');
    }

    return (
        <div className="header-container">
            <div className="header-up">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="search">
                    {/* Các phần tìm kiếm */}
                </div>
                <div className="login">
                    {user && user.isAuthenticated === true ? (
                        <div className="welcome">
                            <NavDropdown title={`Welcome ${user.account.username}`} className="settings" id="basic-nav-dropdown">
                                <NavDropdown.Item ><Link to="/trips-of-customer">Thông tin</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <span onClick={handleLogout}>Log out</span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary btn-login">Đăng nhập</button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="header-down">
                <div className="topnav">
                    <div className="menu">
                        <NavLink to="/" exact>Trang chủ</NavLink>
                        <NavLink to="/nam">Địa điểm</NavLink>
                        <NavLink to="/nu">Tin tức</NavLink>
                        <NavLink to="/phu-kien">Giới thiệu</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavHeader;
