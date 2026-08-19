import React, { createContext, useContext, useState, useEffect } from 'react';
import { logOutApi } from '../components/clientApi/allapi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('mandir_admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('mandir_admin_token') || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('mandir_admin_token') || localStorage.getItem('mandir_admin_user'));
  });

  useEffect(() => {
    if (user && (token || user.email)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user, token]);

  const login = (userData, authToken = null) => {
    const defaultUser = {
      id: userData?.id || 'admin_1',
      name: userData?.name || userData?.email?.split('@')[0] || 'Mandir Administrator',
      email: userData?.email || 'admin@baikunthnath.org',
      role: userData?.role || 'Super Admin',
      permissions: userData?.permissions || ['all'],
      avatar: userData?.avatar || null,
      lastLogin: new Date().toISOString(),
    };

    const tokenToSave = authToken || `mock_jwt_${Date.now()}`;

    setUser(defaultUser);
    setToken(tokenToSave);
    setIsAuthenticated(true);

    try {
      localStorage.setItem('mandir_admin_user', JSON.stringify(defaultUser));
      localStorage.setItem('mandir_admin_token', tokenToSave);
    } catch (e) {
      console.error('Failed to persist auth to localStorage', e);
    }
  };

  const logout = async () => {
    try {
      // Call backend API to invalidate session and clear cookies
      await logOutApi();
    } catch (error) {
      console.warn('Backend logout response/note:', error.message);
    } finally {
      // Always clear local frontend state and storage
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      try {
        localStorage.removeItem('mandir_admin_user');
        localStorage.removeItem('mandir_admin_token');
      } catch (e) {
        console.error('Failed to clear auth from localStorage', e);
      }
    }
  };

  const hasRole = (allowedRoles) => {
    if (!user) return false;
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (user.role === 'Super Admin') return true;
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(user.role);
    }
    return user.role === allowedRoles;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'Super Admin') return true;
    if (!user.permissions) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      role: newRole,
      permissions: newRole === 'Super Admin' ? ['all'] : ['view_operational', 'manage_bookings', 'manage_gallery', 'manage_donations'],
    };
    setUser(updatedUser);
    try {
      localStorage.setItem('mandir_admin_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to update user role in localStorage', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        hasRole,
        hasPermission,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
