import {atom} from "recoil";
import {persistAtomEffect} from "../effects/persistAtom";

export const langState = atom<string>({
  key: 'langState',
  default: "en-us",
  effects: [
    persistAtomEffect
  ]
});
