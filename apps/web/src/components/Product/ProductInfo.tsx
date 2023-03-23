import { Badge, Box, Button, Divider, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { Product } from "./typeProducts";
import { CartContext } from "../../context/CartProvider";
import { formatPrice } from "../Cart/PriceTag";


const ProductInfo = ({ product }: { product: Product }) => {
  const responsiveButtonWidth = useBreakpointValue({ base: "303px", sm: "668px", md: "303px" });
  const { addItem } = useContext(CartContext);

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="flex-start">
      <Box paddingTop={2}>
        <Heading>
          {product?.name}
        </Heading>
        <Text color="gray.500" fontSize="21px">
          {formatPrice(product.price)}
        </Text>
      </Box>
      <Text marginTop="3">
        {product?.description}
      </Text>
      {/*<Text marginTop={3}>*/}
      {/*    Material: {product?.material}*/}
      {/*</Text>*/}
      <Box marginTop={3} marginBottom={5}>
        <Text display="inline-block">
          Tamanhos: <Text display="inline-block">
          {product?.size?.map((size, index) => {
            return <Badge margin={1} key={index}>{size} </Badge>;
          })} </Text>
        </Text>
      </Box>
      <Divider />

      <Button width="1000px" maxWidth={responsiveButtonWidth} marginY={5} leftIcon={<FaShoppingCart />}
              onClick={() => addItem({ quantity: 1, product: product as Product })}
      >
        Adicionar ao carrinho
      </Button>

    </Flex>
  );
};

export default ProductInfo;