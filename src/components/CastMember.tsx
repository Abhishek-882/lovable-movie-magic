
import { useState } from 'react';

interface CastMemberProps {
  name: string;
  image?: string;
}

// Mock dataset of actor images
const ACTOR_IMAGES = {
  "N.T. Rama Rao Jr.": "https://m.media-amazon.com/images/M/MV5BZGEwMjFhYzYtMWUwMC00NTk2LTk2YWEtYmIyZmE0Y2EyOGRkXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg",
  "Ram Charan": "https://m.media-amazon.com/images/M/MV5BYTQwNGJlNDMtNjNmOC00NDIyLTk4MmUtZjkxNjY4ZDUxZGJmXkEyXkFqcGdeQXVyMTE0MzY0NjE1._V1_.jpg",
  "Ajay Devgn": "https://m.media-amazon.com/images/M/MV5BMTY4NzM0MzE5N15BMl5BanBnXkFtZTcwNzE5NTM3Mw@@._V1_.jpg",
  "Alia Bhatt": "https://m.media-amazon.com/images/M/MV5BMjEzNjAzMTgzMV5BMl5BanBnXkFtZTgwNjU2NjEwMDI@._V1_.jpg",
  "Olivia Morris": "https://m.media-amazon.com/images/M/MV5BMTgxNTI5MDkyN15BMl5BanBnXkFtZTgwOTI3MzA2MDE@._V1_.jpg",
  "Prabhas": "https://m.media-amazon.com/images/M/MV5BMTY5MzYwNDM5OV5BMl5BanBnXkFtZTgwNDY3MzA2MDE@._V1_.jpg",
  "Rana Daggubati": "https://m.media-amazon.com/images/M/MV5BMjQ2MzkwNDItNmUxYy00ZTRiLWE4MDQtZGJjYTk0YjVlYzdjXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg",
  "Anushka Shetty": "https://m.media-amazon.com/images/M/MV5BMzEyMDVmZGYtOGJmZS00MmNlLTkzNmItMmE5NWRmYzU4MjE0XkEyXkFqcGdeQXVyNDc2NzU1MTA@._V1_.jpg",
  "Tamannaah Bhatia": "https://m.media-amazon.com/images/M/MV5BMTc2MDkxNDAyN15BMl5BanBnXkFtZTgwMzc5NDg3MDE@._V1_.jpg",
  "Ramya Krishnan": "https://m.media-amazon.com/images/M/MV5BZGQzYmU0ODAtZGVkOS00ZmJlLWFlYjQtMmVkYmU1ZWEwZWVmXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_.jpg",
  "Allu Arjun": "https://m.media-amazon.com/images/M/MV5BMjAyNTQ3NTAxN15BMl5BanBnXkFtZTgwNDcyODAzMTE@._V1_.jpg",
  "Fahadh Faasil": "https://m.media-amazon.com/images/M/MV5BMjg1YmJjYTctODQ3ZC00ZjFjLTgzYTctZGQ0ZjAyYmFmYjZlXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg",
  "Rashmika Mandanna": "https://m.media-amazon.com/images/M/MV5BM2FiNzk3YWYtOWQxYi00Zjg0LTkwMDYtNGYyY2JmNzk2MzRiXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg",
  "Vijay Deverakonda": "https://m.media-amazon.com/images/M/MV5BODg4NGFiMDAtZWRkOS00NzcwLWFkNDctOWNiNjJiY2ExZTc2XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg"
};

const CastMember = ({ name, image }: CastMemberProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Try to get image from our mock dataset if not provided
  const imageUrl = image || ACTOR_IMAGES[name as keyof typeof ACTOR_IMAGES];
  
  // Fallback to a default placeholder if no image is available or if there's an error
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
        {!imageError && imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-100 to-red-50 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        )}
      </div>
      <span className="text-center text-sm font-medium">{name}</span>
    </div>
  );
};

export default CastMember;
