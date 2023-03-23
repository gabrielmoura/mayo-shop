import {Box, Flex, IconButton, Image, Spacer, useBreakpointValue, useMediaQuery} from "@chakra-ui/react"
import {FaPhoneAlt, FaUserAlt} from "react-icons/fa"
import Link from 'next/link'
import ShoppingCart from "./Cart/ShoppingCart";

const Navigation = () => {
    const [phoneSize] = useMediaQuery("(max-width: 500px)")
    const btnDisplay = useBreakpointValue({base: "none", md: "inline-flex"})

    return (
        <Box
            paddingX={10}
            paddingY={5}
            position="sticky"
            top="0"
            bg="white"
            zIndex={10}
            w="100%"
        >

            <Flex justifyContent="center">
                <Link href="/">
                    <Image src="/next.svg"
                           width={phoneSize ? "60px" : "90px"} alt={`logo`}/>
                </Link>
                <Spacer/>
                <Box>
                    <Link href="/contact">
                        <IconButton display={btnDisplay} aria-label="Contact Us" icon={<FaPhoneAlt fontSize="13px"/>}
                                    marginRight={2} variant="ghost"/>
                    </Link>
                    <Link href="/login">
                        <IconButton display={btnDisplay} aria-label="Login" icon={<FaUserAlt fontSize="13px"/>}
                                    marginRight={2} variant="ghost"/>
                    </Link>
                    <ShoppingCart/>
                </Box>
            </Flex>
        </Box>
    )
}

export default Navigation