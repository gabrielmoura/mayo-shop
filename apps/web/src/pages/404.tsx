import {Box, Center, Container, useBreakpointValue} from "@chakra-ui/react";
import style from '@/styles/404.module.css'
import Link from "next/link";

export default function Page404() {
  const responsiveHeight = useBreakpointValue({base: "1550px", sm: "1450px", md: "90vh"})

  return (
    <Box bg="gray.50" w="100%" h={responsiveHeight} paddingY={50} paddingX={5}>
      <section className={style.page_404}>
        <Container>
          <div>
            <div className={style.four_zero_four_bg}>
              <Center>
                <h1>404</h1>
              </Center>
            </div>

            <div className={style.contant_box_404}>
              <h2>
                Parece que você está perdido
              </h2>

              <p>a página que você está procurando não está disponível!</p>
              <Center>
                <Link href='/' className={style.link_404}>Ir para Inicio</Link>
              </Center>
            </div>
          </div>
        </Container>
      </section>
    </Box>
  )
}