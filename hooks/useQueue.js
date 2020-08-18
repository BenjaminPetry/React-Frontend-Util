import { useState, useCallback } from "react";

export default function useQueue(initialQueue = []) {
  const [queue, setQueue] = useState(initialQueue);
  const isProcessing = queue.length > 0;
  const currentElement = isProcessing ? queue[0] : null;

  const add = useCallback(
    (item) => {
      setQueue([...queue, item]);
    },
    [queue]
  );

  const next = useCallback(() => {
    setQueue(queue.slice(1));
  }, [queue]);

  const setCurrent = useCallback(
    (new_item) => {
      setQueue([new_item, ...queue.slice(1)]);
    },
    [queue]
  );

  return [currentElement, queue, add, next, setCurrent];
}
