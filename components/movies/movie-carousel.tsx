"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation module styles
import "swiper/css/pagination"; // Pagination module styles
import "swiper/css/bundle"; // If you prefer a single bundled CSS

// Import your MovieCard component
import { MovieCard } from "@/components/movies/movie-card"; // Replace with the actual path to your component

const MovieCarousel = ({ movies }: { movies: any[] }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]} // Add modules here
        spaceBetween={12} // Space between slides
        slidesPerView={5} // Number of slides visible at a time
        loop={true} // Infinite scrolling
        navigation // Enables navigation buttons
        breakpoints={{
          0: { slidesPerView: 2 },
          // Responsive breakpoints for dynamic slidesPerView
          320: { slidesPerView: 2 }, // 1 slide for small screens
          640: { slidesPerView: 3 }, // 2 slides for medium screens
          1024: { slidesPerView: 5 }, // 4 slides for larger screens
        }}
        className="w-full"
      >
        {/* Map over movies to create slides */}
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
            <div className="h-10"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
