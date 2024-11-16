import { useEffect } from "react";

export default function Dialog({ children, open, dialog }) {


  useEffect(
    () => (open ? dialog.current.showModal() : dialog.current.close()),
    [open]
  );
  return (
    <dialog ref={dialog}>{children}</dialog>
  );
}
