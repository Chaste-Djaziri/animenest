"use client";
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAward, faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons';

function TopRatedSection({ animeList }) {
  if (!animeList || animeList.length === 0) {
    return null;
  }

  // Clean and truncate HTML description
  const truncateDescription = (html, maxLength = 100) => {
    if (!html) return '';
    
    // Simple regex to strip HTML tags
    const text = html.replace(/<[^>]*>/g, '');
    
    // Truncate text
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="h-6 md:h-8 rounded-md w-[.35rem] md:w-[.3rem] bg-white"></span>
          <h2 className="text-xl md:text-2xl font-medium">Top Rated Anime</h2>
          <div className="flex items-center bg-[#ff9650] px-2 py-1 rounded-full ml-2 text-xs text-white">
            <FontAwesomeIcon icon={faTrophy} className="mr-1" />
            <span>Highest Scores</span>
          </div>
        </div>
        <Link href="/anime/catalog?sort=SCORE_DESC" className="flex items-center gap-1 text-sm text-[#ff9650] hover:underline">
          <span>View All</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {animeList.map((anime, index) => (
          <Link href={`/anime/info/${anime.id}`} key={anime.id} className="group">
            <div className="bg-[#000000] rounded-lg overflow-hidden border border-[#222] hover:border-[#333] transition-all duration-300 h-full flex flex-col transform group-hover:scale-[1.02]">
              <div className="relative">
                <div className="pt-[140%] overflow-hidden">
                  <img 
                    src={anime.coverImage?.extraLarge || anime.coverImage?.large || '/placeholder.jpg'} 
                    alt={anime.title?.english || anime.title?.romaji}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Score badge */}
                <div className="absolute top-0 right-0">
                  <div className={`${index < 3 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-[#ff9650]'} py-2 px-3 rounded-bl-lg text-white font-bold flex items-center shadow-lg`}>
                    <FontAwesomeIcon icon={index < 3 ? faAward : faStar} className={`${index < 3 ? 'text-white' : 'text-yellow-400'} mr-1.5`} />
                    {(anime.averageScore / 10).toFixed(1)}
                  </div>
                </div>
                
                {/* Ranking for top 3 */}
                {index < 3 && (
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#ff9650] border-2 border-white flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                )}
                
                {/* Info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-gray-200 text-xs line-clamp-3">
                    {truncateDescription(anime.description)}
                  </p>
                </div>
              </div>
              
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-white mb-1.5 line-clamp-2 group-hover:text-[#ff9650] transition-colors">
                  {anime.title?.english || anime.title?.romaji}
                </h3>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {anime.genres?.slice(0, 1).map((genre, index) => (
                    <span key={index} className="px-2 py-0.5 bg-[#111] text-gray-300 rounded-full text-xs">
                      {genre}
                    </span>
                  ))}
                  {anime.format && (
                    <span className="px-2 py-0.5 bg-[#ff9650]/20 text-[#ff9650] rounded-full text-xs">
                      {anime.format.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopRatedSection; 