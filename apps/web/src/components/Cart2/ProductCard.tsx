import {
  AspectRatio,
  Box,
  Button,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { FavouriteButton } from "./FavouriteButton";


import { PriceTag } from "../Cart/PriceTag";
import { Product } from "../Product/typeProducts";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

interface Props {
  product: Product;
  rootProps?: StackProps;
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props;
  const { name, img: imageUrl, price } = product;
  const { addItem } = useContext(CartContext);
  return (
    <Stack spacing={{ base: "4", md: "5" }} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={imageUrl}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: "md", md: "xl" }}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="4"
          right="4"
          aria-label={`Add ${name} to your favourites`}
        />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue("gray.700", "gray.400")}>
            {name}
          </Text>
          <PriceTag price={price} currency="BRL" />
        </Stack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue" width="full"
                onClick={() => addItem({
                  quantity: 1,
                  product: product
                })}
        >
          Adicionar ao carrinho
        </Button>
        <Link
          color={useColorModeValue("gray.600", "gray.400")}
          href={`/product/${product.id}`}
        >
          Ver detalhes
        </Link>
      </Stack>
    </Stack>
  );
};