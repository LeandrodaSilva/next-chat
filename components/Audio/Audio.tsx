import React from 'react';
import styles from "../../styles/Audio.module.css";
import PlayIcon from "../Icons/Play/PlayIcon";
import PauseIcon from "../Icons/Pause/PauseIcon";

interface Props extends React.ComponentProps<"audio"> {}

function Audio(props: Props) {
  const {
    children,
    className,
    ...rest
  } = props;
  const audioRef = React.useRef<HTMLAudioElement|null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState("00:00");
  const [intervalID, setIntervalID] = React.useState<NodeJS.Timer|null>(null);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().then(() => {
        if (intervalID === null) {
          let i = setInterval(() => {
            setCurrentTime(audioRef.current?.currentTime || 0);
            setIntervalID(i);
          }, 100);
        }
      });
    } else {
      audioRef.current?.pause();
      setIntervalID(null);
    }
  }, [audioRef, intervalID, isPlaying]);

  React.useEffect(() => {
    if (intervalID) {
      let i = setInterval(() => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        setIntervalID(i);
      }, 100);
    }
  }, [audioRef, intervalID]);

  React.useLayoutEffect(() => {
    setDuration(audioTimeToDate(currentTime))
  }, [currentTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const audioTimeToDate = (time: number) => {
    return new Date(time * 1000).toISOString().substr(14, 5);
  }

  // @ts-ignore
  return (
    <div
      className={`${styles.container} ${className}`}
    >
      <audio
        {...rest}
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      >
        {children}
      </audio>

      <button
        className={styles.playBtn}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <PauseIcon/>
        ) : (
          <PlayIcon/>
        )}
      </button>

      <span className={styles.slider}>
        <div
          className={styles.sliderTip}
          style={{
            // @ts-ignore
            left: `calc(${(currentTime / audioRef.current?.duration) * 100}% - 5px)`,
          }}
        />
      </span>

      <span className={styles.time}>
        <span>{duration}</span>
      </span>
    </div>
  );
}

export default Audio;
