import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { InputComponent } from "chakraui-custom-components";
import { FormikValues } from "formik";
import { useAppDispatch } from "../../../../hooks/useRedux";
import { clearBlogPost } from "../../../../store/blogPosts";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  validation: FormikValues;
  isLoading: boolean;
}

const BlogPostModalForm = ({
  isOpen,
  onClose,
  validation,
  isLoading,
}: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Blog Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ sm: 1 }} gap={5}>
              <InputComponent
                inputIdentifier="title"
                inputLabel="Blog Post Title"
                inputValue={validation.values.title}
                isRequired
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                inputErrorMessage={validation.errors.title}
                isInvalid={
                  !!(validation.errors.title && validation.touched.title)
                }
              />
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  id="content"
                  value={validation.values.content}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  isInvalid={
                    !!(validation.errors.content && validation.touched.content)
                  }
                  height={200}
                />
                {!!(
                  validation.errors.content && validation.touched.content
                ) && (
                  <Text color={"red.300"} mt={2} fontSize={"14"}>
                    {validation.errors.content}
                  </Text>
                )}
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing={2}>
              <Button
                onClick={() => {
                  onClose();
                  dispatch(clearBlogPost());
                }}
                colorScheme="red"
                isLoading={isLoading}
              >
                Close
              </Button>
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                Submit
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default BlogPostModalForm;
