"use client"
import React from 'react'
import Link from 'next/link'
import { useTitle } from '@/lib/store';
import { useStore } from 'zustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faFilm, faTv, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const handleToggle = () => {
        if (animetitle === 'english') {
            useTitle.setState({ animetitle: 'romaji' })
        } else {
            useTitle.setState({ animetitle: 'english' })
        }
    };

    function getSeason(month) {
        if (month === 12 || month === 1 || month === 2) {
            return 'WINTER';
        } else if (month === 3 || month === 4 || month === 5) {
            return 'SPRING';
        } else if (month === 6 || month === 7 || month === 8) {
            return 'SUMMER';
        } else {
            return 'FALL';
        }
    }

    const format = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

    function nextSeason(currentSeason) {
        const currentSeasonIndex = format.indexOf(currentSeason);
        const nextSeasonIndex = (currentSeasonIndex + 1) % format.length;
        return format[nextSeasonIndex];
    }

    return (
        <div>
            <footer className="bg-black mt-10 border-t border-[#222]">
                <div className="mx-auto w-full lg:max-w-[85%] p-4 py-8 lg:pt-10 lg:pb-6">
                    <div className="lg:flex lg:justify-between">
                        <div className="mb-8 lg:mb-0">
                            <Link href="/" className="flex items-center w-fit mb-4">
                                <p className={`self-center text-4xl font-medium whitespace-nowrap dark:text-white font-['Bebas_Neue'] tracking-wider`}>ANI<span className="text-[#ff9650] text-shadow">NEST</span></p>
                            </Link>
                            <p className="font-sans text-sm text-[#999] lg:w-[520px] leading-relaxed mb-6">
                                The ultimate destination for anime streaming. ANINEST does not store any files on our server, we are linked
                                to media which is hosted on 3rd party services.
                            </p>
                            <div className="flex gap-4 mb-4">
                                <Link href="https://instagram.com/rishab._.morningstar" target="_blank" className="text-[#999] hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </Link>
                                <Link href="discord.gg/soupfr" target="_blank" className="text-[#999] hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
                            <div>
                                <h3 className="text-white font-medium text-base mb-4">Browse</h3>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <Link href="/anime/catalog" className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faGlobe} className="w-3 h-3" /> Browse All
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/anime/catalog?format=MOVIE" className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faFilm} className="w-3 h-3" /> Movies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/anime/catalog?format=TV" className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faTv} className="w-3 h-3" /> TV Shows
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-medium text-base mb-4">Seasons</h3>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <Link href={`/anime/catalog?season=${getSeason(month + 1)}&year=2024`} className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="w-3 h-3" /> This Season
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/anime/catalog?season=${nextSeason(getSeason(month + 1))}&year=2024`} className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="w-3 h-3" /> Upcoming Season
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-medium text-base mb-4">About</h3>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <Link href="/dmca" className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faInfoCircle} className="w-3 h-3" /> DMCA
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://anime.micorp.pro/about" target='_blank' className="text-[#999] hover:text-white text-sm flex items-center gap-2 transition-colors">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" /></svg> About
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-t border-[#222] mt-6'></div>
                <div className="mx-auto w-full lg:max-w-[85%] flex flex-col lg:flex-row lg:items-center lg:justify-between text-sm text-[#999] py-6">
                    <div className="flex items-center gap-4 mb-4 lg:mb-0">
                        <div className="flex items-center">
                            <label className="relative cursor-pointer flex items-center gap-3">
                                <span className="text-xs font-medium">Language:</span>
                                {animetitle && (
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={animetitle === 'english'}
                                        onChange={handleToggle}
                                    />
                                )}
                                <div className="w-[50px] h-6 flex items-center bg-[#333] rounded-full peer-checked:bg-[#ff9650] transition-colors after:flex after:items-center after:justify-center peer after:content-['JP'] peer-checked:after:content-['EN'] peer-checked:after:translate-x-full after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:mx-0.5 after:transition-all after:text-[10px] after:font-bold after:text-black">
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <p>© {year} <Link href="/" className="text-[#ff9650] hover:text-white transition-colors">ANINEST™</Link> | Made with ❤️ by <span className="font-medium text-white">CHASTE DJAZIRI</span></p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
