"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";

const newVersion = "V2.1.0"

const releaseLogs = [
    {
        version: "V2.1.0",
        changes: [
            "ANINEST with a refreshed user interface",
            "Improved episode listing with new display modes",
            "Better support for anime with large episode counts (20,000+)",
            "Enhanced mobile experience",
            "Dark mode improvements for better viewing experience",
            "Various bug fixes and performance enhancements"
        ],
    },
    {
        version: "V2.1.0",
        changes: [
            "Many anime now has Gogoanime, Zoro is also fixed.",
            "Now Episode details will be available for more anime.",
            "Newly added filler tag - Currently on Zoro Provider.",
            "Now u can find Uncensored Versions of anime.",
            "Major Performance Improvement.",
            "I guess Recent Episodes is fixed.",
            "Follow us on Instagram for more information",
        ],
    },
];

export default function Changelogs() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [open, setopen] = useState(false);

    function closeModal() {
        localStorage.setItem("version", newVersion);
        setopen(false);
    }

    function getVersion() {
        let version = localStorage.getItem("version");
        if (version !== newVersion) {
            setopen(true);
        }
    }

    useEffect(() => {
        getVersion();
    }, []);

    return (
        <>
            <Modal isOpen={open} onOpenChange={closeModal} backdrop="opaque" hideCloseButton={true} placement="center">
                <ModalContent className="py-4">
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center gap-2">
                                        <p className="text-lg sm:text-xl">ANINEST Updates</p>
                                        <div className="flex gap-3 items-center">
                                            {/* Instagram Icon */}
                                            <Link
                                                href="https://instagram.com/its.dark.devil"
                                                target="_blank"
                                                className="w-5 h-5 hover:opacity-75"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#fff"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                            </Link>
                                            {/* Discord Icon */}
                                            <Link
                                                href="https://discord.gg/aR6mmjfZVK"
                                                target="_blank"
                                                className="w-6 h-6 hover:opacity-75"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    preserveAspectRatio="xMidYMid"
                                                    viewBox="0 -28.5 256 256"
                                                >
                                                    <path
                                                        fill="#fff"
                                                        d="M216.856 16.597A208.502 208.502 0 00164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 00-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0079.735 175.3a136.413 136.413 0 01-21.846-10.632 108.636 108.636 0 005.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 005.355 4.237 136.07 136.07 0 01-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36zM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18z"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-400">
                                            You've just entered the realm of updates, where every change brings us closer to anime perfection! 🌠

🛠️ From bug vanishing jutsus to UI power-ups, this is your gateway to all the newest upgrades, features, and improvements powering your ANINEST experience! 💫

Stay tuned, and may your watchlist always be full! 🍿🎥
                                        </p>
                                    </div>
                                    <div className="my-3 flex items-center justify-evenly flex-col">
                                        <p className="whitespace-nowrap font-medium mx-2 font-inter">
                                            Version - {newVersion}
                                        </p>
                                        <div className="mt-1 w-full h-[1px] bg-white/10" />
                                    </div>
                                    {releaseLogs.map((log) => (
                                        <div key={log.version}>
                                            {log.changes.map((i, index) => (
                                                <p className="text-sm my-1" key={index}>- {i}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#ff9650] rounded-lg" onPress={onClose}>
                                Dismiss
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
