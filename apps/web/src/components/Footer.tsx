import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import { ReactNode } from "react";
import Image from "next/image";


const SocialButton = ({
                        children,
                        label,
                        href
                      }: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}>
        <Image src="next.svg" alt="logo" width={120} height={28} />
        <Text>© 2023 Gabriel Moura. Todos os direitos reservados</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Linkedin"} href={"https://www.linkedin.com/in/gabrielblx32/"}>
            <FaLinkedin />
          </SocialButton>
          <SocialButton label={"Github"} href={"https://github.com/gabrielmoura"}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"mailto:gmoura96@icloud.com"}>
            <FaRegEnvelope />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}