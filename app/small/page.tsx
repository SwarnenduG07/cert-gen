'use client';

import { useEffect, useState } from 'react';

export default function SmallDevicePage() {
    const [orientation, setOrientation] = useState<string>('portrait');

    useEffect(() => {
        const checkOrientation = () => {
            setOrientation(
                window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
            );
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#080510] text-white relative overflow-hidden">
            <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-indigo-600/10 to-fuchsia-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/mesh-grid.png')] bg-center opacity-10 pointer-events-none" />

            <div className="relative backdrop-blur-md bg-gradient-to-b from-[#14141f]/80 to-[#0e0e16]/80 border border-white/10 rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl opacity-50 blur-xl animate-pulse-slow pointer-events-none" />

                <div className="relative">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
                            <div className="relative bg-gradient-to-r from-indigo-600/20 to-violet-600/20 p-4 rounded-full border border-white/10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-14 w-14 text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 text-center bg-clip-text text-white">
                        Desktop Required
                    </h1>

                    <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-4 mb-6 text-sm text-gray-300 leading-relaxed">
                        <p className="mb-2">
                            Our Certificate Generator requires a larger screen for the best experience.
                        </p>
                        <p>Please access this application from a desktop computer or laptop.</p>
                    </div>

                    {orientation === 'landscape' && (
                        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 mb-6 text-sm text-blue-300">
                            <div className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p>
                                    You are in landscape mode. While your screen is wider now, the certificate designer still works best on desktop-sized screens.
                                </p>
                            </div>
                        </div>
                    )}

                    <p className="mt-6 text-xs text-gray-500">
                        Current screen size is too small for optimal certificate design.
                        <span className="block mt-1 text-gray-400">
                            Minimum recommended width: 768px
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
