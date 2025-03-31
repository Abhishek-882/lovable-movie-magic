import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  verifyEmail: (otp: string) => Promise<boolean>;
  sendVerificationEmail: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [API_URL]);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        setUser(await response.json());
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [API_URL]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const { token, user: userData } = await response.json();
      localStorage.setItem('token', token);
      setUser(userData);

      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Could not log in",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const { token, user: userData } = await response.json();
      localStorage.setItem('token', token);
      setUser(userData);

      toast({
        title: "Account created",
        description: "Welcome! Please verify your email.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setVerificationCode(null);
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);

      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Could not update profile",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/auth/send-verification`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send verification');
      }

      // For demo purposes - in production this would come from your backend
      const demoCode = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(demoCode);

      toast({
        title: "Verification sent",
        description: `Demo verification code: ${demoCode}`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to send",
        description: error.message || "Could not send verification",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (otp: string): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      // In production, this would verify with your backend
      if (verificationCode && otp === verificationCode) {
        const response = await fetch(`${API_URL}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ otp })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Verification failed');
        }

        const verifiedUser = await response.json();
        setUser(verifiedUser);
        setVerificationCode(null);

        toast({
          title: "Email verified!",
          description: "Your email has been successfully verified.",
        });
        return true;
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Could not verify email",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isProfileComplete: user?.isProfileComplete || false,
        isEmailVerified: user?.isEmailVerified || false,
        login,
        signup,
        logout,
        updateProfile,
        verifyEmail,
        sendVerificationEmail,
        refreshUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
