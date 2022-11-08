import React from "react";

function useAutoScrollToBottom() {
  const listRef = React.useRef<HTMLUListElement>(null);
  const [listObserver, setListObserver] = React.useState<MutationObserver | null>(null);

  React.useEffect(() => {
    if (listRef.current && listObserver === null) {
      const listElement = listRef.current as HTMLUListElement;
      const config = { childList: true };

      const callback = function (mutationsList: any, observer: any) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            listElement.scrollTo(0, listElement.scrollHeight);
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(listElement, config);
      setListObserver(observer);
    }

    return () => {
      if (listObserver) {
        listObserver.disconnect();
      }
    }
  }, [listObserver, listRef]);

  return listRef;
}

export default useAutoScrollToBottom;
