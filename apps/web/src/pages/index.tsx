import Head from "next/head";
import { Box, useBreakpointValue } from "@chakra-ui/react";


import { useQuery } from "@tanstack/react-query";
import Api from "../util/Api";


import { ProductGrid } from "../components/Cart2/ProductGrid";
import { ProductCard } from "../components/Cart2/ProductCard";
import { Product } from "../components/Product/typeProducts";


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
      <Box bg="gray.50" w="100%" h={responsiveHeight} paddingY={50} paddingX={5}>
        <Box
          maxW="7xl"
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <ProductGrid>
            {products?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </Box>
      </Box>
    </>
  );
}
