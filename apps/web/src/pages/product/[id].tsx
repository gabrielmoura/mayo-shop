import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Center, Grid, Image, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Api from "../../util/Api";
import ProductImage from "../../components/Product/ProductImage";
import ProductInfo from "../../components/Product/ProductInfo";
import { Product } from "../../components/Product/typeProducts";


const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const responsiveGrid = useBreakpointValue({ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" });
  const responsiveHeight = useBreakpointValue({ base: "1550px", sm: "1450px", md: "90vh" });
  const {
    data: product,
    isLoading
  } = useQuery(["product", { id }], async (): Promise<Product> => (await Api.get(`/v1/product/${id}`)).data, {});
  return (
    <>
      <Head>
        <title>{product?.name}</title>
        <meta name="description" content={product?.description} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content="Shop Desafio" />
        <meta property="og:title" content={product?.name} />
        <meta property="og:og:description" content={product?.description} />
        <meta property="og:image" content={product?.img} />
      </Head>
      <Box bg="gray.50" w="100%" h={responsiveHeight} paddingY={50} paddingX={5}>
        <Center>
          <Box width={700}>
            <Grid templateColumns={responsiveGrid} gap="30px">
              {!isLoading ? (
                <>
                  <Box bg="white" shadow="md" borderRadius="5px">
                    <Center>
                      {product?.album?.length === 0 ? (
                        <Image src={product.img} width={350} height={390} alt={`image-${product.name}`} />
                      ) : <ProductImage album={product?.album} />}

                    </Center>
                  </Box>
                  <Box marginX={4}>
                    <ProductInfo
                      product={product as Product}
                    />
                  </Box>
                </>
              ) : null}
            </Grid>
          </Box>
        </Center>
      </Box>

    </>

  );
};

export default Product;