
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
  redirectPath?: string;
  onSuccess?: () => void;
}

const AuthModal = ({ isOpen, onClose, initialTab = 'login', redirectPath, onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const { login, signup } = useAuth();
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Signup form states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        onClose();
        if (onSuccess) onSuccess();
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      }
    } finally {
      setLoginLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    
    setSignupLoading(true);
    
    try {
      const success = await signup(signupName, signupEmail, signupPassword);
      if (success) {
        onClose();
        if (onSuccess) onSuccess();
        if (redirectPath) {
          window.location.href = redirectPath;
        }
      }
    } finally {
      setSignupLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Cinematic</DialogTitle>
          <DialogDescription>
            Sign in to your account to book tickets and manage your profile.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loginLoading}>
                {loginLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  placeholder="John Doe" 
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input 
                  id="signup-confirm-password" 
                  type="password" 
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>
              {signupError && (
                <div className="text-sm text-red-500">{signupError}</div>
              )}
              <Button type="submit" className="w-full" disabled={signupLoading}>
                {signupLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="text-center sm:text-right">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
