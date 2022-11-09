import {atom} from "recoil";
import {persistAtomEffect} from "../effects/persistAtom";

export const isRecordingState = atom<boolean>({
  key: 'isRecordingState',
  default: false,
});
