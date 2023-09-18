import React, { FunctionComponent, useRef } from "react";
import { BryntumScheduler, BryntumSplitter } from "@bryntum/scheduler-react";
import { useSchedulerConfig } from "../../SchedulerConfig";
import {
  AppShell,
  Box,
  Button,
  Flex,
  Grid,
  Header,
  Space,
  Text,
} from "@mantine/core";
import { AppConfig } from "../../config";

const Roster: FunctionComponent = () => {
  const schedulerConfigs = useSchedulerConfig();
  const scheduler = useRef<(BryntumScheduler | null)[]>([]);

  const schedulers = React.useMemo(() => {
    return schedulerConfigs.map((schedulerConfig, i) => (
      <>
        <Box h="40vh">
          <BryntumScheduler
            ref={(el) => (scheduler.current[i] = el)}
            {...schedulerConfig}
          />
        </Box>

        <BryntumSplitter />
      </>
    ));
  }, [schedulerConfigs]);

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
            <Grid.Col span={8}>
              <Box>
                <Text size={"lg"}>{AppConfig.orgName}</Text>
              </Box>
            </Grid.Col>

            <Grid.Col span={4}>
              <Flex
                mih={50}
                gap="md"
                justify="flex-end"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <Button
                  onClick={() =>
                    console.log("Get employees that match requirements")
                  }
                >
                  Get employees
                </Button>
                <Space w="md" />
                <Button
                  variant="outline"
                  onClick={() => console.log("Populate roster with employees")}
                >
                  Populate roster
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </Header>
      }
    >
      <Box>{schedulers}</Box>
    </AppShell>
  );
};

export default Roster;
