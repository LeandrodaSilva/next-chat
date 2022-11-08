import React from 'react';
import styles from "../../styles/AudioRecorder.module.css"
import buttonStyles from "../../styles/Button.module.css"
import TrashIcon from "../Icons/Trash/Trash";
import PauseIcon from "../Icons/Pause/PauseIcon";

interface Props {
  onCancel?: () => void;
}

function AudioRecorder(props: Props) {
  const { onCancel } = props;
  return (
    <div className={styles.container}>
      <button
        className={`${buttonStyles.buttonText} ${styles.noShadow}`}
        type="button"
        onClick={onCancel}
      >
        <TrashIcon/>
      </button>
      <span></span>
      <button
        className={`${buttonStyles.buttonText} ${styles.noShadow}`}
        type="button"
      >
        <PauseIcon/>
      </button>
    </div>
  );
}

export default AudioRecorder;
