import React, { useState } from "react";
import ls from "localstorage-slim";

export default function Footer() {
  const [track, setTrack] = useState("");
  const [trackId, setTrackId] = useState(0)

    const changeTrack = () => {
      setTrackId(ls.get('idCurrentPlay'))
      setTrack(ls.get('currentPlay'))
    }

  return (
    <>
      <div className="flex absolute bottom-0 w-full border-t border-gray-300">
      <button
      onClick={changeTrack}
      >
        Click!!
      </button>
        <audio
          key={trackId}
          className="px-4 py-2 w-full"
          src={track}
          controls="controls"
          preload="none"      
        >
        </audio>
      </div>
    </>
  );
}
