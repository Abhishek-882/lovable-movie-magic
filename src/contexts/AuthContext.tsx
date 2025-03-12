
import React, { createContext, useContext, useState, useEffect } from 'react';
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
  verifyEmail: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      // Mock successful login for now
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        isVerified: false,
        profileComplete: false,
      };
      
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "Welcome back to Cinematic!",
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      // Mock successful signup
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        isVerified: false,
        profileComplete: false,
      };
      
      setUser(mockUser);
      toast({
        title: "Account created",
        description: "Welcome to Cinematic! Please verify your email.",
      });
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = {
        ...user,
        ...userData,
        profileComplete: true,
      };
      
      setUser(updatedUser);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyEmail = async (): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const verifiedUser = {
        ...user,
        isVerified: true,
      };
      
      setUser(verifiedUser);
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      });
      return true;
    } catch (error) {
      console.error('Email verification failed:', error);
      toast({
        title: "Verification failed",
        description: "Failed to verify your email. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isProfileComplete: user?.profileComplete || false,
        isEmailVerified: user?.isVerified || false,
        login,
        signup,
        logout,
        updateProfile,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
