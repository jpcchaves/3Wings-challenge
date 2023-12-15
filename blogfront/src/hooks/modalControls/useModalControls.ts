import { useState } from "react";

const useModalControls = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModalVisibility = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  return { isModalOpen, toggleModalVisibility };
};

export default useModalControls;
