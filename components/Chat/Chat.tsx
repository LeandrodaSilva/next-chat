import React from 'react';
import styles from '../../styles/Chat.module.css';
import buttonStyles from '../../styles/Button.module.css';
import MicrophoneIcon from "../Icons/Microphone/Microphone";
import SendIcon from "../Icons/Send/Send";
import {useRecoilState, useRecoilValue} from "recoil";
import {messagesState} from "../../recoil/atoms/messagesState";
import useAutoScrollToBottom from "../../hooks/useAutoScrollToBottom";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import Message from "../Message/Message";
import InputMessage from "../InputMessage/InputMessage";
import {textMessageLengthState} from "../../recoil/selectors/textMessageLengthState";
import useWebSocket from "react-use-websocket";
import {inputTextState} from "../../recoil/atoms/inputTextState";
import {userState} from "../../recoil/atoms/userState";
import {getRandomName} from "../../hooks/useNameGenerator";
import AudioRecorder from "../AudioRecorder/AudioRecorder";
import useLocalization from "../../hooks/useLocalization";
import {isRecordingState} from "../../recoil/atoms/isRecordingState";
import List from "../List/List";

function Chat() {
  const listRef = useAutoScrollToBottom();
  const [messages, setMessages] = useRecoilState<ISocketMessage[]>(messagesState);
  const textMessageLength = useRecoilValue(textMessageLengthState);
  const [isRecording, setIsRecording] = useRecoilState(isRecordingState);
  const [inputText, setInputText] = useRecoilState<string>(inputTextState);
  const [user, setUser] = useRecoilState<IUser>(userState);
  const {sendMessage} = useWebSocket("wss://socket.leandrodasilva.dev", {
    retryOnError: true,
    onOpen: (event) => {
      sendMessage(JSON.stringify(
        {
          type: "text",
          metadata: {
            user,
          },
          data: l(`Has joined the chat`),
        }
      ));
    },
    onMessage: (event) => {
      if (typeof event.data === 'string') {
        try {
          let message = JSON.parse(event.data);
          setMessages([...messages, message]);
        } catch (e) {
          setMessages([...messages, {
            type: "text",
            data: event.data
          }]);
        }
      } else {
        setMessages([{
          type: "blob",
          data: event.data
        }]);
      }
    }
  });
  const [record, send, cancel, pause, resume] = useAudioRecorder(sendMessage);
  const [l] = useLocalization();

  React.useEffect(() => {
    if (user.name === "Anonymous") {
      setUser({
        ...user,
        name: getRandomName(),
      })
    }
  }, [setUser, user]);

  const toggleRecording = () => {
    if (isRecording) {
      send();
      setIsRecording(false);
    } else {
      record();
      setIsRecording(true);
    }
  }

  const handleSend = () => {
    if (inputText.length > 0) {
      let message: ISocketMessage = {
        type: "text",
        metadata: {
          user,
        },
        data: inputText,
      }
      sendMessage(JSON.stringify(message));
      setInputText("");
    }
  }

  return (
    <div className={styles.container}>
      <List
        className={styles.list}
        data={messages}
        innerRef={listRef}
        iterator={(data) => <Message message={data}/>}
      />
      <div className={styles.inputContainer}>
        {isRecording ? (
          <AudioRecorder
            onCancel={() => {
              cancel();
              setIsRecording(false);
            }}
            onPause={pause}
            onResume={resume}
          />
        ) : (
          <InputMessage
            onSend={handleSend}
          />
        )}
        {textMessageLength > 0 && (
          <button
            className={buttonStyles.button}
            title="Send message"
            type="button"
            onClick={handleSend}
          >
            <SendIcon/>
          </button>
        )}
        {textMessageLength === 0 && (
          <button
            className={buttonStyles.button}
            type="button"
            title={isRecording ? l("Send audio") : l("Record audio")}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <SendIcon/>
            ) : (
              <MicrophoneIcon/>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Chat;
