import { useEffect, useRef } from "react";

export function useOutsideClick(
  ref: ReturnType<typeof useRef<HTMLDivElement | null>>,
  callback: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      callback()
    }

    document.addEventListener("mousedown", listener, { passive: true })
    document.addEventListener("touchstart", listener, { passive: true })

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, callback])
}
