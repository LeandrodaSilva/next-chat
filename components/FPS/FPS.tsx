import React from 'react';
import {useRecoilState} from "recoil";
import {ssrCompletedState} from "../../recoil/atoms/ssrCompletedState";
import {useAnimationFrame} from "../../hooks/useAnimationFrame";

function Fps() {
  const [count, setCount] = React.useState(0)

  useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)
  })

  return <div>{Math.round(count)}</div>
}

export default Fps;
