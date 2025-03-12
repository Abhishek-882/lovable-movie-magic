
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user, updateProfile, verifyEmail, isEmailVerified } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  const handleVerifyEmail = async () => {
    if (isEmailVerified) return;
    
    setIsLoading(true);
    try {
      await verifyEmail();
      // In a real app, this would send a verification email
      toast({
        title: "Verification email sent",
        description: "Please check your inbox to verify your email address.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) return null;
  
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">My Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
            />
            {!isEmailVerified && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleVerifyEmail}
                disabled={isLoading}
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
          />
        </div>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
