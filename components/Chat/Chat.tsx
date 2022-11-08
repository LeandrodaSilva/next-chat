import React from 'react';
import styles from '../../styles/Chat.module.css';
import MicrophoneIcon from "../Icons/Microphone/Microphone";
import StopIcon from "../Icons/Stop/Stop";
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

function Chat() {
  const listRef = useAutoScrollToBottom();
  const [messages, setMessages] = useRecoilState<ISocketMessage[]>(messagesState);
  const textMessageLength = useRecoilValue(textMessageLengthState);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
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
          data: `Has joined the chat`,
        }
      ));
    },
    onMessage: (event) => {
      if (typeof event.data === 'string') {
        try {
          let message = JSON.parse(event.data);
          if (message.type === "text") {
            setMessages([...messages, message]);
          } else if (message.type === "messages") {
            setMessages([...messages, ...message.data]);
          }
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
  const [record, stop] = useAudioRecorder(sendMessage);

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
      stop();
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
      <ul
        ref={listRef}
        className={styles.list}
      >
        {messages.map((data, i) => <Message key={i} message={data}/>)}
      </ul>

      <div className={styles.inputContainer}>
        <InputMessage
          onSend={handleSend}
        />
        {textMessageLength > 0 && (
          <button
            className={styles.button}
            title="Send message"
            type="button"
            onClick={handleSend}
          >
            <SendIcon/>
          </button>
        )}
        {textMessageLength === 0 && (
          <button
            className={styles.button}
            type="button"
            title={isRecording ? "Stop recording" : "Record audio"}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <StopIcon/>
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
