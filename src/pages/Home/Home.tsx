import React, { FunctionComponent } from "react";
import { Button, Image, Flex, Box, Space, Title } from "@mantine/core";
import RosterImage from "./roster-image.svg";
import { useNavigate } from "react-router-dom";
import HomeCss from "./Home.module.css";

const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className={HomeCss.home}>
      <Flex justify={"center"} align={"center"} h={1000}>
        <Box>
          <Title order={1}>Smart Rostering</Title>
          <Title order={3}>Efficiently schedule success</Title>
          <Space h="lg" />
          <Button color="green" onClick={() => navigate("/roster")}>
            Get Started
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
