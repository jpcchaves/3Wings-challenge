import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FloatButton } from "chakraui-custom-components";
import { useFormik } from "formik";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PageWrapper from "../../../../components/pageWrapper";
import useModalControls from "../../../../hooks/modalControls/useModalControls";
import { useAppSelector } from "../../../../hooks/useRedux";
import BlogPostModalForm from "../../components/blogPostModalForm";
import useBlogPosts from "../../hooks/useBlogPosts";
import { blogPostValidationSchema } from "../../utils/validation/blogPostValidationSchema";

const BlogPostsList = () => {
  const { blogPost, blogPosts } = useAppSelector((state) => state.blogPosts);
  const { isModalOpen, toggleModalVisibility } = useModalControls();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogPost ? blogPost?.title : "",
      content: blogPost ? blogPost?.content : "",
    },
    validationSchema: blogPostValidationSchema,
    onSubmit: (values) => {
      if (blogPost) {
        updateBlogPost(values, blogPost.id);
      } else {
        createBlogPost(values);
      }
    },
  });

  const { getBlogPostList, createBlogPost, updateBlogPost } = useBlogPosts({
    validation,
    toggleModalVisibility,
  });

  useEffect(() => {
    getBlogPostList();
  }, []);

  return (
    <PageWrapper pageTitle="Blog Posts">
      <Box>
        <SimpleGrid columns={{ sm: 1, md: 3 }} gap={5}>
          {(blogPosts || []).map(({ title, content }, idx) => (
            <Card key={`${title}-${idx}`}>
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Box>
                      <Heading>{title}</Heading>
                    </Box>
                  </Flex>
                  <Menu placement="right-start" preventOverflow>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<BsThreeDotsVertical />}
                      variant="link"
                    />
                    <MenuList>
                      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                      <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </CardHeader>

              <CardBody>
                <Box>
                  <Text pt="2" fontSize="sm">
                    {content}
                  </Text>
                </Box>
              </CardBody>

              <CardFooter>
                <Button w={"full"} colorScheme="blue">
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>

        <BlogPostModalForm
          isOpen={isModalOpen}
          onClose={toggleModalVisibility}
          validation={validation}
        />
        <FloatButton
          onClick={toggleModalVisibility}
          rounded={"full"}
          colorScheme={"blue"}
          icon={<AddIcon />}
          size={"lg"}
        />
      </Box>
    </PageWrapper>
  );
};

export default BlogPostsList;
