
import 'react-h5-audio-player/lib/styles.css';
import '../../../assets/audio-player-custom.css';

import React, { useEffect, useState } from "react";

import ls from "localstorage-slim";
import AudioPlayer from "react-h5-audio-player";

export default function Footer() {
  const [track, setTrack] = useState("");
  const [trackId, setTrackId] = useState(0);

  // Sincroniza el estado con localStorage cada vez que cambie la pista
  useEffect(() => {
    const updateTrack = () => {
      const currentTrack = ls.get("currentPlay");
      const currentId = ls.get("idCurrentPlay");
      setTrack(currentTrack || "");
      setTrackId(currentId || 0);
    };
    updateTrack();
    window.addEventListener("storage", updateTrack);
    return () => window.removeEventListener("storage", updateTrack);
  }, []);

  // Solo mostrar si hay pista
  if (!track) return null;

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-900 via-fuchsia-900 to-purple-900 border-t border-fuchsia-700/30 shadow-2xl flex items-center justify-center py-2 px-2 animate__animated animate__fadeInUp">
      <div className="w-full max-w-3xl">
        <AudioPlayer
          key={trackId}
          src={track}
          volume={0.3}
          className="rounded-2xl"
        />
      </div>
    </footer>
  );
}
