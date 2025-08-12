"use client"
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import { useRouter } from "next/navigation";
import VideoProgressSave from '@/utils/VideoProgressSave';
import { updateEp } from "@/lib/EpHistoryfunctions";
import { saveProgress } from "@/lib/AnilistUser";
import { useSettings, useTitle, useNowPlaying } from '@/lib/store';
import { useStore } from "zustand";
import { toast } from 'sonner';
import "./ArtPlayer.css";

const KEY_CODES = {
  M: "m",
  I: "i",
  F: "f",
  V: "v",
  SPACE: " ",
  ARROW_UP: "arrowup",
  ARROW_DOWN: "arrowdown",
  ARROW_RIGHT: "arrowright",
  ARROW_LEFT: "arrowleft",
};

Artplayer.LOG_VERSION = false;
Artplayer.CONTEXTMENU = false;

function Player({ dataInfo, id, groupedEp, src, session, savedep, subtitles, thumbnails, skiptimes }) {
  const settings = useStore(useSettings, (state) => state.settings);
  const animetitle = useStore(useTitle, (state) => state.animetitle);
  const nowPlaying = useStore(useNowPlaying, (state) => state.nowPlaying);
  const { epId, provider, epNum, subtype } = nowPlaying;
  const { previousep, currentep, nextep } = groupedEp || {};
  const [getVideoProgress, UpdateVideoProgress] = VideoProgressSave();
  const router = useRouter();
  const artRef = useRef(null);
  const [art, setArt] = useState(null);
  const [progressSaved, setProgressSaved] = useState(false);
  let interval;

  // Prepare clean source URL for player
  const cleanSrc = typeof src === 'string' ? src.replace('https://cors-anywhere-livid-six.vercel.app/', '')
                                                .replace('https://m3u8-proxy.xdsystemspotify.workers.dev/?url=', '')
                                                .replace('https://newproxy-chi.vercel.app/m3u8-proxy?url=', '')
                                           : src;

  const createChapters = () => {
    const chapters = [];
    if (skiptimes && skiptimes.length > 0) {
      const opSkip = skiptimes.find(skip => skip.text === "Opening");
      const edSkip = skiptimes.find(skip => skip.text === "Ending");
      
      if (opSkip) {
        chapters.push({ 
          start: opSkip.startTime, 
          end: opSkip.endTime, 
          title: "intro" 
        });
      }
      
      if (edSkip) {
        chapters.push({ 
          start: edSkip.startTime, 
          end: edSkip.endTime, 
          title: "outro" 
        });
      }
    }
    return chapters;
  };

  const handleKeydown = (event) => {
    if (!art) return;
    
    const tagName = event.target.tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea") return;

    switch (event.key.toLowerCase()) {
      case KEY_CODES.M:
        art.muted = !art.muted;
        break;
      case KEY_CODES.I:
        art.pip = !art.pip;
        break;
      case KEY_CODES.F:
        event.preventDefault();
        event.stopPropagation();
        art.fullscreen = !art.fullscreen;
        break;
      case KEY_CODES.V:
        event.preventDefault();
        event.stopPropagation();
        art.subtitle.show = !art.subtitle.show;
        break;
      case KEY_CODES.SPACE:
        event.preventDefault();
        event.stopPropagation();
        art.playing ? art.pause() : art.play();
        break;
      case KEY_CODES.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        art.volume = Math.min(art.volume + 0.1, 1);
        break;
      case KEY_CODES.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        art.volume = Math.max(art.volume - 0.1, 0);
        break;
      case KEY_CODES.ARROW_RIGHT:
        event.preventDefault();
        event.stopPropagation();
        art.currentTime = Math.min(art.currentTime + 10, art.duration);
        break;
      case KEY_CODES.ARROW_LEFT:
        event.preventDefault();
        event.stopPropagation();
        art.currentTime = Math.max(art.currentTime - 10, 0);
        break;
      default:
        break;
    }
  };

  const playM3u8 = (video, url, art) => {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;

      art.on("destroy", () => hls.destroy());

      video.addEventListener("timeupdate", () => {
        const currentTime = Math.round(video.currentTime);
        const duration = Math.round(video.duration);
        
        // Auto skip intro/outro if enabled
        if (settings?.autoskip && skiptimes && skiptimes.length > 0) {
          const opSkip = skiptimes.find(skip => skip.text === "Opening");
          const edSkip = skiptimes.find(skip => skip.text === "Ending");
          
          if (opSkip && currentTime > opSkip.startTime && currentTime < opSkip.endTime) {
            art.currentTime = opSkip.endTime;
          }
          
          if (edSkip && currentTime > edSkip.startTime && currentTime < edSkip.endTime) {
            art.currentTime = edSkip.endTime;
          }
        }
        
        // Auto next episode
        if (duration > 0) {
          if (currentTime >= duration - 1) {
            art.pause();
            if (nextep?.id && settings?.autonext) {
              router.push(
                `/anime/watch?id=${dataInfo?.id}&host=${provider}&epid=${nextep?.id || nextep?.episodeId}&ep=${nextep?.number}&type=${subtype}`
              );
            }
          }
          
          // Show next episode button
          const timeToShowButton = duration - 8;
          if (duration !== 0 && (currentTime > timeToShowButton && nextep?.id)) {
            const nextButton = document.querySelector(".art-next-button");
            if (nextButton) nextButton.style.display = "flex";
          }
        }
        
        // Save progress to Anilist
        const percentage = currentTime / duration;
        if (session && !progressSaved && percentage >= 0.9) {
          try {
            setProgressSaved(true);
            saveProgress(session.user.token, dataInfo?.id || id, Number(epNum) || Number(currentep?.number));
          } catch (error) {
            console.error("Error saving progress:", error);
            toast.error("Error saving progress due to high traffic.");
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      // Same event listener for native HLS support
      video.addEventListener("timeupdate", () => {
        // Same logic as above
      });
    } else {
      console.log("Unsupported playback format: m3u8");
    }
  };

  useEffect(() => {
    if (!cleanSrc || !artRef.current) return;
    
    const iframeUrl = null; // Add streaming source info if needed
    const headers = { Referer: "https://megacloud.club/" };
    
    const options = {
      container: artRef.current,
      url: cleanSrc,
      type: "m3u8",
      title: currentep?.title || `EP ${epNum}` || 'Loading...',
      poster: dataInfo?.coverImage?.extraLarge || dataInfo?.bannerImage || '',
      volume: 1,
      autoplay: settings?.autoplay || false,
      muted: settings?.audio || false,
      pip: true,
      autoSize: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: false,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: '#ff9650',
      lang: 'en',
      moreVideoAttr: {
        crossOrigin: 'anonymous',
      },
      customType: {
        m3u8: playM3u8,
      },
    };
    
    const player = new Artplayer(options);
    setArt(player);
    
    // Set up subtitle tracks
    if (subtitles && subtitles.length > 0) {
      const defaultSubtitle = subtitles.find(
        (sub) => sub.label.toLowerCase() === "english" && sub.default
      ) || subtitles.find((sub) => sub.label.toLowerCase() === "english");
      
      if (defaultSubtitle) {
        player.subtitle.switch(defaultSubtitle.src, {
          name: defaultSubtitle.label,
        });
      }
      
      // Add subtitle options
      player.setting.add({
        name: 'Subtitles',
        selector: [
          {
            html: 'Display',
            switch: true,
            onSwitch: function (item) {
              player.subtitle.show = !item.switch;
              return !item.switch;
            },
          },
          ...subtitles.map((sub) => ({
            default: sub.label.toLowerCase() === "english" && sub === defaultSubtitle,
            html: sub.label,
            url: sub.src,
          })),
        ],
        onSelect: function (item) {
          player.subtitle.switch(item.url, { name: item.html });
          return item.html;
        },
      });
    }
    
    // Add skip buttons for intro/outro
    if (skiptimes && skiptimes.length > 0) {
      const opSkip = skiptimes.find(skip => skip.text === "Opening");
      const edSkip = skiptimes.find(skip => skip.text === "Ending");
      
      player.on('video:timeupdate', () => {
        const currentTime = player.currentTime;
        
        if (opSkip && currentTime > opSkip.startTime && currentTime < opSkip.endTime) {
          const skipIntroButton = document.querySelector('.art-skip-intro');
          if (!skipIntroButton) {
            const button = document.createElement('div');
            button.className = 'art-skip-intro';
            button.textContent = 'Skip Opening';
            button.onclick = () => {
              player.seek = opSkip.endTime;
            };
            player.template.$player.appendChild(button);
          }
        } else {
          const skipIntroButton = document.querySelector('.art-skip-intro');
          if (skipIntroButton) skipIntroButton.remove();
        }
        
        if (edSkip && currentTime > edSkip.startTime && currentTime < edSkip.endTime) {
          const skipOutroButton = document.querySelector('.art-skip-outro');
          if (!skipOutroButton) {
            const button = document.createElement('div');
            button.className = 'art-skip-outro';
            button.textContent = 'Skip Ending';
            button.onclick = () => {
              player.seek = edSkip.endTime;
            };
            player.template.$player.appendChild(button);
          }
        } else {
          const skipOutroButton = document.querySelector('.art-skip-outro');
          if (skipOutroButton) skipOutroButton.remove();
        }
      });
    }
    
    // Add next episode button
    if (nextep?.id) {
      const nextButton = document.createElement('div');
      nextButton.className = 'art-next-button';
      nextButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
        <span>Next Episode</span>
      `;
      nextButton.style.display = 'none';
      nextButton.onclick = () => {
        router.push(
          `/anime/watch?id=${dataInfo?.id}&host=${provider}&epid=${nextep?.id || nextep?.episodeId}&ep=${nextep?.number}&type=${subtype}`
        );
      };
      player.template.$player.appendChild(nextButton);
    }
    
    // Load saved progress
    player.on('ready', () => {
      if (savedep && savedep[0]) {
        const seekTime = savedep[0]?.timeWatched;
        if (seekTime) {
          player.seek = seekTime - 3;
        }
      } else {
        const seek = getVideoProgress(dataInfo?.id);
        if (seek?.epNum === Number(epNum)) {
          const seekTime = seek?.timeWatched;
          const percentage = player.duration !== 0 ? seekTime / Math.round(player.duration) : 0;

          if (percentage >= 0.95) {
            player.seek = 0;
          } else {
            player.seek = seekTime - 3;
          }
        }
      }
    });
    
    // Set up progress saving
    player.on('play', () => {
      interval = setInterval(async () => {
        const currentTime = Math.round(player.currentTime);
        const duration = Math.round(player.duration);

        await updateEp({
          userName: session?.user?.name,
          aniId: String(dataInfo?.id) || String(id),
          aniTitle: dataInfo?.title?.[animetitle] || dataInfo?.title?.romaji,
          epTitle: currentep?.title || `EP ${epNum}`,
          image: currentep?.img || currentep?.image ||
            dataInfo?.bannerImage || dataInfo?.coverImage?.extraLarge || '',
          epId: epId,
          epNum: Number(epNum) || Number(currentep?.number),
          timeWatched: currentTime,
          duration: duration,
          provider: provider,
          nextepId: nextep?.id || null,
          nextepNum: nextep?.number || null,
          subtype: subtype
        });

        UpdateVideoProgress(dataInfo?.id || id, {
          aniId: String(dataInfo?.id) || String(id),
          aniTitle: dataInfo?.title?.[animetitle] || dataInfo?.title?.romaji,
          epTitle: currentep?.title || `EP ${epNum}`,
          image: currentep?.img || currentep?.image ||
            dataInfo?.bannerImage || dataInfo?.coverImage?.extraLarge || '',
          epId: epId,
          epNum: Number(epNum) || Number(currentep?.number),
          timeWatched: currentTime,
          duration: duration,
          provider: provider,
          nextepId: nextep?.id || nextep?.episodeId || null,
          nextepNum: nextep?.number || null,
          subtype: subtype,
          createdAt: new Date().toISOString(),
        });
      }, 5000);
    });
    
    player.on('pause', () => {
      clearInterval(interval);
    });
    
    // Add keyboard shortcuts
    document.addEventListener("keydown", handleKeydown);
    
    return () => {
      if (player && player.destroy) {
        player.destroy(false);
      }
      document.removeEventListener("keydown", handleKeydown);
      clearInterval(interval);
    };
  }, [cleanSrc, subtitles, skiptimes]);

  return <div ref={artRef} className="art-player-container"></div>;
}

export default Player; 
