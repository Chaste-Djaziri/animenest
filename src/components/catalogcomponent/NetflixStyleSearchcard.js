"use client";
import Link from 'next/link';
import Image from 'next/image';
import { AdvancedSearch } from '@/lib/Anilistfunctions';
import React, { useEffect, useState } from 'react';
import { Pagination, Spinner } from "@nextui-org/react";
import UseDebounce from '@/utils/UseDebounce';
import { useTitle } from '@/lib/store';
import { useStore } from 'zustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar, faCalendarAlt, faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';

function NetflixStyleSearchcard({ searchvalue, selectedYear, seasonvalue, formatvalue, genrevalue, sortbyvalue, airingvalue }) {
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchdata, setsearchdata] = useState(null);
    const [lastpage, setlastpage] = useState();
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const debouncedSearch = UseDebounce(searchvalue, 500);

    useEffect(() => {
        const fetchsearch = async () => {
            setLoading(true);
            try {
                const response = await AdvancedSearch(debouncedSearch, selectedYear, seasonvalue, formatvalue, genrevalue, sortbyvalue, currentPage);
                setsearchdata(response.media);
                setlastpage(response.pageInfo.lastPage);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };
        fetchsearch();
    }, [debouncedSearch, selectedYear, seasonvalue, formatvalue, genrevalue, sortbyvalue, currentPage, airingvalue]);

    // Function to format status in a more readable way
    const formatStatus = (status) => {
        if (!status) return "Unknown";
        
        switch(status) {
            case "RELEASING":
                return "Airing";
            case "FINISHED":
                return "Completed";
            case "NOT_YET_RELEASED":
                return "Coming Soon";
            case "CANCELLED":
                return "Cancelled";
            case "HIATUS":
                return "On Hiatus";
            default:
                return status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, ' ');
        }
    };

    // Function to get status color
    const getStatusColor = (status) => {
        switch(status) {
            case "RELEASING":
                return "text-green-500";
            case "NOT_YET_RELEASED":
                return "text-red-500";
            case "CANCELLED":
                return "text-red-400";
            case "HIATUS":
                return "text-yellow-500";
            default:
                return "text-white";
        }
    };

    return (
        <div className="w-full bg-black">
            {/* Loading state */}
            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {Array.from({ length: 18 }, (_, index) => (
                        <div key={index} className="relative rounded-md overflow-hidden bg-[#111] animate-pulse">
                            <div className="aspect-[2/3] w-full"></div>
                            <div className="p-2 space-y-2">
                                <div className="h-4 bg-[#222] rounded"></div>
                                <div className="h-3 bg-[#222] rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No results state */}
            {!loading && searchdata && searchdata.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-black">
                    <div className="text-4xl font-bold text-[#1a365d] mb-4">No Results Found</div>
                    <p className="text-xl text-[#999] mb-6">
                        We couldn't find any anime matching your search for{" "}
                        <span className="text-white font-medium">"{searchvalue}"</span>
                    </p>
                    <p className="text-[#999]">Try adjusting your filters or search term</p>
                </div>
            )}

            {/* Results grid - Netflix style */}
            {!loading && searchdata && searchdata.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 bg-black">
                    {searchdata.map((item) => (
                        <Link 
                            href={`/anime/info/${item.id}`} 
                            key={item.id}
                            className="group"
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="relative rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl bg-[#0a0a0a] border border-[#222]">
                                {/* Image container */}
                                <div className="relative aspect-[2/3] w-full">
                                    <Image
                                        src={item.coverImage?.extraLarge ?? item.image}
                                        alt={item.title[animetitle] || item.title.romaji}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPYe5+SiwAAAABJRU5ErkJggg=="
                                    />
                                    
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {/* Play button */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-12 h-12 rounded-full bg-[#1a365d]/90 backdrop-blur-sm flex items-center justify-center border border-[#1a365d] text-white">
                                                <FontAwesomeIcon icon={faPlay} className="ml-1" />
                                            </div>
                                        </div>
                                        
                                        {/* Bottom info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 text-xs">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className={`${getStatusColor(item.status)} font-medium`}>
                                                    {formatStatus(item.status)}
                                                </span>
                                                <span className="text-[10px] text-[#999]">•</span>
                                                <span className="text-[#999]">{item.format || "?"}</span>
                                                {item.episodes && (
                                                    <>
                                                        <span className="text-[10px] text-[#999]">•</span>
                                                        <span className="text-[#999]">
                                                            {item.episodes} {item.episodes === 1 ? "Episode" : "Episodes"}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            
                                            {item.genres && item.genres.length > 0 && (
                                                <div className="text-[#999] mb-1 truncate">
                                                    {item.genres.slice(0, 3).join(", ")}
                                                </div>
                                            )}
                                            
                                            {item.averageScore && (
                                                <div className="flex items-center text-[#999]">
                                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                                                    <span>{(item.averageScore / 10).toFixed(1)}/10</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Status indicator */}
                                    {item.status && (
                                        <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium bg-black/90 backdrop-blur-sm text-white border border-[#333]">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${getStatusColor(item.status)}`}></span>
                                            {formatStatus(item.status)}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Title */}
                                <div className="p-3">
                                    <h3 className="text-sm font-medium text-white line-clamp-2">
                                        {item.title[animetitle] || item.title.romaji}
                                    </h3>
                                    <div className="flex items-center text-xs text-[#999] mt-2">
                                        <span>{item.startDate?.year || "?"}</span>
                                        {item.season && (
                                            <>
                                                <span className="mx-1">•</span>
                                                <span>{item.season.charAt(0) + item.season.slice(1).toLowerCase()}</span>
                                            </>
                                        )}
                                        {item.averageScore && (
                                            <>
                                                <span className="mx-1">•</span>
                                                <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                                                <span>{(item.averageScore / 10).toFixed(1)}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination - Netflix style */}
            {lastpage > 1 && (
                <div className="flex justify-center mt-10 pb-8 bg-black">
                    <Pagination
                        total={lastpage}
                        initialPage={1}
                        page={currentPage}
                        onChange={setCurrentPage}
                        classNames={{
                            wrapper: "gap-0 overflow-visible",
                            item: "bg-[#111] text-white border-[#222] hover:bg-[#222]",
                            cursor: "bg-[#1a365d] text-white font-medium border-[#1a365d]",
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default NetflixStyleSearchcard;
