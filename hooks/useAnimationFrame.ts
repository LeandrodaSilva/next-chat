import React from "react";

export function useAnimationFrame(callback: (arg0: number) => void) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  React.useEffect(() => {
    const animate = (time: number | undefined) => {
      if (previousTimeRef.current != undefined) {
        // @ts-ignore
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime)
      }
      // @ts-ignore
      previousTimeRef.current = time;
      // @ts-ignore
      requestRef.current = requestAnimationFrame(animate);
    }
    // @ts-ignore
    requestRef.current = requestAnimationFrame(animate);
    // @ts-ignore
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]); // Make sure the effect runs only once
}
