import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { BsGithub, BsLinkedin, BsPerson, BsTelegram } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Api from "../util/Api";


export default function ContactFormWithSocialButtons() {
  const { hasCopied, onCopy } = useClipboard("gmoura96@icloud.com");
  const router = useRouter();

  const contact = useMutation(async (data: object) => await Api.post("/contact", data), {
    onSuccess: () => {
      // alert("Mensagem enviada com sucesso!");
      return router.push("/");
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    // @ts-ignore
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    contact.mutate(value);
  }

  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      align="center"
      justify="center"
      css={{
        backgroundAttachment: "fixed"
      }}
      id="contact">
      <Box
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}>
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: "4xl",
                md: "5xl"
              }}>
              Entrar em contato
            </Heading>

            <Stack
              spacing={{ base: 4, md: 8, lg: 20 }}
              direction={{ base: "column", md: "row" }}>
              <Stack
                align="center"
                justify="space-around"
                direction={{ base: "row", md: "column" }}>
                <Tooltip
                  label={hasCopied ? "Email Copied!" : "Copy Email"}
                  closeOnClick={false}
                  hasArrow>
                  <IconButton
                    aria-label="email"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<MdEmail />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700")
                    }}
                    onClick={onCopy}
                    isRound
                  />
                </Tooltip>

                <Link href="https://github.com/gabrielmoura">
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<BsGithub />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700")
                    }}
                    isRound
                  />
                </Link>

                <Link href="https://t.me/gmoura96">
                  <IconButton
                    aria-label="twitter"
                    variant="ghost"
                    size="lg"
                    icon={<BsTelegram size="28px" />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700")
                    }}
                    isRound
                  />
                </Link>

                <Link href="https://www.linkedin.com/in/gabrielblx32/">
                  <IconButton
                    aria-label="linkedin"
                    variant="ghost"
                    size="lg"
                    icon={<BsLinkedin size="28px" />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700")
                    }}
                    isRound
                  />
                </Link>
              </Stack>
              <form onSubmit={handleSubmit}>
                <Box
                  bg={useColorModeValue("white", "gray.700")}
                  borderRadius="lg"
                  p={8}
                  color={useColorModeValue("gray.700", "whiteAlpha.900")}
                  shadow="base">
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel>Nome</FormLabel>

                      <InputGroup>
                        <InputLeftElement>
                          <BsPerson />
                        </InputLeftElement>
                        <Input type="text" name="name" placeholder="Seu nome" />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>

                      <InputGroup>
                        <InputLeftElement>
                          <MdOutlineEmail />
                        </InputLeftElement>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>

                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      type={"submit"}
                      _hover={{
                        bg: "blue.500"
                      }}>
                      Enviar Mensagem
                    </Button>
                  </VStack>
                </Box>
              </form>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}