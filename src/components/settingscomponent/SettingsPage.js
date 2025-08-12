"use client"
import React, { useState, useEffect } from 'react'
import { Switch, cn } from "@nextui-org/react";
import { useSettings } from '../../lib/store';
import { useStore } from "zustand";

const SwitchSetting = ({ value, onValueChange }) => {
    return (
        <Switch
            isSelected={value}
            onValueChange={(newValue) => onValueChange(newValue)}
            classNames={{
                base: cn(
                    "inline-flex flex-row-reverse w-full bg-none hover:bg-none items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 py-4 border-none border-transparent",
                    "data-[selected=true]:border-primary",
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn("w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    "group-data-[selected=true]:ml-6",
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4",
                ),
            }}
        />
    );
};


function SettingsPage() {
    const settings = useStore(useSettings, (state) => state.settings);
    const [loading, setLoading] = useState(false);

    const handlePlayerChange = (player) => {
        useSettings.setState({ 
            settings: { 
                ...useSettings.getState().settings, 
                preferredPlayer: player 
            } 
        });
        localStorage.setItem('preferred-player', player);
    };

    useEffect(() => {
        // Sync localStorage with state if needed
        if (settings.preferredPlayer) {
            localStorage.setItem('preferred-player', settings.preferredPlayer);
        }
    }, [settings.preferredPlayer]);

    return (
        <div className="bg-black min-h-screen pb-10">
            <div className='relative h-[240px] md:h-[340px]'>
                <div className='absolute w-full h-full' style={{ backgroundImage: `url('https://i.pinimg.com/736x/e5/33/d1/e533d1eaaf1480fd821bd1f53e75c936.jpg')`, backgroundPosition: "center", backgroundSize: "cover", height: "100%", opacity: 0.7 }}></div>
                <div className='bg-gradient-to-t from-black from-10% to-black/50 absolute h-[101%] w-full z-[4] bottom-[-1px] inset-0'></div>
                <div className='absolute left-[2%] lg:left-[7%] xl:left-[9.5%] bottom-6 lg:bottom-10 z-[6] text-[35px] font-bold flex flex-row items-center'>
                    <div className="bg-[#ff9650] p-2 rounded-lg shadow-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 hover:animate-spin text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <span className="text-white">Settings</span>
                </div>
            </div>
            <div className='max-w-[94%] md:max-w-[95%] lg:max-w-[85%] xl:max-w-[80%] mx-auto min-h-[58vh] flex flex-col gap-6 mt-5'>
                {loading ? (
                    <div className='items-center flex justify-center text-semibold text-[22px] text-white'>Loading...</div>
                ) : (
                    <>
                      <div className='flex items-center w-[100%] justify-between bg-[#111] p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors duration-200'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium text-white flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9650]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Homepage Trailer
                                </p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>Choose whether to play the trailer on the homepage or not.</p>
                            </div>
                            <SwitchSetting
                                value={settings.herotrailer}
                                onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, herotrailer: value } })}
                            />
                        </div>
                        <div className='flex items-center w-[100%] justify-between bg-[#111] p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors duration-200'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium text-white flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9650]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Anime Details Trailer
                                </p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>Choose whether to play the trailer in anime details page banner or not.</p>
                            </div>
                            <SwitchSetting
                                value={settings.bannertrailer}
                                onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, bannertrailer: value } })}
                            />
                        </div>
                        <div className='flex items-center w-[100%] justify-between bg-[#111] p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors duration-200'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium text-white flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9650]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    AutoSkip
                                </p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>Experience uninterrupted content with our autoskip feature! It automatically skips through intros, outros, so you can enjoy without clicking.</p>
                            </div>
                            <SwitchSetting
                                value={settings.autoskip}
                                onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, autoskip: value } })}
                            />
                        </div>
                        <div className='flex items-center w-[100%] justify-between'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium'>AutoPlay</p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3'>Let the entertainment roll with our autoplay feature! No need to press play—the next video starts automatically, ensuring a seamless viewing experience.</p>
                            </div>
                            <SwitchSetting
                                value={settings.autoplay}
                                onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, autoplay: value } })}
                            />
                        </div>
                        <div className='flex items-center w-[100%] justify-between bg-[#111] p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors duration-200'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium text-white flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9650]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                    Mute Audio
                                </p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>Choose whether to mute the audio or not.</p>
                            </div>
                            <SwitchSetting
                                value={settings.audio}
                                onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, audio: value } })}
                            />
                        </div>
                        
                        <div className='flex flex-col w-[100%] bg-[#111] p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors duration-200'>
                            <p className='text-[18px] md:text-[21px] font-medium text-white flex items-center gap-2 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9650]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Preferred Video Player
                            </p>
                            <div className='flex items-center w-[100%] justify-between mb-5 bg-black/30 p-3 rounded-md'>
                                <div className='mr-4 w-[100%]'>
                                    <p className='text-[15px] md:text-[18px] font-medium text-white flex items-center gap-2'>
                                        <span className="bg-[#ff9650] text-white text-xs font-bold px-2 py-1 rounded-full">1</span>
                                        Vidstack Player
                                    </p>
                                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>
                                        Default video player with modern UI and features.
                                    </p>
                                </div>
                                <SwitchSetting
                                    value={settings.preferredPlayer === 'vidstack'}
                                    onValueChange={(value) => value && handlePlayerChange('vidstack')}
                                />
                            </div>
                            <div className='flex items-center w-[100%] justify-between bg-black/30 p-3 rounded-md'>
                                <div className='mr-4 w-[100%]'>
                                    <p className='text-[15px] md:text-[18px] font-medium text-white flex items-center gap-2'>
                                        <span className="bg-[#ff9650] text-white text-xs font-bold px-2 py-1 rounded-full">2</span>
                                        ArtPlayer
                                    </p>
                                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>
                                        Alternative player with additional customization options.
                                    </p>
                                </div>
                                <SwitchSetting
                                    value={settings.preferredPlayer === 'artplayer'}
                                    onValueChange={(value) => value && handlePlayerChange('artplayer')}
                                />
                            </div>
                        </div>
                        
                        <div className='flex flex-col w-[100%] bg-[#111] p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors duration-200'>
                            <p className='text-[18px] md:text-[21px] font-medium text-white flex items-center gap-2 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9650]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Video Loading Options
                            </p>
                            <div className='flex items-center w-[100%] justify-between mb-5 bg-black/30 p-3 rounded-md'>
                                <div className='mr-4 w-[100%]'>
                                    <p className='text-[15px] md:text-[18px] font-medium text-white flex items-center gap-2'>
                                        <span className="bg-[#ff9650] text-white text-xs font-bold px-2 py-1 rounded-full">1</span>
                                        Idle
                                    </p>
                                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>
                                        Video will be loaded after the page has loaded completely. (Recommended)
                                    </p>
                                </div>
                                <SwitchSetting
                                    value={settings.load === 'idle'}
                                    onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, load: value ? 'idle' : settings.load } })}
                                />
                            </div>
                            <div className='flex items-center w-[100%] justify-between mb-5 bg-black/30 p-3 rounded-md'>
                                <div className='mr-4 w-[100%]'>
                                    <p className='text-[15px] md:text-[18px] font-medium text-white flex items-center gap-2'>
                                        <span className="bg-[#ff9650] text-white text-xs font-bold px-2 py-1 rounded-full">2</span>
                                        Visible
                                    </p>
                                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>
                                        Video will only start loading when it becomes visible on the screen.
                                    </p>
                                </div>
                                <SwitchSetting
                                    value={settings.load === 'visible'}
                                    onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, load: value ? 'visible' : settings.load } })}
                                />
                            </div>
                            <div className='flex items-center w-[100%] justify-between bg-black/30 p-3 rounded-md'>
                                <div className='mr-4 w-[100%]'>
                                    <p className='text-[15px] md:text-[18px] font-medium text-white flex items-center gap-2'>
                                        <span className="bg-[#ff9650] text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
                                        Eager
                                    </p>
                                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3 mt-1'>
                                        Video will be loaded immediately. Consumes more Internet. (Advanced)
                                    </p>
                                </div>
                                <SwitchSetting
                                    value={settings.load === 'eager'}
                                    onValueChange={(value) => useSettings.setState({ settings: { ...useSettings.getState().settings, load: value ? 'eager' : settings.load } })}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SettingsPage
