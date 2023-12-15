import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import trashCamAnimation from "../../assets/animation/trash-can.json";

interface IProps {
  isModalOpen: boolean;
  toggleModalVisibility: (id: string) => void;
  handleDelete: (id: string) => Promise<void>;
  isLoading: boolean;
  selectedBlogPostId: string;
}

const DeleteModal = ({
  isModalOpen,
  toggleModalVisibility,
  selectedBlogPostId,
  handleDelete,
  isLoading,
}: IProps) => {
  const animationStyle = {
    height: 350,
    margin: -50,
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => toggleModalVisibility("")}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Attention!</ModalHeader>
        <ModalCloseButton disabled={isLoading} />
        <ModalBody>
          <Lottie animationData={trashCamAnimation} style={animationStyle} />
          <Text align="center" letterSpacing="wide">
            This action will <strong>permanently</strong> delete this blog post.
            Are you sure?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => toggleModalVisibility("")}
            isLoading={isLoading}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDelete(selectedBlogPostId)}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
