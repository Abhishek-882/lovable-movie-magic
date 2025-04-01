
import { User } from 'lucide-react';

interface CastMemberProps {
  name: string;
  imageUrl?: string;
}

const CastMember = ({ name, imageUrl }: CastMemberProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 h-24 w-24 overflow-hidden rounded-full shadow-md relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces";
              e.currentTarget.onerror = null;
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-red-100 to-red-50 flex items-center justify-center">
            <User className="h-12 w-12 text-red-400" />
          </div>
        )}
      </div>
      <span className="text-center text-sm font-medium">{name}</span>
    </div>
  );
};

export default CastMember;
