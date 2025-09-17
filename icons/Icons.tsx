import React from 'react';

export const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PauseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const RestartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.65-4.65l-1.35 1.35A7 7 0 005.4 9.9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 15a9 9 0 01-14.65 4.65l1.35-1.35A7 7 0 0018.6 14.1" />
    </svg>
);

export const CoffeeIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 18h2m-6-8h6m-6 4h6m3 4V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2z" />
    </svg>
);

export const BrainIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2.055a2 2 0 001.888-1.338l1.39-4.172A2 2 0 0012.333 8H12a2 2 0 00-2-2H5a2 2 0 01-2-2v-1a2 2 0 00-2-2H1.055" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.945 11H19a2 2 0 012 2v1a2 2 0 002 2h.055a2 2 0 001.888-1.338l1.39-4.172A2 2 0 0021.333 8H21a2 2 0 00-2-2h-5a2 2 0 01-2-2v-1a2 2 0 00-2-2h-2.945" />
    </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);
