import Head from "next/head";
import { Box, Flex, Grid, Skeleton, Spinner, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "@prisma/client";
import { Heading, Text } from "@chakra-ui/layout";
import { useQuery } from "@tanstack/react-query";
import Api from "../util/Api";
import ItemBox from "../components/Product/ItemBox";

export default function Home() {
  const responsiveGrid = useBreakpointValue({ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" });
  const responsiveHeight = useBreakpointValue({ base: "1500px", sm: "1000px", md: "89vh" });

  const {
    data: products,
    isLoading
  } = useQuery(["products"], async (): Promise<{ data: Product[] }> => (await Api.get("/v1/product")).data, {});
  return (
    <>
      <Head>
        <title>Shop Desafio</title>
        <meta name="description" content="Shop Desafio é um shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box marginBottom={5} width="100%" h={responsiveHeight} bg="gray.50" paddingY={7}>
        <Flex flexDir="column" alignItems="center" justifyContent="center" w="100%">
          <Box marginBottom={6}>
            <Flex width="100%" flexDir="column" justifyContent="center" alignItems="center">
              <Heading marginBottom={2} size="lg">Bolos e Tortas</Heading>
              <Text maxW="500px" marginX={5} align="center">
                Bolos e tortas feitos com muito amor e carinho para você e sua família.
              </Text>
            </Flex>
          </Box>
          <Grid h="auto" templateColumns={responsiveGrid} gap="30px">
            {!isLoading ? products?.data?.map((product) => (
              <Skeleton key={product.id} isLoaded={!isLoading}>
                <Link href={product.link}>
                  <ItemBox
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                  />
                </Link>
              </Skeleton>
            )) : <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />}
          </Grid>
        </Flex>
      </Box>

    </>
  );
}
