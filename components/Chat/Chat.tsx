import React, {useCallback} from 'react';
import styles from '../../styles/Chat.module.css';

const createWebsocket = () => {
  return new WebSocket("wss://socket.leandrodasilva.dev");
}

function Chat() {
  const sendButtonRef = React.useRef<HTMLButtonElement>(null);
  const messageInputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [messages, setMessages] = React.useState<ISocketMessage[]>([]);
  const [websocket, setWebsocket] = React.useState<WebSocket | null>(null);
  const [sendButtonDisabled, setSendButtonDisabled] = React.useState<boolean>(true);
  const [listObserver, setListObserver] = React.useState<MutationObserver | null>(null);
  const [stream, setStream] = React.useState<MediaStream | null>(null);

  React.useEffect(() => {
    setWebsocket(createWebsocket());
  }, []);

  React.useEffect(() => {
    if (listRef.current && listObserver === null) {
      const listElement = listRef.current as HTMLUListElement;
      const config = { childList: true };

      const callback = function (mutationsList: any, observer: any) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            listElement.scrollTo(0, listElement.scrollHeight);
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(listElement, config);
      setListObserver(observer);
    }

    return () => {
      if (listObserver) {
        listObserver.disconnect();
      }
    }
  }, [listObserver, listRef]);

  React.useEffect(() => {
    if (websocket) {
      websocket.addEventListener("open", (event) => {
        addMessage({
          type: "text",
          data: "Connected to server",
        });
      });
      websocket.addEventListener("message", (event) => {
        if (typeof event.data === 'string') {
          try {
            let message = JSON.parse(event.data);
            addMessage(message);
          } catch (e) {
            addMessage({
              type: "text",
              data: event.data
            });
          }
        } else {
          addMessage({
            type: "blob",
            data: event.data
          });
        }
      });
    } else {
      setWebsocket(createWebsocket());
    }

    return () => {
      if (websocket) {
        websocket.close();
      }
    }
  }, [websocket]);

  const addMessage = (message: ISocketMessage) => {
    setMessages((messages) => [...messages, message]);
  }

  const renderMessage = (message: ISocketMessage, index: number) => {
    switch (message.type) {
      case "audio": {
        let decoded = atob(message.data);
        let array = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          array[i] = decoded.charCodeAt(i);
        }
        const blob = new Blob([array], { type: "audio/webm" });
        return (
          <li key={index} className={styles.listItem}>
            <audio controls src={URL.createObjectURL(blob)} />
          </li>
        );
      }
      case 'text':
      default:
        return <li key={index} className={styles.listItem}>{message.data}</li>
    }
  }

  const sendMessage = useCallback(() => {
    if (websocket && messageInputRef.current) {
      let message: ISocketMessage = {
        type: "text",
        data: messageInputRef.current.value,
      }
      try {
        websocket.send(JSON.stringify(message));
      } catch (e) {
        console.error(e);
        setWebsocket(createWebsocket());
        websocket.send(JSON.stringify(message));
      }
      messageInputRef.current.value = "";
      messageInputRef.current.focus();
      setSendButtonDisabled(true);
    }
  }, [websocket]);

  const recordAudio = useCallback(async () => {
   if (websocket) {
     let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
     const recorder = new MediaRecorder(stream);
     setStream(stream);

     let data: any = [];
     recorder.addEventListener("dataavailable", (e) => {
       data.push(e.data);
     });

     recorder.start();

     recorder.onstop = async (e) => {
       let blob = new Blob(data, {type: 'audio/webm'});
       blob.arrayBuffer().then((buffer) => {
         let array = new Uint8Array(buffer);
         // @ts-ignore
         let encoded = btoa(String.fromCharCode(...array));
          let message: ISocketMessage = {
            type: "audio",
            data: encoded,
          }
          websocket.send(JSON.stringify(message));
       });
     }
   }
  }, [websocket]);

  return (
    <div id="root" className={styles.container}>
      <ul
        ref={listRef}
        className={styles.list}
      >
        {messages.map(renderMessage)}
      </ul>

      <div className={styles.inputContainer}>
        <input
          ref={messageInputRef}
          className={styles.typingInput}
          type="text"
          onKeyUp={(event) => {
            let value = (event.target as HTMLInputElement).value;
            setSendButtonDisabled(value.length === 0);
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button
          id="send-btn"
          ref={sendButtonRef}
          className={styles.button}
          type="button"
          onClick={sendMessage}
          disabled={sendButtonDisabled}
        >
          Enviar
        </button>
        <button
          id="speak-btn"
          className={styles.button}
          type="button"
          onClick={event => {
            let target = event.target as HTMLButtonElement;
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
              target.innerText = 'Falar';
              setStream(null);
            } else {
              recordAudio();
              target.innerText = 'Encerrar';
            }
          }}
        >
          Falar
        </button>
      </div>
    </div>
  );
}

export default Chat;
