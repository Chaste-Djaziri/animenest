"use client"
import React, { useEffect, useState } from 'react'
import { getSources } from '@/lib/getData';
import PlayerEpisodeList from './PlayerEpisodeList';
import VidstackPlayer from './VidstackPlayer/player';
import ArtPlayer from './ArtPlayer';
import { Spinner } from '@vidstack/react';
import { toast } from 'sonner';
import { useTitle, useNowPlaying, useDataInfo, useSettings } from '../../lib/store';
import { useStore } from "zustand";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import EnhancedEpisodeList from './EnhancedEpisodeList';

function PlayerComponent({ id, epId, provider, epNum, subdub, data, session, savedep }) {
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const settings = useStore(useSettings, (state) => state.settings);
    const [episodeData, setepisodeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [groupedEp, setGroupedEp] = useState(null);
    const [src, setSrc] = useState(null);
    const [subtitles, setSubtitles] = useState(null);
    const [thumbnails, setThumbnails] = useState(null);
    const [skiptimes, setSkipTimes] = useState(null);
    const [error, setError] = useState(false);
    const [playerType, setPlayerType] = useState(settings.preferredPlayer || 'vidstack'); // 'vidstack' or 'artplayer'

    useEffect(() => {
        // Update player type if settings change
        setPlayerType(settings.preferredPlayer || 'vidstack');
    }, [settings.preferredPlayer]);

    const togglePlayer = () => {
        const newPlayerType = playerType === 'vidstack' ? 'artplayer' : 'vidstack';
        setPlayerType(newPlayerType);
        
        // Update settings
        useSettings.setState({ 
            settings: { 
                ...useSettings.getState().settings, 
                preferredPlayer: newPlayerType 
            } 
        });
        
        toast.success(`Switched to ${newPlayerType === 'vidstack' ? 'Vidstack' : 'ArtPlayer'} player`);
    };

    useEffect(() => {
        useDataInfo.setState({ dataInfo: data });
        const fetchSources = async () => {
            setError(false);
            setLoading(true);
            try {
                console.log(`Fetching sources with subdub=${subdub}`);
                const response = await getSources(id, provider, epId, epNum, subdub);

                if (!response?.sources?.length > 0) {
                    toast.error("Failed to load episode. Please try again later.");
                    setError(true);
                    setLoading(false);
                    return;
                }

                const sources = response?.sources?.find(i => i.quality === "default" || i.quality === "auto")?.url || response?.sources?.find(i => i.quality === "1080p")?.url || response?.sources?.find(i => i.type === "hls")?.url;
                console.log(`Found source URL for ${subdub} episode`);
                setSrc(sources);
                const download = response?.download;

                let subtitlesArray = response.tracks || response.subtitles;
                const reFormSubtitles = subtitlesArray?.map((i) => ({
                    src: i?.file || i?.url,
                    label: i?.label || i?.lang,
                    kind: i?.kind || (i?.lang === "Thumbnails" ? "thumbnails" : "subtitles"),
                    default: i?.default || (i?.lang === "English"),
                }));
                

                setSubtitles(reFormSubtitles?.filter((s) => s.kind !== 'thumbnails'));
                setThumbnails(reFormSubtitles?.filter((s) => s.kind === 'thumbnails'));

                const skipResponse = await fetch(
                    `https://api.aniskip.com/v2/skip-times/${data?.idMal}/${parseInt(epNum)}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`
                );

                const skipData = await skipResponse.json();
                const op = skipData?.results?.find((item) => item.skipType === 'op') || null;
                const ed = skipData?.results?.find((item) => item.skipType === 'ed') || null;
                const episodeLength = skipData?.results?.find((item) => item.episodeLength)?.episodeLength || 0;

                const skiptime = [];

                if (op?.interval) {
                    skiptime.push({
                        startTime: op.interval.startTime ?? 0,
                        endTime: op.interval.endTime ?? 0,
                        text: 'Opening',
                    });
                }
                if (ed?.interval) {
                    skiptime.push({
                        startTime: ed.interval.startTime ?? 0,
                        endTime: ed.interval.endTime ?? 0,
                        text: 'Ending',
                    });
                } else {
                    skiptime.push({
                        startTime: op?.interval?.endTime ?? 0,
                        endTime: episodeLength,
                        text: '',
                    });
                }

                const episode = {
                    download: download || null,
                    skiptimes: skiptime || [],
                    epId: epId || null,
                    provider: provider || null,
                    epNum: epNum || null,
                    subtype: subdub || null,
                };

                useNowPlaying.setState({ nowPlaying: episode });
                setSkipTimes(skiptime);
                // console.log(skipData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Failed to load episode. Please try again later.");
                const episode = {
                    download: null,
                    skiptimes: [],
                    epId: epId || null,
                    provider: provider || null,
                    epNum: epNum || null,
                    subtype: subdub || null,
                };

                useNowPlaying.setState({ nowPlaying: episode });
                setLoading(false);
            }
        };
        fetchSources();
    }, [id, provider, epId, epNum, subdub]);

    useEffect(() => {
        if (episodeData) {
            const previousep = episodeData?.find(
                (i) => i.number === parseInt(epNum) - 1
            );
            const nextep = episodeData?.find(
                (i) => i.number === parseInt(epNum) + 1
            );
            const currentep = episodeData?.find(
                (i) => i.number === parseInt(epNum)
            );
            const epdata = {
                previousep,
                currentep,
                nextep,
            }
            setGroupedEp(epdata);
        }
    }, [episodeData, epId, provider, epNum, subdub]);

    return (
        <div className='xl:w-[99%] max-w-[1800px] mx-auto'>
            <div className='mb-8'>
                <div className='mb-4 relative'>
                    {!loading && !error ? (
                        <div className='h-full w-full aspect-video overflow-hidden rounded-md shadow-lg relative'>
                            {playerType === 'vidstack' ? (
                                <VidstackPlayer dataInfo={data} id={id} groupedEp={groupedEp} session={session} savedep={savedep} src={src} subtitles={subtitles} thumbnails={thumbnails} skiptimes={skiptimes} />
                            ) : (
                                <ArtPlayer dataInfo={data} id={id} groupedEp={groupedEp} session={session} savedep={savedep} src={src} subtitles={subtitles} thumbnails={thumbnails} skiptimes={skiptimes} />
                            )}
                            <button 
                                onClick={togglePlayer} 
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-50 transition-all"
                                title={`Switch to ${playerType === 'vidstack' ? 'ArtPlayer' : 'Vidstack'}`}
                            >
                                <FontAwesomeIcon icon={faExchangeAlt} className="text-sm" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-full w-full rounded-md relative flex items-center text-xl justify-center aspect-video border border-solid border-[#333] bg-[#141414] shadow-lg">
                            {!loading && error ? (
                                <div className='text-sm sm:text-base px-2 flex flex-col items-center text-center'>
                                    <FontAwesomeIcon icon={faCircleExclamation} className="text-[#ff9650] text-4xl mb-4" />
                                    <p className='mb-3 text-xl font-medium'>Failed to load episode</p>
                                    <p className='text-[#999] mb-2'>Please try again later or choose a different server.</p>
                                    <p className='text-[#999] text-sm'>If the problem persists, consider changing servers.</p>
                                </div>) : (
                                <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center">
                                    <Spinner.Root className="text-[#ff9650] animate-spin opacity-100" size={84}>
                                        <Spinner.Track className="opacity-25" width={8} />
                                        <Spinner.TrackFill className="opacity-75" width={8} />
                                    </Spinner.Root>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='mt-4 mb-2 mx-2 sm:mx-1 px-1 lg:px-0'>
                    <h1 className='text-2xl md:text-3xl font-medium mb-1'>{data?.title?.[animetitle] || data?.title?.romaji}</h1>
                    <h2 className='text-lg text-[#999] font-medium'>{`Episode ${epNum}`}</h2>
                </div>
            </div>
            <div className='w-[98%] mx-auto lg:w-full' style={{ backgroundColor: '#000000' }}>
                <EnhancedEpisodeList id={id} data={data} setwatchepdata={setepisodeData} onprovider={provider} epnum={epNum} />
            </div>
        </div>
    )
}

export default PlayerComponent
