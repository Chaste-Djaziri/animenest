"use client"
import React, { useEffect, useState } from 'react';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection, Avatar, Badge, useDisclosure, Button } from "@nextui-org/react";
import Link from "next/link"
import styles from '../../styles/Navbar.module.css'
import { useSession, signIn, signOut } from 'next-auth/react';
import { FeedbackIcon, LoginIcon, LogoutIcon, SettingsIcon, ProfileIcon, NotificationIcon } from '@/lib/SvgIcons';
import { Usernotifications } from '@/lib/AnilistUser';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Feedbackform from './Feedbackform';
import { NotificationTime } from '@/utils/TimeFunctions';
import { useTitle, useSearchbar } from '@/lib/store';
import { useStore } from 'zustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbarcomponent({ home = false }) {
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const Isopen = useStore(useSearchbar, (state) => state.Isopen);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const iconClasses = "w-5 h-5 text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data, status } = useSession();
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const [notifications, setNotifications] = useState([]);
    const [todayNotifications, setTodayNotifications] = useState([]);
    const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleTimeframeChange = (e) => {
        setSelectedTimeframe(e.target.value);
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        }
        else {
            setHidden(false);
            setIsScrolled(false);
        }
        if (latest > 50) {
            setIsScrolled(true)
        }
    })

    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [status])

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (status === 'authenticated' && data?.user?.token) {
                    const response = await Usernotifications(data.user.token, 1);
                    const notify = response?.notifications?.filter(item => Object.keys(item).length > 0);
                    setNotifications(notify);
                    const filteredNotifications = filterNotifications(notify);
                    setTodayNotifications(filteredNotifications);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        }
        fetchNotifications();
    }, [status, data]);

    function filterNotifications(notifications) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const oneDayInSeconds = 24 * 60 * 60;
        return notifications.filter(notification => {
            const createdAtTimestamp = notification.createdAt;
            const timeDifference = currentTimestamp - createdAtTimestamp;
            return timeDifference <= oneDayInSeconds;
        });
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'KeyS' && e.ctrlKey) {
                e.preventDefault();
                useSearchbar.setState({ Isopen: !useSearchbar.getState().Isopen });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [Isopen]);

    const navbarClass = isScrolled
        ? `${home ? styles.homenavbar : styles.navbar} ${home && styles.navbarscroll}`
        : home ? styles.homenavbar : styles.navbar;

    return (
        <motion.nav className={navbarClass}
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className={styles.navleft}>
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logoLink}>
                        <span className={styles.logoText}>ANI<span className={styles.logoHighlight}>NEST</span></span>
                    </Link>
                </div>
                {/* Desktop Navigation */}
                <div className={styles.navItemsContainer}>
                    <Link href="/anime/catalog" className={styles.navItem}>Browse</Link>
                    <Link href="/anime/catalog?sortby=TRENDING_DESC" className={styles.navItem}>Trending</Link>
                    <Link href="/anime/catalog?format=MOVIE" className={styles.navItem}>Movies</Link>
                    <Link href="/anime/catalog?format=TV" className={styles.navItem}>TV Shows</Link>
                    <Link href="/news" className={styles.navItem}>News</Link>
                    <Link href="/images" className={styles.navItem}>Images</Link>
                    <Link href="/about" className={styles.navItem}>About</Link>
                </div>

            </div>
            <div className={styles.navright}>
                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuButton}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
                </button>
                
                <button
                    type="button"
                    title="Search"
                    onClick={() => useSearchbar.setState({ Isopen: true }) } 
                    className={styles.searchButton}
                >
                    <FontAwesomeIcon icon={faSearch} className={styles.navIcon} />
                </button>
                <div>
                    {isLoggedIn && (
                        <Dropdown placement="bottom-end" classNames={{
                            base: "before:bg-default-200",
                            content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-[#111] to-[#222] dark:from-[#111] dark:to-black",
                        }}>
                            <DropdownTrigger>
                                <div className={styles.notificationButton}>
                                    <Badge 
                                        style={{ backgroundColor: "#ff9650" }} 
                                        content={todayNotifications?.length} 
                                        shape="circle" 
                                        showOutline={false} 
                                        size="sm"
                                    >
                                        <FontAwesomeIcon icon={faBell} className={styles.navIcon} />
                                    </Badge>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu variant="flat" className='w-[320px] '
                                aria-label="Avatar Actions"
                                emptyContent="No New Notifications"
                            >
                                <DropdownSection title="Notifications">
                                    <DropdownItem
                                        isReadOnly
                                        classNames={{
                                            base: 'py-0 !hover:bg-none'
                                        }}
                                        key="theme"
                                        className="cursor-default"
                                        endContent={
                                            <select
                                                className="z-10 outline-none cursor-pointer w-[72px] py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                                                id="theme"
                                                name="theme"
                                                value={selectedTimeframe}
                                                onChange={handleTimeframeChange}
                                            >
                                                <option>Today</option>
                                                <option>Recent</option>
                                            </select>
                                            // <div className='flex flex-row gap-3'>
                                            //     <button className='bg-[#18181b] px-3 py-1'>Today</button>
                                            //     <button>Recent</button>
                                            // </div>
                                        }
                                    >
                                        Select Timeframe
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection className='w-full'>
                                    {selectedTimeframe === 'Today' ? (
                                        todayNotifications?.length > 0 ? todayNotifications?.slice(0, 3).map((item) => {
                                            const { contexts, media, episode, createdAt } = item;
                                            return (
                                                <DropdownItem
                                                    key={item.id}
                                                    showFullDescription
                                                    description={`${contexts?.[0]} ${episode} ${contexts?.[1]} ${media?.title?.[animetitle] || media?.title?.romaji} ${contexts?.[contexts?.length - 1]}`}
                                                    className='py-2 w-full'
                                                    classNames={{
                                                        description: 'text-[11px] text-[#FF9650]',
                                                    }}
                                                >
                                                    <div className='flex flex-row items-center justify-between w-[290px]'>
                                                        <p className='font-semibold text-[14px] w-full'>
                                                            {((media?.title?.[animetitle] || media?.title?.romaji) || '').slice(0, 24)}
                                                            {((media?.title?.[animetitle] || media?.title?.romaji) || '').length > 24 && '...'}
                                                        </p>
                                                        <span className='text-[#FF9650] text-[10px]'>{NotificationTime(createdAt)}</span>
                                                    </div>
                                                </DropdownItem>
                                            );
                                        }) : (
                                            <DropdownItem
                                                key={"Lol"}
                                                showFullDescription
                                                className='py-3 w-full text-center'
                                            >
                                                No New Notifications
                                            </DropdownItem>
                                        )
                                    ) : (
                                        notifications?.length > 0 ? notifications?.slice(0, 3).map((item) => {
                                            const { contexts, media, episode, createdAt } = item;
                                            return (
                                                <DropdownItem
                                                    key={item.id}
                                                    showFullDescription
                                                    description={`${contexts?.[0]} ${episode} ${contexts?.[1]} ${media?.title?.[animetitle] || media?.title?.romaji} ${contexts?.[contexts?.length - 1]}`}
                                                    className='py-2 w-full'
                                                    classNames={{
                                                        description: 'text-[11px] text-[#FF9650]',
                                                    }}
                                                >
                                                    <div className='flex flex-row items-center justify-between w-[290px]'>
                                                        <p className='font-semibold text-[14px] w-full'>
                                                            {((media?.title?.[animetitle] || media?.title?.romaji) || '').slice(0, 24)}
                                                            {((media?.title?.[animetitle] || media?.title?.romaji) || '').length > 24 && '...'}
                                                        </p>
                                                        <span className='text-[#FF9650] text-[10px]'>{NotificationTime(createdAt)}</span>
                                                    </div>
                                                </DropdownItem>
                                            );
                                        }) : (
                                            <DropdownItem
                                                key={"Lol"}
                                                showFullDescription
                                                className='py-3 w-full text-center'
                                            >
                                                No Notifications!
                                            </DropdownItem>
                                        )
                                    )}
                                    {selectedTimeframe === 'Today' && todayNotifications?.length > 0 &&
                                        <DropdownItem
                                            key={"delete"}
                                            showFullDescription
                                            className='py-2 w-full text-xl text-default-500 flex-shrink-0'
                                            style={{ color: "#ff9650" }}
                                        >
                                            <Link href={`/user/notifications`} className='w-full h-full block '>Show all</Link>
                                        </DropdownItem>
                                    }
                                    {selectedTimeframe !== 'Today' && notifications?.length > 0 &&
                                        <DropdownItem
                                            key={"delete"}
                                            showFullDescription
                                            className='py-2 w-full text-xl text-default-500 flex-shrink-0'
                                            style={{ color: "#ff9650" }}
                                        >
                                            <Link href={`/user/notifications`} className='w-full h-full block '>Show all</Link>
                                        </DropdownItem>
                                    }
                                </DropdownSection>

                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
                <Dropdown placement="bottom-end" classNames={{
                    base: "before:bg-default-200",
                    content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-[#111] to-[#222] dark:from-[#111] dark:to-black",
                }}>
                    <DropdownTrigger>
                        <div className={styles.profileTrigger}>
                            <Avatar
                                isBordered
                                isDisabled={status === 'loading'}
                                as="button"
                                className="transition-transform w-[32px] h-[32px] backdrop-blur-sm"
                                color="warning"
                                style={{ borderColor: "#ff9650" }}
                                name={data?.user?.name}
                                size="sm"
                                src={data?.user?.image?.large || data?.user?.image?.medium || "/profile.png"}
                            />
                            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
                        </div>
                    </DropdownTrigger>
                    {isLoggedIn ? (
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="info" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{data?.user?.name}</p>
                            </DropdownItem>
                            <DropdownItem key="profile" startContent={<ProfileIcon className={iconClasses} />}>
                            <Link href={`/user/profile`} className='w-full h-full block '>Profile</Link>
                                </DropdownItem>
                            <DropdownItem key="help_and_feedback" onPress={onOpen} startContent={<FeedbackIcon className={iconClasses} />}>Help & Feedback</DropdownItem>
                            <DropdownItem key="settings" startContent={<SettingsIcon className={iconClasses} />}>
                                <Link href={`/settings`} className='w-full h-full block '>Settings</Link>
                            </DropdownItem>
                            <DropdownItem key="logout" style={{ color: "#ff9650" }} startContent={<LogoutIcon className={iconClasses} />}>
                                <button className="font-semibold outline-none border-none w-full h-full block text-left" onClick={() => signOut('AniListProvider')}>Log Out</button>
                            </DropdownItem>
                        </DropdownMenu>
                    ) : (
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="notlogprofile" startContent={<LoginIcon className={iconClasses} />}>
                                <button className="font-semibold outline-none border-none w-full h-full block text-left" onClick={() => signIn('AniListProvider')}>Login With Anilist</button>
                            </DropdownItem>
                            <DropdownItem key="notloghelp_and_feedback" onPress={onOpen} startContent={<FeedbackIcon className={iconClasses} />}>Help & Feedback</DropdownItem>
                            <DropdownItem key="settings" startContent={<SettingsIcon className={iconClasses} />}>
                                <Link href={`/settings`} className='w-full h-full block '>Settings</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    )}
                </Dropdown>
                <Feedbackform isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
            </div>
            
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenuOverlay}>
                    <div className={styles.mobileMenuContent}>
                        <Link href="/anime/catalog" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>Browse</Link>
                        <Link href="/anime/catalog?sortby=TRENDING_DESC" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>Trending</Link>
                        <Link href="/anime/catalog?format=MOVIE" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>Movies</Link>
                        <Link href="/anime/catalog?format=TV" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>TV Shows</Link>
                        <Link href="/news" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>News</Link>
                        <Link href="/images" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>Images</Link>
                        <Link href="/about" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/settings" className={styles.mobileNavItem} onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                        {isLoggedIn ? (
                            <button 
                                className={styles.mobileNavButton}
                                onClick={() => {
                                    signOut('AniListProvider');
                                    setMobileMenuOpen(false);
                                }}
                            >
                                Log Out
                            </button>
                        ) : (
                            <button 
                                className={styles.mobileNavButton}
                                onClick={() => {
                                    signIn('AniListProvider');
                                    setMobileMenuOpen(false);
                                }}
                            >
                                Log In
                            </button>
                        )}
                    </div>
                </div>
            )}
        </motion.nav>
    )
}

export default Navbarcomponent
