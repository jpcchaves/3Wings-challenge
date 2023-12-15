import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FloatButton } from "chakraui-custom-components";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import EmptyState from "../../../../components/emptyState";
import DeleteModal from "../../../../components/modalDelete";
import PageWrapper from "../../../../components/pageWrapper";
import useModalControls from "../../../../hooks/modalControls/useModalControls";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { clearBlogPost } from "../../../../store/blogPosts";
import BlogPostModalForm from "../../components/blogPostModalForm";
import CardMenu from "../../components/cardMenu";
import useBlogPosts from "../../hooks/useBlogPosts";
import { blogPostValidationSchema } from "../../utils/validation/blogPostValidationSchema";

const BlogPostsList = () => {
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(
    null
  );
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const { blogPost, blogPosts } = useAppSelector((state) => state.blogPosts);
  const { isModalOpen, toggleModalVisibility } = useModalControls();
  const dispatch = useAppDispatch();

  const toggleDeleteModal = () => {
    setIsModalDeleteOpen((prevState) => !prevState);
  };

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

  const {
    getBlogPostList,
    createBlogPost,
    updateBlogPost,
    getBlogPostById,
    deleteBlogPost,
    isLoading,
  } = useBlogPosts({
    validation,
    toggleModalVisibility,
    setSelectedBlogPostId,
    toggleDeleteModal,
  });

  useEffect(() => {
    getBlogPostList();
  }, []);

  return (
    <PageWrapper pageTitle="Blog Posts">
      <Box>
        <SimpleGrid columns={{ sm: 1, md: 3, xl: 4 }} gap={5}>
          {(blogPosts || []).map(({ id, title, content }, idx) => (
            <Card key={`${title}-${idx}-${id}`}>
              <CardHeader>
                <Flex>
                  <Flex
                    isTruncated
                    flex="1"
                    gap="4"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Box>
                      <Heading size={"md"}>{title}</Heading>
                    </Box>
                  </Flex>
                  <CardMenu
                    id={id}
                    getBlogPostById={getBlogPostById}
                    toggleModalVisibility={toggleDeleteModal}
                    setSelectedBlogPostId={setSelectedBlogPostId}
                  />
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

        {blogPosts && !blogPosts.length ? (
          <EmptyState toggleModalVisibility={toggleModalVisibility} />
        ) : null}

        <DeleteModal
          selectedBlogPostId={selectedBlogPostId!}
          handleDelete={deleteBlogPost}
          isLoading={isLoading}
          isModalOpen={isModalDeleteOpen}
          toggleModalVisibility={toggleDeleteModal}
        />

        <BlogPostModalForm
          isOpen={isModalOpen}
          onClose={toggleModalVisibility}
          validation={validation}
          isLoading={isLoading}
        />
        <FloatButton
          onClick={() => {
            toggleModalVisibility();
            dispatch(clearBlogPost());
          }}
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
