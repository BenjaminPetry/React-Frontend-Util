/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useEffect } from "react";
import {
  ControlBar,
  Player,
  ReplayControl,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import "video-react/dist/video-react.css"; // import css
import "./VideoView.css";

export default function VideoView({
  video,
  className = "",
  preload = "auto",
  onStateChanged = null,
}) {
  const playerRef = React.createRef();

  useEffect(function updateSpeed() {
    if (playerRef.current && onStateChanged != null) {
      playerRef.current.subscribeToStateChange(onStateChanged);
    }
  });

  return (
    <div className={"videoView" + (className === "" ? "" : " " + className)}>
      <div className="videoPlayer">
        <Player
          ref={playerRef}
          fluid={false}
          src={video.src}
          width="100%"
          height="100%"
          preload={preload}
        >
          <ControlBar autoHide={false} className="my-class">
            <BigPlayButton position="center" />
            <ReplayControl seconds={10} order={2.2} />
            <ReplayControl seconds={5} order={2.2} />
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton
              rates={[2, 1.75, 1.5, 1.25, 1, 0.75, 0.5]}
            />
          </ControlBar>
        </Player>
      </div>
    </div>
  );
}
