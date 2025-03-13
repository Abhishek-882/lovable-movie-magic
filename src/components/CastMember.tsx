import { useState } from 'react';

interface CastMemberProps {
  name: string;
  image?: string;
}

// Updated dataset of actor images with more comprehensive coverage
const ACTOR_IMAGES: Record<string, string> = {
  // RRR Cast
  "N.T. Rama Rao Jr.": "https://static.toiimg.com/photo/msid-89812267/89812267.jpg",
  "Ram Charan": "https://static.toiimg.com/photo/95440640.cms",
  "Ajay Devgn": "https://static.toiimg.com/photo/msid-89812299/89812299.jpg",
  "Alia Bhatt": "https://static.toiimg.com/photo/msid-89812306/89812306.jpg",
  "Olivia Morris": "https://static.toiimg.com/photo/msid-90086344/90086344.jpg",
  
  // Baahubali Cast
  "Prabhas": "https://static.toiimg.com/photo/msid-100581209/100581209.jpg",
  "Rana Daggubati": "https://static.toiimg.com/photo/msid-80554187/80554187.jpg",
  "Anushka Shetty": "https://static.toiimg.com/photo/msid-89521463/89521463.jpg",
  "Tamannaah Bhatia": "https://static.toiimg.com/photo/msid-101109528/101109528.jpg",
  "Ramya Krishnan": "https://static.toiimg.com/photo/msid-72293279/72293279.jpg",
  
  // Pushpa Cast
  "Allu Arjun": "https://static.toiimg.com/photo/msid-88669346/88669346.jpg",
  "Fahadh Faasil": "https://static.toiimg.com/photo/msid-95971465/95971465.jpg",
  "Rashmika Mandanna": "https://static.toiimg.com/photo/msid-96389886/96389886.jpg",
  "Sunil": "https://static.toiimg.com/photo/msid-96389886/96389886.jpg",
  "Dhananjaya": "https://static.toiimg.com/photo/msid-88669346/88669346.jpg",
  
  // Other popular Telugu actors
  "Vijay Deverakonda": "https://static.toiimg.com/photo/msid-93592265/93592265.jpg",
  "Mahesh Babu": "https://static.toiimg.com/photo/msid-96333400/96333400.jpg",
  "Nani": "https://static.toiimg.com/photo/msid-100083477/100083477.jpg",
  "Samantha Ruth Prabhu": "https://static.toiimg.com/photo/msid-96195635/96195635.jpg",
  "Kajal Aggarwal": "https://static.toiimg.com/photo/msid-78238298/78238298.jpg",
  "Nagarjuna": "https://static.toiimg.com/photo/msid-93850344/93850344.jpg",
  "Jr NTR": "https://static.toiimg.com/photo/msid-89812267/89812267.jpg",
  "Chiranjeevi": "https://static.toiimg.com/photo/msid-95279853/95279853.jpg",
  "Venkatesh": "https://static.toiimg.com/photo/msid-96264043/96264043.jpg",
  "Naga Chaitanya": "https://static.toiimg.com/photo/msid-92410480/92410480.jpg",
  "Ravi Teja": "https://static.toiimg.com/photo/msid-95653542/95653542.jpg",
  "Sai Pallavi": "https://static.toiimg.com/photo/msid-92003988/92003988.jpg",
  "Pooja Hegde": "https://static.toiimg.com/photo/msid-96160766/96160766.jpg",
  "Nikhil Siddhartha": "https://static.toiimg.com/photo/msid-93681248/93681248.jpg",
  "Naga Shaurya": "https://static.toiimg.com/photo/msid-96096329/96096329.jpg",
  "Krithi Shetty": "https://static.toiimg.com/photo/msid-87526133/87526133.jpg",
  "Sree Leela": "https://static.toiimg.com/photo/msid-96160766/96160766.jpg"
};

const CastMember = ({ name, image }: CastMemberProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Try to get image from our dataset if not provided
  const imageUrl = image || ACTOR_IMAGES[name] || ACTOR_IMAGES[name.split(' ')[0]];
  
  // Fallback to a default placeholder if no image is available or if there's an error
  const handleImageError = () => {
    console.log(`Image failed to load for: ${name}`);
    setImageError(true);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 h-24 w-24 overflow-hidden rounded-full shadow-md bg-gradient-to-r from-red-100 to-red-50">
        {!imageError && imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-full w-full object-cover"
            onError={handleImageError}
            loading="lazy"
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
