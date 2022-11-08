import { atom, useSetRecoilState } from "recoil"

export const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
})

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState)
  return () => setSsrCompleted(true)
}
