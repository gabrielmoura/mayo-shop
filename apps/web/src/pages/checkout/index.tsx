import { Center, Divider, Heading, Stack } from "@chakra-ui/react";
import { PaymentForm } from "../../components/Cart2/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartOrderSummary } from "../../components/Cart/CartOrderSummary";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "123");
const ProductPage = () => (
  <Center h="100vh">
    <Stack isInline w="900px" spacing="4">
      <Stack flexGrow={1} rounded="md" boxShadow="md">
        <CartOrderSummary />
      </Stack>
      <Stack
        alignSelf="baseline"
        rounded="md"
        boxShadow="md"
        flex="0 0 66%"
      >
        <Heading p="2" size="lg" textAlign="center">
          Pagar com cartão de crédito
        </Heading>
        <Divider />
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Stack>
    </Stack>
  </Center>
);

export default ProductPage;
