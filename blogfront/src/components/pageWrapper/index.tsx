import { Box, useColorMode } from "@chakra-ui/react";
import { ThemeToggle } from "chakraui-custom-components";

interface IProps {
  pageTitle?: string;
  children: JSX.Element;
}

const PageWrapper = ({ pageTitle, children }: IProps) => {
  document.title = `BlogAPP | ${pageTitle}`;

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box py={"20"} px={"10"}>
        {children}
      </Box>
      <ThemeToggle
        currentTheme={colorMode}
        toggleColorMode={toggleColorMode}
        position={"fixed"}
        right={12}
        top={12}
        sunIconProps={{ color: "orange" }}
        moonIconProps={{ color: "blue.300" }}
      />
    </>
  );
};

export default PageWrapper;
