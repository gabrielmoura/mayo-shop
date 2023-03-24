import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  ScaleFade,
  Spinner,
  Stack,
  useToast
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";
import { FiCreditCard, FiMail, FiUser } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CartContext } from "../../context/CartProvider";
import { formatPrice } from "../Cart/PriceTag";
import { StripeCardElement } from "@stripe/stripe-js/types/stripe-js/elements";

export const PaymentForm = (): JSX.Element => {

  const { total } = useContext(CartContext);
  // Some UI state => Ignore for now

  const toast = useToast({
    position: "top",
    isClosable: true,
    duration: 3000
  });


  // Simple cardError state to show error from stripe card element
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  // Init stripe and do some magic here
  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement(CardElement);

  const createPaymentIntent = async () => {
    const res = await fetch("/api/secret", {
      method: "POST",
      body: JSON.stringify({
        amount: 725.22 * 100
      })
    });
    const { clientSecret: clientSecretRes } = await res.json();
    setClientSecret(clientSecretRes);
  };

  const handleSubmit = async (values: FormikValues) => {
    if (!stripe || !elements || cardError || !clientSecret) {
      return;
    }

    try {
      const {
        error: stripeError,
        paymentIntent
      } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card:card as StripeCardElement,
          billing_details: {
            name: values.name
          }
        }
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      } else if (paymentIntent?.status === "succeeded") {
        toast({
          title: "Payment Successfully Received",
          status: "success"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error Occurred",
        description: error.message,
        status: "error"
      });
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <Box p="2" px="4">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          name: ""
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Stack pb="3" spacing={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiMail />
                </InputLeftElement>
                <Input
                  value={values.email}
                  onChange={({ target: { value } }) => {
                    setFieldValue("email", value);
                  }}
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  required
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiUser />
                </InputLeftElement>
                <Input
                  value={values.name}
                  onChange={({ target: { value } }) => {
                    setFieldValue("name", value);
                  }}
                  id="name"
                  placeholder="Name on card"
                  name="name"
                  required
                />
              </InputGroup>

              <Box
                rounded="md"
                border="1px solid"
                borderColor="inherit"
                display="flex"
                h="10"
              >
                {!!stripe && !!elements ? (
                  <CardElement
                    onChange={(e) => {
                      setCardError(e.error?.message ?? "");
                    }}
                  />
                ) : (
                  <Center w="100%">
                    <Spinner />
                  </Center>
                )}
              </Box>
              <ScaleFade in={!!cardError} unmountOnExit>
                <Alert status="error">
                  <AlertIcon />
                  {cardError}
                </Alert>
              </ScaleFade>
              <Button
                type="submit"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<FiCreditCard />}
              >
                Pagar {formatPrice(total, { currency: "BRL" })}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
