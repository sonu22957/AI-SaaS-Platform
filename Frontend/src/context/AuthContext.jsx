import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check whether the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        getUserProfile()
            .then((data) => {
                setUser(data.user || data.data?.user || null);
            })
            .catch((error) => {
                console.error(
                    "Profile loading failed:",
                    error.response?.data || error.message
                );

                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Register a new user
    const register = async (formData) => {
        try {
            const data = await registerUser(formData);

            const registeredUser =
                data.user ||
                data.data?.user ||
                null;

            if (registeredUser) {
                setUser(registeredUser);
            }

            return data;
        } catch (error) {
            console.error(
                "Registration failed:",
                error.response?.data || error.message
            );

            throw error;
        }
    };

    // Login an existing user
    const login = async (formData) => {
        try {
            const data = await loginUser(formData);

            const loggedInUser =
                data.user ||
                data.data?.user ||
                null;

            if (loggedInUser) {
                setUser(loggedInUser);
            } else if (localStorage.getItem("token")) {
                // Fetch profile if login response does not contain user
                const profileData = await getUserProfile();

                setUser(
                    profileData.user ||
                    profileData.data?.user ||
                    null
                );
            }

            return data;
        } catch (error) {
            console.error(
                "Login failed:",
                error.response?.data || error.message
            );

            throw error;
        }
    };

    // Logout the current user
    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access authentication context
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}