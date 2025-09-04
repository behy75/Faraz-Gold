import { useEffect } from "react";
export default function useOutsideClick(refs, onOutside) {
  useEffect(() => {
    const handler = (e) => {
      const arr = Array.isArray(refs) ? refs : [refs];
      const isOut = arr.every(r => r?.current && !r.current.contains(e.target));
      if (isOut) onOutside?.(e);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [refs, onOutside]);
}
