import { Box, Button, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

import { FaInstagram, FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import IconFooter from "./IconFooter";

const Footer = () => {
  return (

    <Box
      position="absolute"
      bottom="-10"
      w="100%"
      bg="white"
      paddingTop={10}
      h={100}
    >
      <Divider position="absolute" top="0" />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Heading size="md" mb={2}>
          Se inscrever
        </Heading>
        <Text align="center" maxWidth="400px" marginX={4} marginBottom={4}>
          Atualizações sobre as quais você deseja saber - novos produtos, histórias e promoções. Sem spam.
          Cancele a inscrição a qualquer momento.
        </Text>
        <form action="https://formsubmit.co/gmoura96@icloud.com" method="POST">
          <Flex justifyContent="center" alignItems="center" marginX={5} marginBottom={7}>
            <InputGroup>
              <Input
                borderRadius="8px 0px 0px 8px"
                _focus={{ boxShadow: "none" }}
                placeholder="Email"
                name="Email"
              />
              <InputLeftElement>
                <FaRegEnvelope />
              </InputLeftElement>
            </InputGroup>
            <Button
              type="submit"
              paddingX={7}
              variant="solid"
              size="md"
              borderRadius="0px 8px 8px 0px"
              color="white"
              bg="gray.700"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.700" }}
              _focus={{ boxShadow: "0 0 1px 2px black, 0 1px 1px rgba(0, 0, 0, .15)" }}
            >
              Se inscrever
            </Button>
          </Flex>
        </form>
        <Flex marginTop={4} justifyContent="center" alignItems="center" width="100%" bg="gray.100" paddingY={4}>
          <a href="mailto:gmoura96@icloud.com">
            <IconFooter icon={<FaRegEnvelope />} />
          </a>
          <a href="https://instagram.com">
            <IconFooter icon={<FaInstagram />} mx="3" />
          </a>
          <a href="https://www.linkedin.com/in/gabrielblx32/">
            <IconFooter icon={<FaLinkedin />} />
          </a>
        </Flex>
        <Flex bg="gray.700" color="white" w="100%" justifyContent="center" paddingY={3}>
          <Text fontWeight="thin" fontSize="15px">&copy; 2023 Gabriel Moura</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;