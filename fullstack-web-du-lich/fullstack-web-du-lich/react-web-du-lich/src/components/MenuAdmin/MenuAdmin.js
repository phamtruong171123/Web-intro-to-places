import "./MenuAdmin.scss";
import avatar from "../../assets/images/admin-avatar.png";
import { NavLink, Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../context/UserContext";

const MenuAdmin = () => {
    const { user } = useContext(UserContext);

    // Check if user and user.account are defined before accessing username
    const username = user?.account?.username || 'Guest';

    return (
        <div className="admin-menu-container">
            <div className="admin-menu-header">
                <div className="title">
                    ADMIN
                </div>
                <div className="btn-hidden-display">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
            <div className="admin-menu-avatar">
                <img src={avatar} alt="Admin Avatar" />
                <div>{username}</div>
            </div>
            <div className="admin-menu-icon-home">
                <Link to="/" className="link-home">
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                </Link>
            </div>
            <div className="amind-menu-content">
                <div className="menu-item">
                    <NavLink to="/manage-user">Quản lý Người dùng</NavLink>
                </div>
                <div className="menu-item">
                    <NavLink to="/manage-location">Quản lý Địa điểm</NavLink>
                </div>
                <div className="menu-item">
                    <NavLink to="/manage-trip">Quản lý Chuyến đi</NavLink>
                </div>
            </div>
        </div>
    );
}

export default MenuAdmin;
