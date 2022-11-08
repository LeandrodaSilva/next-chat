import {atom} from "recoil";
import {persistAtomEffect} from "../effects/persistAtom";

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    name: "Anonymous",
  },
  effects: [
    persistAtomEffect
  ]
});
