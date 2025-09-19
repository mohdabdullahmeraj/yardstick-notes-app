import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setToken(token);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed! Please check your credentials.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const upgradePlan = async () => {
        try {
            const response = await api.post(`/tenants/${user.tenant.slug}/upgrade`);
            const updatedTenant = response.data.tenant;
            const updatedUser = { ...user, tenant: updatedTenant };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('Upgrade successful! You now have unlimited notes.');
        } catch (error) {
            console.error('Upgrade failed:', error);
            alert('Upgrade failed. Please try again.');
        }
    };
    
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, upgradePlan }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;