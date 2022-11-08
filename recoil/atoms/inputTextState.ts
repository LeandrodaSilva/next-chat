import {atom} from "recoil";

export const inputTextState = atom<string>({
  key: 'inputTextState',
  default: "",
});
