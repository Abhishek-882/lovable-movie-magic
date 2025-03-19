
import { User } from 'lucide-react';

interface CastMemberProps {
  name: string;
}

const CastMember = ({ name }: CastMemberProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 h-24 w-24 overflow-hidden rounded-full shadow-md bg-gradient-to-r from-red-100 to-red-50 flex items-center justify-center">
        <User className="h-12 w-12 text-red-400" />
      </div>
      <span className="text-center text-sm font-medium">{name}</span>
    </div>
  );
};

export default CastMember;
