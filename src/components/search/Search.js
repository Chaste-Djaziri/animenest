"use client"
import { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Link from 'next/link'
import UseDebounce from "@/utils/UseDebounce";
import { AdvancedSearch } from "@/lib/Anilistfunctions";
import { useRouter } from 'next/navigation';
import { useTitle, useSearchbar } from '@/lib/store';
import { useStore } from 'zustand';

function Search() {
    const router = useRouter();
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const Isopen = useStore(useSearchbar, (state) => state.Isopen);
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearch = UseDebounce(query, 500);
    const [nextPage, setNextPage] = useState(false);

    let focusInput = useRef(null);

    async function searchdata() {
        setLoading(true);
        // const res = await axios.get(
        //     // `https://api.anify.tv/search/anime/${query} `
        //     `https://consumet-anime-api.vercel.app/meta/anilist/advanced-search`,{ params: { query:query,sort:["POPULARITY_DESC","SCORE_DESC","FAVOURITES","TRENDING"] } }

        // );
        const res = await AdvancedSearch(debouncedSearch);
        setData(res?.media)
        setNextPage(res?.pageInfo?.hasNextPage);
        console.log(res);
        setLoading(false);
    }

    useEffect(() => {
        if (debouncedSearch) {
            searchdata();
        }
    }, [debouncedSearch]);

    function closeModal() {
        useSearchbar.setState({ Isopen: false });
    }

    return (
        <Transition appear show={Isopen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[99999]"
                initialFocus={focusInput}
                onClose={closeModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/90" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl max-h-[75dvh] transform text-left transition-all">
                                <Combobox
                                    as="div"
                                    className="max-w-[600px] mx-auto rounded-lg shadow-2xl relative flex flex-col"
                                    onChange={(e) => {
                                        useSearchbar.setState({ Isopen: false });
                                        setData(null);
                                        setQuery("");
                                    }}
                                >
                                    <div className="flex justify-between py-2 px-3 bg-black rounded-t-lg border-b border-[#333]">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#999] text-sm">Quick access:</span>
                                            <div className="bg-[#222] text-white text-xs font-medium px-2 py-1 rounded-md border border-[#444]">CTRL</div>
                                            <span className="text-[#999]">+</span>
                                            <div className="bg-[#222] text-white text-xs font-medium px-2 py-1 rounded-md border border-[#444]">K</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-[#444] bg-[#222] px-3 py-1 text-sm font-medium text-white hover:bg-[#333] transition-colors duration-200 focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                ESC
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-black border-b border-[#333] p-1">
                                        <div className="bg-[#ff9650] rounded-full p-1.5 ml-3 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </div>
                                        <Combobox.Input
                                            ref={focusInput}
                                            className="p-4 text-white w-full bg-transparent border-0 outline-none text-lg"
                                            placeholder="Search anime titles..."
                                            onChange={(event) => setQuery(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    useSearchbar.setState({ Isopen: false });
                                                    router.push(`/anime/catalog?search=${encodeURIComponent(event.target.value)}`);
                                                    setData(null);
                                                    setQuery("");
                                                }
                                            }}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <Combobox.Options
                                        static
                                        className="bg-black rounded-b-lg max-h-[50dvh] overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-[#ff9650] scrollbar-thumb-rounded border-t border-[#222]"
                                    >
                                        {!loading ? (
                                            <Fragment>
                                                {data?.length > 0
                                                    ? data?.map((item) => (
                                                        <Combobox.Option
                                                            key={item.id}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-3 px-4 border-b border-[#222] ${active ? "bg-[#111]" : "bg-black"}`
                                                            }
                                                        >
                                                            <Link href={`/anime/info/${item.id}`} className="flex gap-3 items-center">
                                                                <div className="w-[55px] h-[80px] relative overflow-hidden rounded-md group">
                                                                    <img
                                                                        src={item.coverImage.large || item.coverImage.medium}
                                                                        alt="cover"
                                                                        className="absolute inset-0 w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                                </div>
                                                                <div className="flex flex-col flex-1">
                                                                    <div className="text-base font-medium text-white group-hover:text-[#ff9650] transition-colors duration-200">
                                                                        {item.title[animetitle] || item.title.romaji}
                                                                    </div>
                                                                    <div className="text-xs flex items-center text-[#999] mt-1 flex-wrap">
                                                                        <span className="flex items-center gap-1 bg-[#111] px-2 py-0.5 rounded mr-2 mb-1">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#ff9650]" viewBox="0 0 1664 1600"><path fill="currentColor" d="M1664 615q0 22-26 48l-363 354l86 500q1 7 1 20q0 21-10.5 35.5T1321 1587q-19 0-40-12l-449-236l-449 236q-22 12-40 12q-21 0-31.5-14.5T301 1537q0-6 2-20l86-500L25 663Q0 636 0 615q0-37 56-46l502-73L783 41q19-41 49-41t49 41l225 455l502 73q56 9 56 46" /></svg>
                                                                            <span className="text-white">{item.averageScore / 10 || "0"}</span>
                                                                        </span>
                                                                        {item.format && (
                                                                            <span className="bg-[#111] px-2 py-0.5 rounded mr-2 mb-1">{item.format || item.type || "N/A"}</span>
                                                                        )}
                                                                        {item?.startDate?.year && (
                                                                            <span className="bg-[#111] px-2 py-0.5 rounded mr-2 mb-1">{item?.startDate?.year || "N/A"}</span>
                                                                        )}
                                                                        {item.status && (
                                                                            <span className="bg-[#111] px-2 py-0.5 rounded mb-1">{item.status}</span>
                                                                        )}
                                                                    </div>
                                                                    {item.genres && (
                                                                        <div className="text-xs text-[#777] mt-1 line-clamp-1">
                                                                            {item.genres.join(', ')}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        </Combobox.Option>
                                                    ))
                                                    :
                                                    (query !== '' &&
                                                        <div className="flex flex-col items-center justify-center py-8 gap-2 text-[#999]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <p>No results found</p>
                                                            <p className="text-xs">Try different keywords or check spelling</p>
                                                        </div>
                                                    )}
                                                {data && nextPage && (
                                                    <Link href={`/anime/catalog?search=${encodeURIComponent(query)}`}>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                useSearchbar.setState({ Isopen: false });
                                                                setQuery("");
                                                            }}
                                                            className="flex w-full items-center justify-center gap-2 py-4 transition duration-300 ease-in-out cursor-pointer border-t border-[#333] bg-gradient-to-r from-[#ff9650] to-[#14294d] text-white font-medium text-base z-[5] hover:brightness-110">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                            View All Results
                                                        </button>
                                                    </Link>
                                                )}
                                            </Fragment>
                                        ) : (
                                            query !== "" &&
                                            <div className="flex items-center justify-center py-4">
                                                Loading...
                                            </div>
                                        )}
                                    </Combobox.Options>
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Search;
