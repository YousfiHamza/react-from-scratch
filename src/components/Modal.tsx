import { useRef, useEffect, ReactNode, MutableRefObject, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modal = document.getElementById("modal");
    if (!modal || !elRef.current) return;
    modal.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        modal.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
