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

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  validation: FormikValues;
}

const BlogPostModalForm = ({ isOpen, onClose, validation }: IProps) => {
  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e);
        }}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
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
                  <Text color={"red.500"} mt={2} fontSize={"12"}>
                    {validation.errors.content}
                  </Text>
                )}
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing={2}>
              <Button onClick={onClose} colorScheme="red">
                Close
              </Button>
              <Button type="submit" colorScheme="blue">
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
