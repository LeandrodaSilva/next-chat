import {selector} from "recoil";
import {inputTextState} from "../atoms/inputTextState";

export const textMessageLengthState = selector({
  key: 'textMessageLength',
  get: ({get}) => {
    const inputText = get(inputTextState);

    return inputText.length;
  },
});
