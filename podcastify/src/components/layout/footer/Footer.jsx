import 'react-h5-audio-player/lib/styles.css';

import React, { useState } from "react";

import ls from "localstorage-slim";
import AudioPlayer from "react-h5-audio-player";

export default function Footer() {
  const [track, setTrack] = useState("");
  const [trackId, setTrackId] = useState(0);

  const changeTrack = () => {
    setTrackId(ls.get("idCurrentPlay"));
    setTrack(ls.get("currentPlay"));
  };

  return (
    <>
      <div className="flex absolute bottom-0 w-full border-t border-gray-300">
        <button onClick={changeTrack}>Click!!</button>
        <AudioPlayer
          key={trackId}
          src={track}
          volume={0.3}
          onPlay={(e) => console.log(e + "onplay!")}
        ></AudioPlayer>
      </div>
    </>
  );
}
