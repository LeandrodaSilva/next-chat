import { AtomEffect } from "recoil"
import { recoilPersist } from "recoil-persist"
import {ssrCompletedState} from "../atoms/ssrCompletedState";

const { persistAtom } = recoilPersist()

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param))
}
