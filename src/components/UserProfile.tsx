
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const UserProfile = () => {
  const { user, updateProfile, verifyEmail, sendVerificationEmail, isEmailVerified } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await updateProfile({
        name: formData.name,
        phone: formData.phone,
      });
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendVerification = async () => {
    if (isEmailVerified) return;
    
    setIsLoading(true);
    try {
      const success = await sendVerificationEmail();
      if (success) {
        setOtpDialogOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const success = await verifyEmail(otp);
      if (success) {
        setOtpDialogOpen(false);
        setOtp('');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) return null;
  
  return (
    <div className="rounded-lg border bg-gradient-to-b from-white to-red-50 p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-red-600">My Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border-red-100 focus-visible:ring-red-400"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              readOnly
              disabled
              className="border-red-100"
            />
            {!isEmailVerified && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSendVerification}
                disabled={isLoading}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Verify
              </Button>
            )}
          </div>
          {!isEmailVerified && (
            <p className="text-sm text-amber-500">
              Email verification is required before making payments.
            </p>
          )}
          {isEmailVerified && (
            <p className="text-sm text-green-500">
              Email verified ✓
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="border-red-100 focus-visible:ring-red-400"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
      
      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Email Verification</DialogTitle>
            <DialogDescription>
              Please enter the 6-digit OTP sent to your email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="border-red-100 focus-visible:ring-red-400"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setOtpDialogOpen(false)}
                className="border-red-100"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleVerifyEmail} 
                disabled={otp.length !== 6 || isLoading}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
