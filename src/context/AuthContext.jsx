import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredUser,
  setStoredUser,
  getStoredAuth,
  setStoredAuth
} from '../data/storage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth().isAuthenticated);
  const { showToast } = useToast();

  useEffect(() => {
    setUser(getStoredUser());
    setIsAuthenticated(getStoredAuth().isAuthenticated);
  }, []);

  const login = (email, password) => {
    // Simulated authentication
    const activeUser = {
      ...getStoredUser(),
      email: email || 'arjun@aha.com',
      name: email?.includes('@') ? email.split('@')[0].replace('.', ' ') : 'Arjun Verma'
    };
    setStoredUser(activeUser);
    setStoredAuth({ isAuthenticated: true, token: 'mock-jwt-token-aha' });
    setUser(activeUser);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${activeUser.name}!`, 'success');
    return true;
  };

  const register = (formData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name || 'Connoisseur',
      email: formData.email,
      phone: formData.phone || '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      walletBalance: 200,
      tier: 'Royal Member',
      bio: formData.bio || 'Passionate about authentic royal culinary creations.'
    };
    setStoredUser(newUser);
    setStoredAuth({ isAuthenticated: true, token: 'mock-jwt-token-aha' });
    setUser(newUser);
    setIsAuthenticated(true);
    showToast('Royal account registered successfully! ₹200 bonus credited.', 'success');
    return true;
  };

  const logout = () => {
    setStoredAuth({ isAuthenticated: false, token: null });
    setIsAuthenticated(false);
    showToast('Signed out of your royal session.', 'info');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setStoredUser(updated);
    setUser(updated);
    showToast('Royal profile updated successfully!', 'success');
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
