import { UseToastOptions, useToast } from "@chakra-ui/react";

type ToastStatus =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading"
  | undefined;

const useNotify = () => {
  const toast = useToast();
  const notify = (
    title: string,
    status: ToastStatus,
    options?: UseToastOptions
  ) => {
    toast({
      title,
      status,
      duration: 3000,
      ...options,
    });
  };

  return { notify };
};

export default useNotify;
