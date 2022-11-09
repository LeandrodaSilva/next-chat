import React from 'react';
import styles from "../../styles/Chat.module.css";
import {useRecoilState} from "recoil";
import {inputTextState} from "../../recoil/atoms/inputTextState";
import useLocalization from "../../hooks/useLocalization";

interface Props {
  onSend: () => void;
}

function InputMessage(props: Props) {
  const [l] = useLocalization();
  const [inputText, setInputText] = useRecoilState<string>(inputTextState);
  return (
    <>
      <label htmlFor="typing-input" style={{display: "none"}}>
        Type a message
      </label>
      <input
        autoComplete="off"
        id="typing-input"
        className={styles.typingInput}
        type="text"
        placeholder={l("Type a message")}
        title={l("Type a message")}
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            if (props.onSend) {
              props.onSend();
            }
          }
        }}
      />
    </>
  );
}

export default InputMessage;
