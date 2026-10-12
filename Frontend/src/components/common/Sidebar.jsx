import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    PenTool,
    Code2,
    MessageSquare,
    History,
    UserRound,
    Settings,
    LogOut,
    Sparkles,
    Menu,
    X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "AI Writer",
            path: "/ai-writer",
            icon: PenTool,
        },
        {
            name: "Code Explainer",
            path: "/code-explainer",
            icon: Code2,
        },
        {
            name: "AI Chat",
            path: "/chat",
            icon: MessageSquare,
        },
        {
            name: "Chat History",
            path: "/history",
            icon: History,
        },
        {
            name: "My Profile",
            path: "/profile",
            icon: UserRound,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: Settings,
        },
    ];

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate("/login");
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                className="sidebar-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle sidebar"
            >
                {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeMobileMenu}
                />
            )}

            <aside
                className={`app-sidebar ${
                    mobileOpen ? "app-sidebar-open" : ""
                }`}
            >
                {/* Brand */}
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">
                        <Sparkles size={23} />
                    </div>

                    <div>
                        <h2>AI Studio</h2>
                        <span>AI Workspace</span>
                    </div>
                </div>

                {/* Main menu */}
                <div className="sidebar-menu-section">
                    <p className="sidebar-section-title">
                        WORKSPACE
                    </p>

                    <nav className="sidebar-navigation">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/dashboard"}
                                    className={({ isActive }) =>
                                        `sidebar-link ${
                                            isActive
                                                ? "sidebar-link-active"
                                                : ""
                                        }`
                                    }
                                    onClick={closeMobileMenu}
                                >
                                    <Icon size={19} />

                                    <span>{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Upgrade card */}
                <div className="sidebar-upgrade-card">
                    <div className="sidebar-upgrade-icon">
                        <Sparkles size={20} />
                    </div>

                    <h3>Unlock more AI</h3>

                    <p>
                        Explore more possibilities with your AI workspace.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            window.alert(
                                "Subscription plans will be available soon."
                            )
                        }
                    >
                        Explore Plans
                    </button>
                </div>

                {/* User section */}
                <div className="sidebar-user">
                    <div className="sidebar-avatar">
                        {(user?.name || user?.fullName || "U")
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div className="sidebar-user-info">
                        <strong>
                            {user?.name ||
                                user?.fullName ||
                                user?.username ||
                                "User"}
                        </strong>

                        <span>{user?.email || "AI Studio Account"}</span>
                    </div>

                    <button
                        type="button"
                        className="sidebar-logout-button"
                        onClick={handleLogout}
                        title="Logout"
                        aria-label="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>
        </>
    );
}