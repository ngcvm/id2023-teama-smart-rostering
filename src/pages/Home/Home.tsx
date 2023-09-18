import React, { FunctionComponent } from "react";
import { Button, Text, Image, Flex, Box, Space } from "@mantine/core";
import RosterImage from "./roster-image.svg";
import { useNavigate } from "react-router-dom";
import HomeCss from "./Home.module.css";

const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className={HomeCss.home}>
      <Flex justify={"center"} align={"center"} mih={1000}>
        <Box>
          <Text size={70}>Smart Rostering</Text>
          <Text size={30}>Efficiently schedule success</Text>
          <Space h="lg" />
          <Button color="green" onClick={() => navigate("/roster")}>
            Import
          </Button>
        </Box>

        <Box className={HomeCss.imageContainer}>
          <Image src={RosterImage} />
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
