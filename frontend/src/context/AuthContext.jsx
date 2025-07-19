'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

// Get the backend link from environment variables
// Make sure NEXT_PUBLIC_BACKEND_LINK is set in your .env.local file
const BACKEND_LINK = process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Stores user data (e.g., { email: 'user@example.com' })
  const [token, setToken] = useState(null); // Stores the authentication token (JWT)
  const [loading, setLoading] = useState(true); // Manages loading state for API calls and initial auth check
  const [authError, setAuthError] = useState(null); // Stores any authentication-related errors
  const router = useRouter();

  // Effect to run once on component mount to check for existing token
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // In a production app, you would ideally validate this token with your backend
      // (e.g., by making a request to a /verify-token endpoint)
      // For now, we'll assume a stored token means authenticated.
      setUser({ isAuthenticated: true }); // Basic user object, can be expanded with real user data later
    }
    setLoading(false); // Initial authentication check is complete
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${BACKEND_LINK}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const receivedToken = data.token;
        if (receivedToken) {
          localStorage.setItem('authToken', receivedToken);
          setToken(receivedToken);
          setUser({ isAuthenticated: true, email: email });
          router.push('/dashboard');
        } else {
          throw new Error('Authentication token not received from the server.');
        }
      } else {
        const errorMessage = data.detail || data.message || 'Login failed. Please check your credentials.';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (full_name, email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${BACKEND_LINK}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const receivedToken = data.token;
        if (receivedToken) {
          localStorage.setItem('authToken', receivedToken);
          setToken(receivedToken);
          setUser({ isAuthenticated: true, email: email, full_name: full_name });
          router.push('/dashboard');
        } else {
          throw new Error('Registration successful, but no authentication token received.');
        }
      } else {
        const errorMessage = data.email ? `Email: ${data.email.join(', ')}` :
                             data.password ? `Password: ${data.password.join(', ')}` :
                             data.full_name ? `Full Name: ${data.full_name.join(', ')}` :
                             data.detail || data.message || 'Registration failed.';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setAuthError(error.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user logout. Clears token and user state, then redirects to login page.
   */
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    setToken(null);
    setUser(null);
    router.push('/login'); // Redirect to login
  };

  // Provide the authentication state and functions to components wrapped by AuthProvider
  const authContextValue = {
    user,
    token,
    loading,
    authError,
    login,
    signup, // Make signup function available
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}