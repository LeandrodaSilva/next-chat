import {useSetRecoilState} from "recoil"
import {ssrCompletedState} from "../recoil/atoms/ssrCompletedState";

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState)
  return () => setSsrCompleted(true)
}
