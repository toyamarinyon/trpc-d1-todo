import { useContext } from "react";
import { ToastContext } from "./Context";

export const useToast = () => {
  const { setTitle, setOpen } = useContext(ToastContext);
  const showToast = (title: string) => {
    setTitle(title);
    setOpen(true);
  };
  return showToast;
};
