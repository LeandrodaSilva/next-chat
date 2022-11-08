import {useRecoilState} from "recoil";
import {websocketState} from "../recoil/atoms/websocketState";
import React, {useCallback} from "react";
import {messagesState} from "../recoil/atoms/messagesState";
import {userState} from "../recoil/atoms/userState";
import useWebSocket, {ReadyState} from "react-use-websocket";

function useWebSocketConnector(websocket: unknown) {
  const [, setMessages] = useRecoilState<ISocketMessage[]>(messagesState);
  const [user] = useRecoilState<IUser>(userState);
  const [connectionStatus, setConnectionStatus] = React.useState("Uninstantiated");

  React.useEffect(() => {
    if (websocket) {
      console.log("websocket", websocket);
      // @ts-ignore
      // @ts-ignore
      setConnectionStatus({
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        // @ts-ignore
      }[websocket?.readyState])
    }
  }, [
    websocket,
    // @ts-ignore
    websocket?.readyState]
  );

  // React.useEffect(() => {
  //   if (connectionStatus === "Open") {
  //     websocket?.sendMessage(JSON.stringify(
  //       {
  //         type: "text",
  //         metadata: {
  //           user,
  //         },
  //         data: `Has joined the chat`,
  //       }
  //     ));
  //   }
  // }, [connectionStatus, user, websocket]);

  React.useEffect(() => {
    const addMessage = (message: ISocketMessage) => {
      setMessages((messages) => [...messages, message]);
    }

    if (websocket) {
      // @ts-ignore
      websocket.getWebSocket()?.addEventListener("message", (event) => {
        // @ts-ignore
        if (typeof event.data === 'string') {
          try {
            // @ts-ignore
            let message = JSON.parse(event.data);
            addMessage(message);
          } catch (e) {
            addMessage({
              type: "text",
              // @ts-ignore
              data: event.data
            });
          }
        } else {
          addMessage({
            type: "blob",
            // @ts-ignore
            data: event.data
          });
        }
      });
    }
  }, [setMessages, user, websocket]);

  const sendMessage = useCallback((message: ISocketMessage) => {
    if (websocket) {
      const {
        metadata = {}
      } = message;

      message.metadata = {
        ...metadata,
        user,
      }

      try {
        // @ts-ignore
        websocket.sendMessage(JSON.stringify(message));
      } catch (e) {
        console.error(e);
      }
    }
  }, [websocket, user]);

  return {
    sendMessage,
  }
}

export default useWebSocketConnector;
