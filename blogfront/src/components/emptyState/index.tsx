import { Button, Heading, Stack, Text } from "@chakra-ui/react";

interface IProps {
  toggleModalVisibility: () => void;
}

const EmptyState = ({ toggleModalVisibility }: IProps) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      p={16}
      borderRadius={8}
      textAlign={"center"}
    >
      <Heading size="lg">You haven’t added any blog posts.</Heading>
      <Text>Welcome 👋🏼 Let’s get started.</Text>
      <Button
        maxWidth="200px"
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
        onClick={toggleModalVisibility}
      >
        Add Your First Post
      </Button>
    </Stack>
  );
};

export default EmptyState;
