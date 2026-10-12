import { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    Sparkles,
    LayoutDashboard,
    UserRound,
    LogOut,
    Home,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => setMenuOpen(false);

    const displayName =
        user?.name ||
        user?.fullName ||
        user?.username ||
        "My Account";

    return (
        <header className="app-navbar">
            <div className="app-navbar-container">

                {/* Logo */}
                <Link
                    to="/"
                    className="app-navbar-logo"
                    onClick={closeMenu}
                >
                    <span className="app-navbar-logo-icon">
                        <Sparkles size={23} />
                    </span>

                    <span>
                        AI<span className="app-navbar-logo-accent">Studio</span>
                    </span>
                </Link>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="app-navbar-menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={
                        menuOpen ? "Close navigation" : "Open navigation"
                    }
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Navigation */}
                <nav
                    className={`app-navbar-links ${
                        menuOpen ? "app-navbar-links-open" : ""
                    }`}
                >
                    <Link
                        to="/"
                        className="app-navbar-link"
                        onClick={closeMenu}
                    >
                        <Home size={17} />
                        Home
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="app-navbar-link"
                                onClick={closeMenu}
                            >
                                <LayoutDashboard size={17} />
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className="app-navbar-link"
                                onClick={closeMenu}
                            >
                                <UserRound size={17} />
                                {displayName}
                            </Link>

                            <button
                                type="button"
                                className="app-navbar-logout"
                                onClick={handleLogout}
                            >
                                <LogOut size={17} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="app-navbar-link"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="app-navbar-register"
                                onClick={closeMenu}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}