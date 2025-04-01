import { MovieCard } from "./MovieCard";
import { Movie } from "@/lib/types";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieSliderProps {
  movies: Movie[];
}

export const MovieSlider = ({ movies }: MovieSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    skipSnaps: false
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [movies, emblaApi]);

  const sliderMovies = movies.filter(movie => 
    ['K.G.F: Chapter 2', 'RRR', 'Arjun Reddy'].includes(movie.title)
  );

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Featured Movies</h2>
        
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {sliderMovies.map(movie => (
              <div 
                className="embla__slide flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%]"
                key={movie.id}
              >
                <MovieCard movie={movie} featured />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        
        <button 
          className="embla__next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>
      </div>
    </section>
  );
};
