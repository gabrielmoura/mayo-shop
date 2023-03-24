import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import Api from "../util/Api";

export default function SimpleCard() {

  const router = useRouter();

  const contact = useMutation(async (data: object) => await Api.post("/login", data), {
    onSuccess: () => {
      // alert("Mensagem enviada com sucesso!");
      //Logica de login vinda de um contexto.
      return router.push("/dashboard");
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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Faça login para continuar</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}>
                  <Checkbox>Lembrar acesso</Checkbox>
                  <Link color={"blue.400"}>Esqueceu a senha?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  type={"submit"}
                  _hover={{
                    bg: "blue.500"
                  }}>
                  Entrar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}