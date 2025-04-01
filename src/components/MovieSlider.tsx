import { MovieCard } from "./MovieCard";
import { Movie } from "@/lib/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface MovieSliderProps {
  movies: Movie[];
}

export const MovieSlider = ({ movies }: MovieSliderProps) => {
  // Filter for your 3 specific movies
  const featuredMovies = movies.filter(movie => 
    ['K.G.F: Chapter 2', 'RRR', 'Arjun Reddy'].includes(movie.title)
  );

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Now Showing</h2>
        
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          autoplay={{ delay: 3000 }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2.3 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.2 }
          }}
          className="pb-12"
        >
          {featuredMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} featured />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
