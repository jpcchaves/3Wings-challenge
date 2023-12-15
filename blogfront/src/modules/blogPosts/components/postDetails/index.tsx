import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { BlogPostMinDto } from "../../../../domain/models/blogPosts/BlogPostMinDto";

interface IProps {
  isDetailsModalOpen: boolean;
  toggleDetailsModal: () => void;
  selectedBlogPostDetails: BlogPostMinDto | null;
}

const PostDetailsModal = ({
  isDetailsModalOpen,
  toggleDetailsModal,
  selectedBlogPostDetails,
}: IProps) => {
  return (
    <Modal isCentered isOpen={isDetailsModalOpen} onClose={toggleDetailsModal}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>{selectedBlogPostDetails?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{selectedBlogPostDetails?.content}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={toggleDetailsModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailsModal;
