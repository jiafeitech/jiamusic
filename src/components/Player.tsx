import {
  Play20Filled,
  Pause20Filled,
  Next20Filled,
  Previous20Filled,
  Speaker220Filled,
  SpeakerMute20Filled,
  SkipBack1020Filled,
  SkipForward1020Filled,
} from "@fluentui/react-icons";
import { useCurrentSong } from "../contexts/CurrentSongContext";
import { usePocketBase } from "../contexts/PocketBaseContext";
import { useSongList } from "../contexts/SongListContext";
import { Link } from "react-router-dom";
import fancyTimeFormat from "../utils/fancyTimeFormat";
import { useAudio } from "react-use";
import { useEffect, useState } from "react";

export default function Player() {
  const currentSong = useCurrentSong();
  const songList = useSongList();
  const pb = usePocketBase();

  const [audio, state, controls, audioRef] = useAudio({
    src: "",
  });

  const [volume, setVolume] = useState(100);
  const [isChanging, setIsChanging] = useState(false);
  const [newTime, setNewTime] = useState(0);

  function skipBack() {
    const index = songList.list.findIndex(
      (x) => x.title == currentSong.song?.title
    );
    if (index == 0) {
      currentSong.setSong(songList.list[songList.list.length - 1]);
    } else {
      currentSong.setSong(songList.list[index - 1]);
    }
  }

  function skipNext() {
    const index = songList.list.findIndex(
      (x) => x.title == currentSong.song?.title
    );

    if (index == songList.list.length - 1) {
      currentSong.setSong(songList.list[0]);
    } else {
      currentSong.setSong(songList.list[index + 1]);
    }
  }

  function playBtn() {
    if (state.playing) controls.pause();
    else if (state.paused) controls.play();
  }

  function muteBtn() {
    if (state.muted) controls.unmute();
    else controls.mute();
  }

  useEffect(() => {
    controls.volume(volume / 100);
  }, [volume]);

  useEffect(() => {
    controls.pause();
    if (currentSong.song)
      (audioRef.current as any).src =
        pb?.getFileUrl(currentSong.song, currentSong.song.audio) || "";
  }, [currentSong.song]);

  audioRef.current?.addEventListener("loadeddata", controls.play);
  audioRef.current?.addEventListener("ended", skipNext);

  const albumCoverUrl = currentSong.song?.album_cover
    ? (pb?.getFileUrl(
        currentSong.song,
        currentSong.song?.album_cover
      ) as string)
    : "https://placeimg.com/256/256/arch";

  return (
    <>
      <div className="navbar bg-base-300 fixed bottom-0 z-30 min-h-[5rem]">
        <div className="navbar-start">
          {currentSong.song ? (
            <div
              className="tooltip"
              data-tip={`By ${currentSong.song.artist || "Unknown"}`}
            >
              <Link
                className="btn btn-ghost normal-case text-xl gap-2"
                to={`/#${currentSong.song?.id}`}
              >
                <img
                  src={!currentSong.song ? "" : albumCoverUrl}
                  alt="Cover"
                  className="h-6 w-6"
                />
                {currentSong.song?.title || ""}
              </Link>
            </div>
          ) : (
            <a></a>
          )}
        </div>

        <div className="navbar-center">
          <div className="tooltip" data-tip="Skip Back">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => controls.seek(state.time - 10)}
            >
              <SkipBack1020Filled />
            </button>
          </div>

          <div className="tooltip" data-tip="Previous">
            <button className="btn btn-ghost btn-circle" onClick={skipBack}>
              <Previous20Filled />
            </button>
          </div>

          <div className="tooltip" data-tip={state.playing ? "Pause" : "Play"}>
            <button className="btn btn-ghost btn-circle" onClick={playBtn}>
              {state.playing ? <Pause20Filled /> : <Play20Filled />}
            </button>
          </div>

          <div className="tooltip" data-tip="Next">
            <button className="btn btn-ghost btn-circle" onClick={skipNext}>
              <Next20Filled />
            </button>
          </div>

          <div className="tooltip" data-tip="Skip Forward">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => controls.seek(state.time + 10)}
            >
              <SkipForward1020Filled />
            </button>
          </div>
        </div>

        <div className="navbar-end">
          <div
            className="tooltip"
            data-tip={`${volume} ${state.muted ? "(Muted)" : ""}`}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              className={`range range-primary range-xs w-32 ${
                state.muted ? "opacity-50" : ""
              }`}
              onChange={(e) => (state.muted ? {} : setVolume(+e.target.value))}
            />
          </div>

          <div className="tooltip" data-tip={state.muted ? "Unmute" : "Mute"}>
            <button className="btn btn-ghost btn-circle" onClick={muteBtn}>
              {state.muted ? <SpeakerMute20Filled /> : <Speaker220Filled />}
            </button>
          </div>
        </div>
      </div>

      <div
        className="tooltip w-screen -bottom-[6px] fixed z-40"
        data-tip={`${fancyTimeFormat(
          isChanging ? newTime : state.time
        )}/${fancyTimeFormat(state.duration)}`}
      >
        <input
          type="range"
          min="0"
          max={state.duration}
          value={isChanging ? newTime : state.time}
          className="range range-primary range-2xs  rounded-none"
          onMouseDown={() => setIsChanging(true)}
          onMouseUp={() => {
            setIsChanging(false);
            controls.seek(newTime);
          }}
          onChange={(e) => setNewTime(+e.target.value)}
        />
      </div>

      {audio}
    </>
  );
}
