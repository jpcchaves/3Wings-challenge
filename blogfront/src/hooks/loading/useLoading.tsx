import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (value: boolean) => {
    setIsLoading(() => value);
  };

  return { isLoading, setLoading };
};

export default useLoading;
