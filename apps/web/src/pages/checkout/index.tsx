import {Box, useBreakpointValue} from "@chakra-ui/react";
import Head from "next/head";
import {useContext} from "react";
import { CartContext } from "../../context/CartProvider";


export default function Checkout() {
    const responsiveHeight = useBreakpointValue({base: "1550px", sm: "1450px", md: "90vh"})
    const {total} = useContext(CartContext)
    return (
        <>
            <Head>
                <title>Shop Desafio</title>
                <meta name="description" content="Shop Desafio é um shop"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Box bg="gray.50" w="100%" h={responsiveHeight} paddingY={50} paddingX={5}>
                <h1>Checkout</h1>
                <p>Produto</p>
            </Box>
        </>
    )
}