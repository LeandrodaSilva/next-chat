import {atom} from "recoil";
import {persistAtomEffect} from "../effects/persistAtom";

export const messagesState = atom<ISocketMessage[]>({
  key: 'messagesState',
  default: [],
  effects: [
    persistAtomEffect
  ]
});
