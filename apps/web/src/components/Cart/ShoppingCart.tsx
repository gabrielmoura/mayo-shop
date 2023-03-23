import React, { useContext } from "react";
import {
  Badge,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CartContext } from "../../context/CartProvider";
import { formatPrice } from "./PriceTag";
import { CartOrderSummary } from "./CartOrderSummary";

function CartIconButton({ total }: { total: number }) {
  return (<>
    <AiOutlineShoppingCart />
    <Badge>{total}</Badge>
  </>);
}

const ShoppingCart = () => {
  const { items, addItem, removeItem, cart, totalItems } = useContext(CartContext);

  return (
    <>
      <IconButton aria-label="Menu" icon={<CartIconButton total={totalItems} />} onClick={cart.onOpen} />
      <Drawer placement="right" onClose={cart.onClose} isOpen={cart.isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent bg="gray.50">
          <DrawerHeader borderBottomWidth="1px">
            <Center>
              <Image src="/next.svg" alt='logo' />
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th isNumeric>Qantidade</Th>
                    <Th>Imagem</Th>
                    <Th>Nome</Th>
                    <Th isNumeric>Preço</Th>
                    <Th>Açao</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map(item => (
                    <Tr key={item.product.id}>
                      <Td isNumeric>{item.quantity}</Td>
                      <Td>
                        <Image src={item.product.img} width={50} height={50} alt={item.product.name} />
                      </Td>
                      <Td>{item.product.name}</Td>
                      <Td isNumeric>{formatPrice(item.product.price)}</Td>
                      <Td>
                        <IconButton aria-label="Menu" icon={<FaChevronUp />}
                                    onClick={() => addItem({
                                      quantity: 1,
                                      product: item.product
                                    })} />
                        <IconButton aria-label="Menu" icon={<FaChevronDown />}
                                    onClick={() => removeItem({
                                      quantity: 1,
                                      product: item.product
                                    })} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <CartOrderSummary />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCart;