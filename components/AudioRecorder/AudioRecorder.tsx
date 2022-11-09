import React from 'react';
import styles from "../../styles/AudioRecorder.module.css"
import buttonStyles from "../../styles/Button.module.css"
import TrashIcon from "../Icons/Trash/Trash";
import PauseIcon from "../Icons/Pause/PauseIcon";
import MicrophoneIcon from "../Icons/Microphone/Microphone";
import {useRecoilState} from "recoil";
import {isRecordingState} from "../../recoil/atoms/isRecordingState";

interface Props {
  onCancel?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

function AudioRecorder(props: Props) {
  const { onCancel } = props;
  const [isRecording, setIsRecording] = useRecoilState(isRecordingState);
  const [recordingTime, setRecordingTime] = React.useState<number>(0);
  const [pauseTime, setPauseTime] = React.useState<boolean>(false);
  const [timeString, setTimeString] = React.useState<string>("00:00");
  const recordingTimeTotal = 60;

  React.useEffect(() => {
    if (isRecording && !pauseTime) {
      const interval = setInterval(() => {
        const date = new Date(0);
        date.setSeconds(recordingTime + 1);
        setRecordingTime(recordingTime + 1);
        setTimeString(date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1"));
      }, 1000);
      return () => clearInterval(interval);
    }
    if (pauseTime) {
      props.onPause && props.onPause();
    }
  }, [isRecording, pauseTime, props, recordingTime]);

  React.useEffect(() => {
    if (recordingTime >= recordingTimeTotal) {
      setIsRecording(false);
    }
  }, [recordingTime]);

  return (
    <div className="relative w-full">
      <span
        className={styles.time}
        style={{
          width: `${(recordingTime / recordingTimeTotal) * 100}%`,
        }}
      />
      <div className={styles.container}>

        <button
          className={`${buttonStyles.buttonText} ${styles.noShadow}`}
          type="button"
          onClick={onCancel}
        >
          <TrashIcon/>
        </button>
        <span>
        {timeString}
      </span>
        <button
          className={`${buttonStyles.buttonText} ${styles.noShadow}`}
          type="button"
          onClick={() => {
            setPauseTime(!pauseTime);

            if (pauseTime) {
              props.onResume && props.onResume();
            }
          }}
        >
          {pauseTime ? (
            <MicrophoneIcon/>
          ) : (
            <PauseIcon/>
          )}
        </button>
      </div>
    </div>
  );
}

export default AudioRecorder;
