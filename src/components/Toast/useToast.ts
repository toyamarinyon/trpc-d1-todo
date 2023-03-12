import { useContext } from "react";
import { ToastContext } from "./Context";

export const useToast = () => {
  const { toasts, setToasts } = useContext(ToastContext);
  const showToast = (title: string) => {
    const newToasts = new Map(toasts);
    newToasts.set(Date.now().valueOf().toString(), { title });
    setToasts(newToasts);
  };
  return showToast;
};
