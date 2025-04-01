
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
  verifyEmail: (otp: string) => Promise<boolean>;
  sendVerificationEmail: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage key for users
const USERS_STORAGE_KEY = 'registered_users';
const CURRENT_USER_KEY = 'current_user';

// Mock function to get registered users
const getRegisteredUsers = (): Record<string, User & { password: string }> => {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : {};
};

// Mock function to save registered users
const saveRegisteredUsers = (users: Record<string, User & { password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

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
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  // Load current user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getRegisteredUsers();
      
      // Check if the user exists and password matches
      if (users[email] && users[email].password === password) {
        // Create user object without the password
        const { password: _, ...userWithoutPassword } = users[email];
        setUser(userWithoutPassword);
        
        toast({
          title: "Login successful",
          description: "Welcome back to Cinematic!",
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Email or password is incorrect. Please try again or signup.",
          variant: "destructive",
        });
        return false;
      }
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
    try {
      const users = getRegisteredUsers();
      
      // Check if the user already exists
      if (users[email]) {
        toast({
          title: "Signup failed",
          description: "Email already registered. Please login instead.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create a new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        email,
        isEmailVerified: false,
        isProfileComplete: false,
        password
      };
      
      // Save the new user to storage
      users[email] = newUser;
      saveRegisteredUsers(users);
      
      // Set the current user (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
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
    localStorage.removeItem(CURRENT_USER_KEY);
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
        isProfileComplete: true,
      };
      
      setUser(updatedUser);
      
      // Also update the user in the registered users
      if (user.email) {
        const users = getRegisteredUsers();
        if (users[user.email]) {
          users[user.email] = { ...users[user.email], ...userData, isProfileComplete: true };
          saveRegisteredUsers(users);
        }
      }
      
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

  const sendVerificationEmail = async (): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(otp);
      
      toast({
        title: "Verification code sent",
        description: `Your verification code is: ${otp}`,
      });
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      toast({
        title: "Failed to send code",
        description: "Could not send verification code. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyEmail = async (otp: string): Promise<boolean> => {
    try {
      if (!user || !verificationCode) return false;
      
      if (otp === verificationCode) {
        const verifiedUser = {
          ...user,
          isEmailVerified: true,
        };
        
        setUser(verifiedUser);
        
        // Also update the user in the registered users
        if (user.email) {
          const users = getRegisteredUsers();
          if (users[user.email]) {
            users[user.email] = { ...users[user.email], isEmailVerified: true };
            saveRegisteredUsers(users);
          }
        }
        
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
        return true;
      } else {
        toast({
          title: "Verification failed",
          description: "Invalid verification code. Please try again.",
          variant: "destructive",
        });
        return false;
      }
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
        isProfileComplete: user?.isProfileComplete || false,
        isEmailVerified: user?.isEmailVerified || false,
        login,
        signup,
        logout,
        updateProfile,
        verifyEmail,
        sendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
