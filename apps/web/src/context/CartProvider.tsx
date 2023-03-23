import * as React from "react";

import {useDisclosure} from "@chakra-ui/react";
import {Product} from "../components/Product/typeProducts";

interface Item {
  quantity: number;
  product: Product;
}

interface CartContextType {
  total: number;
  items: Item[];
  totalItems: number;
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  cart: ReturnType<typeof useDisclosure>;
}


export let CartContext = React.createContext<CartContextType>(null!);

CartContext.displayName = "CartContext";

export function CartProvider({children}: { children: React.ReactNode }) {
  const [total, setTotal] = React.useState(0);
  const [items, setItems] = React.useState<Item[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const cart = useDisclosure()

  const addItem = (item: Item) => {
    setTotal(total + (item.quantity * item.product.price));
    setTotalItems(totalItems + item.quantity)
    if (items.find(i => i.product.id === item.product.id)) {
      setItems(oldItems => oldItems.map(i => {
        if (i.product.id === item.product.id) {
          return {...i, quantity: i.quantity + item.quantity};
        }
        return i;
      }));
      return;
    } else {
      setItems(oldItems => [...oldItems, item]);
    }

  }
  const removeItem = (item: Item) => {
    setTotalItems(totalItems - item.quantity)
    const itemSelected = items?.find(i => i.product.id === item.product.id);
    // @ts-ignore
    if (itemSelected?.quantity > 1) {
      setTotal(total - (item.quantity * item.product.price));
      if (itemSelected) {
        setItems(oldItems => oldItems.map(i => {
          if (i.product.id === item.product.id) {
            return {...i, quantity: i.quantity - item.quantity};
          }
          return i;
        }));
        return;
      }
    } else {
      setTotal(total - (item.quantity * item.product.price));
      setItems(oldItems => oldItems.filter(i => i.product.id !== item.product.id));
    }
  }

  let value = {total, items, totalItems, addItem, removeItem, cart};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}