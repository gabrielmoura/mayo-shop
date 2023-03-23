import {
    Box,
    Heading,
    Text,
    Image,
    Flex,
} from "@chakra-ui/react"


const ItemBox = ({ img, name, price,description }:{img:string,name:string,price:number,description:string}) => {

    return (
        <Box w="255px"  bg="white" shadow="md" borderRadius={9} padding={4} marginTop={50}>
            <Flex flexDir="column" alignItems="center" justifyContent="center" position="relative">
                <Image
                    alt={name}
                    src={img}
                    width="230px"
                    height="334px"
                    borderRadius={7}
                    shadow="md"
                    position="absolute"
                    top="-50px"
                />
                <Heading size="md" marginTop="300px">
                    {name}
                </Heading>
                <Text>
                    {description}
                </Text>
                <Text color="#6a6a6a">
                    R${price}
                </Text>
            </Flex>
        </Box>
    )
}

export default ItemBox