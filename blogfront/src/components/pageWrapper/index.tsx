import { Box } from "@chakra-ui/react";

interface IProps {
  pageTitle?: string;
  children: JSX.Element;
}

const PageWrapper = ({ pageTitle, children }: IProps) => {
  document.title = `BlogAPP | ${pageTitle}`;

  return (
    <Box py={"20"} px={"10"}>
      {children}
    </Box>
  );
};

export default PageWrapper;
