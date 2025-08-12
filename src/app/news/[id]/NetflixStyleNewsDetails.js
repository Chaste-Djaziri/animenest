"use client"
import React from 'react';
import Characters from '@/components/details/Characters';
import Animecards from '@/components/CardComponent/Animecards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarAlt, faFilm, faPlayCircle, faUsers, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function NetflixStyleNewsDetails({ data, id, session }) {
  // Format date
  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.year) return 'Unknown date';
    const { year, month, day } = dateObj;
    return `${month}/${day}/${year}`;
  };

  // Create markup for dangerouslySetInnerHTML
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="w-full bg-black">
      {/* Netflix-style Hero Banner Section */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10"></div>
        <img 
          src={data.bannerImage || data.coverImage?.extraLarge || '/placeholder.jpg'} 
          alt={data.title?.english || data.title?.romaji}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Content positioned at bottom left */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20 flex flex-col items-start">
          {/* Title and metadata */}
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              {data.title?.english || data.title?.romaji}
            </h1>
            
            {/* Netflix-style metadata row */}
            <div className="flex items-center gap-3 text-sm text-[#ddd] mb-4 flex-wrap">
              {data.format && (
                <span className="text-[#ff9650] font-medium">
                  {data.format.replace(/_/g, ' ')}
                </span>
              )}
              {data.startDate?.year && <span>{data.startDate.year}</span>}
              {data.averageScore && (
                <span className="px-2 py-0.5 bg-[#333] rounded text-xs flex items-center">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                  {(data.averageScore / 10).toFixed(1)}/10
                </span>
              )}
            </div>
            
            {/* Description */}
            {data.description && (
              <div 
                className="text-[#ddd] text-base mb-6 max-w-2xl leading-relaxed prose prose-invert prose-p:text-[#ddd] prose-a:text-[#ff9650] prose-headings:text-white max-h-[150px] overflow-y-auto custom-scrollbar"
                dangerouslySetInnerHTML={createMarkup(data.description)}
              ></div>
            )}
            
            {/* Genres in Netflix style */}
            <div className="flex flex-wrap gap-2 mb-6">
              {data.genres?.map((genre, index) => (
                <Link 
                  href={`/genre/${genre.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").toLowerCase()}`}
                  key={index} 
                  className="px-2 py-1 bg-[#333] hover:bg-[#444] rounded text-xs text-white transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>
            
            {/* Netflix-style Action Buttons */}
            {data.trailer && data.trailer.site === "youtube" && (
              <div className="flex items-center gap-4">
                <a 
                  href={`https://www.youtube.com/watch?v=${data.trailer.id}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#e6e6e6] text-black font-medium rounded-md transition-colors"
                >
                  <FontAwesomeIcon icon={faPlayCircle} />
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Sections with completely transparent background */}
      <div className="w-full bg-black">
        {/* Trailer Section */}
        {data.trailer && data.trailer.site === "youtube" && (
          <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 border-b border-[#333]">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-4 sm:mb-6 border-l-4 border-[#ff9650] pl-4">Trailer</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${data.trailer.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
        
        {/* About Section */}
        <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 border-b border-[#333]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4 border-l-4 border-[#ff9650] pl-4">
                About {data.title?.english || data.title?.romaji}
              </h2>
              
              {data.description ? (
                <div 
                  className="text-[#999] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 prose prose-invert prose-p:text-[#999] prose-a:text-[#ff9650] prose-headings:text-white max-w-none"
                  dangerouslySetInnerHTML={createMarkup(data.description)}
                ></div>
              ) : (
                <p className="text-[#999] mb-4">No description available.</p>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-x-8 sm:gap-y-4 text-sm">
                {data.genres?.length > 0 && (
                  <div className="mb-2 sm:mb-0">
                    <p className="text-[#999] mb-1">Genres:</p>
                    <div className="flex flex-wrap">
                      {data.genres.map((genre, index) => (
                        <Link
                          key={index}
                          href={`/genre/${genre.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").toLowerCase()}`}
                          className="text-white hover:underline mr-1"
                        >
                          {genre}{index < data.genres.length - 1 && ", "}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.studios?.nodes?.length > 0 && (
                  <div className="mb-2 sm:mb-0">
                    <p className="text-[#999] mb-1">Studios:</p>
                    <div className="flex flex-wrap">
                      {data.studios.nodes.map((studio, index) => (
                        <Link
                          key={index}
                          href={`/producer/${studio.name.replace(/[&'"^%$#@!()+=<>:;,.?\/\\|{}[\]`~*_]/g, "").split(" ").join("-").replace(/-+/g, "-")}`}
                          className="text-white hover:underline mr-1"
                        >
                          {studio.name}{index < data.studios.nodes.length - 1 && ", "}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.status && (
                  <div className="mb-2 sm:mb-0">
                    <p className="text-[#999] mb-1">Status:</p>
                    <p className="text-white">{data.status.replace(/_/g, ' ') || "Unknown"}</p>
                    
                    {data.averageScore && (
                      <>
                        <p className="text-[#999] mb-1 mt-3">Score:</p>
                        <p className="text-white flex items-center">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                          {(data.averageScore / 10).toFixed(1)}/10
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#999] mb-1">Type:</p>
                  <p className="text-white">{data.format?.replace(/_/g, ' ') || "Unknown"}</p>
                  
                  <p className="text-[#999] mb-1 mt-3">Released:</p>
                  <p className="text-white">{formatDate(data.startDate) || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-[#999] mb-1">Season:</p>
                  <p className="text-white">{data.season ? `${data.season.charAt(0) + data.season.slice(1).toLowerCase()} ${data.startDate?.year}` : "Unknown"}</p>
                  
                  <p className="text-[#999] mb-1 mt-3">Episodes:</p>
                  <p className="text-white">{data.episodes || "Unknown"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Characters Section */}
        {data?.characters?.edges?.length > 0 && (
          <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 border-b border-[#333]">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-4 sm:mb-6 border-l-4 border-[#ff9650] pl-4">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-[#ff9650]" />
              Cast
            </h2>
            <Characters data={data?.characters?.edges} />
          </div>
        )}
        
        {/* Recommendations Section */}
        {data?.recommendations?.nodes?.length > 0 && (
          <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-4 sm:mb-6 border-l-4 border-[#ff9650] pl-4">
              <FontAwesomeIcon icon={faThumbsUp} className="mr-2 text-[#ff9650]" />
              More Like This
            </h2>
            <Animecards data={data.recommendations.nodes} cardid="Recommendations" show={false} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NetflixStyleNewsDetails;
