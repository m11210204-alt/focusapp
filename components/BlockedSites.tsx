import React, { useState, useEffect, useRef } from 'react';
import { YouTubeIcon, TwitterIcon, InstagramIcon, NewsIcon, FacebookIcon, RedditIcon, TikTokIcon, NetflixIcon } from './icons/SocialIcons';
import { ChevronDownIcon } from './icons/Icons';

interface Site {
    id: string;
    name: string;
    icon: React.ReactNode;
}

const ALL_SITES: Site[] = [
    { id: 'youtube', name: 'YouTube', icon: <YouTubeIcon /> },
    { id: 'twitter', name: 'X (Twitter)', icon: <TwitterIcon /> },
    { id: 'instagram', name: 'Instagram', icon: <InstagramIcon /> },
    { id: 'facebook', name: 'Facebook', icon: <FacebookIcon /> },
    { id: 'reddit', name: 'Reddit', icon: <RedditIcon /> },
    { id: 'tiktok', name: 'TikTok', icon: <TikTokIcon /> },
    { id: 'news', name: 'News Sites', icon: <NewsIcon /> },
    { id: 'netflix', name: 'Netflix', icon: <NetflixIcon /> },
];

const BlockedSites: React.FC = () => {
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set(['youtube', 'twitter', 'instagram', 'news']));
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleSite = (id: string) => {
    setSelectedSites(prevSelected => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        return newSelected;
    });
  };
  
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getButtonText = () => {
    if (selectedSites.size === 0) return "Select sites to block";
    if (selectedSites.size === 1) return "1 distraction blocked";
    return `${selectedSites.size} distractions blocked`;
  }

  return (
    <div className="w-full p-4 bg-white/40 backdrop-blur-sm rounded-2xl shadow-sm">
        <h3 className="font-semibold text-slate-700 mb-3 text-center">Distractions Blocked</h3>
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-white/70 hover:bg-slate-100/80 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="font-medium text-slate-700">{getButtonText()}</span>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="w-full mt-2 bg-white/80 backdrop-blur-md rounded-lg shadow-xl border border-slate-200/50" role="listbox">
                    <ul className="p-2 max-h-60 overflow-y-auto">
                        {ALL_SITES.map(site => (
                           <li 
                            key={site.id} 
                            className="flex items-center p-2 rounded-md hover:bg-cyan-100/50 cursor-pointer"
                            onClick={() => handleToggleSite(site.id)}
                            role="option"
                            aria-selected={selectedSites.has(site.id)}
                           >
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={selectedSites.has(site.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                                />
                                <div className="w-5 h-5 mx-3 opacity-80">{site.icon}</div>
                                <span className="font-medium text-slate-700">{site.name}</span>
                           </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
  );
};

export default BlockedSites;