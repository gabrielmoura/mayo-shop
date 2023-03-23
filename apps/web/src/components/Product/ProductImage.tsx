import { Center, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductImage = ({ album }: { album?: string[] }) => {
  return (

    <Tabs defaultIndex={1} variant="enclosed">
      <TabPanels>
        {album?.map((img, index) => {
          return (
            <TabPanel key={index}>
              <InnerImageZoom src={img} width={350}  />
            </TabPanel>
          );
        })
        }
      </TabPanels>
      <Center>
        <TabList>
          {album?.map((img, index) => {
            return (
              <Tab key={index}>
                <Image src={img} width={40} alt={`image-${index}`} />
              </Tab>
            );
          })
          }
        </TabList>
      </Center>
    </Tabs>

  );
};

export default ProductImage;