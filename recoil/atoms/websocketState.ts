import {atom} from "recoil";
import {WebSocketHook} from "react-use-websocket/src/lib/types";

export const websocketState = atom<WebSocketHook|null>({
  key: 'websocketState',
  default: null,
});
