"use client";
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function PopularMangaSection({ mangaList }) {
  if (!mangaList || mangaList.length === 0) {
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="h-6 md:h-8 rounded-md w-[.35rem] md:w-[.3rem] bg-white"></span>
          <h2 className="text-xl md:text-2xl font-medium">Popular Manga</h2>
        </div>
        <Link href="/anime/catalog?type=MANGA" className="flex items-center gap-1 text-sm text-[#ff9650] hover:underline">
          <span>View All</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {mangaList.map((manga) => (
          <Link href={`/anime/info/${manga.id}`} key={manga.id} className="group">
            <div className="bg-[#000000] rounded-lg overflow-hidden border border-[#222] hover:border-[#333] transition-all duration-300 h-full flex flex-col transform group-hover:scale-[1.02]">
              <div className="relative pt-[140%] overflow-hidden">
                <img 
                  src={manga.coverImage?.extraLarge || manga.coverImage?.large || '/placeholder.jpg'} 
                  alt={manga.title?.english || manga.title?.romaji}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Status badge */}
                <div className="absolute top-2 left-2">
                  <div className="bg-[#ff9650]/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs inline-flex items-center">
                    <FontAwesomeIcon icon={faBook} className="mr-1.5" />
                    {manga.status?.replace(/_/g, ' ') || 'Unknown'}
                  </div>
                </div>
                
                {/* Rating */}
                {manga.averageScore && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs inline-flex items-center">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                      {manga.averageScore / 10}
                    </div>
                  </div>
                )}
                
                {/* Info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-gray-200 text-xs line-clamp-3">
                    {truncateDescription(manga.description)}
                  </p>
                </div>
              </div>
              
              <div className="p-3 flex flex-col">
                <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-[#ff9650] transition-colors">
                  {manga.title?.english || manga.title?.romaji}
                </h3>
                
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faBookOpen} className="text-[#ff9650]" />
                    {manga.chapters || '?'} Ch
                  </span>
                  <span className="flex items-center gap-1">{manga.format?.replace(/_/g, ' ') || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularMangaSection; 