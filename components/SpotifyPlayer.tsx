import React from 'react';

const SpotifyPlayer: React.FC = () => {
  return (
    <aside 
      className="hidden lg:block fixed top-8 right-8 z-20"
      aria-label="Spotify music player"
    >
      <iframe
        style={{ borderRadius: '12px' }}
        src="https://open.spotify.com/embed/track/6bs6Wz39aEdPcaXQ3oDHul?utm_source=generator&theme=0"
        width="300"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Track Player"
      ></iframe>
    </aside>
  );
};

export default SpotifyPlayer;