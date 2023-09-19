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
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { AppConfig } from "../../config";

const DEFAULT_HEIGHT = 100;

const calulateHeight = (numberOfDepartment: number) => {
  return Math.round(DEFAULT_HEIGHT / numberOfDepartment) + "vh";
};

const Roster: FunctionComponent = () => {
  const {
    configs: schedulerConfigs,
    populateRosterWithEmployees,
    isLoading,
  } = useSchedulerConfig();
  const schedulerRef = useRef<(BryntumScheduler | null)[]>([]);

  const schedulers = React.useMemo(() => {
    if (schedulerConfigs.length === 0) {
      return null;
    }

    const schedulerHeight = calulateHeight(schedulerConfigs.length ?? 0);

    return schedulerConfigs.map((schedulerConfig, i) => (
      <>
        <Box h={schedulerHeight}>
          <BryntumScheduler
            ref={(el) => (schedulerRef.current[i] = el)}
            {...schedulerConfig}
          />
        </Box>

        <BryntumSplitter />
      </>
    ));
  }, [schedulerConfigs]);

  const handlePopulateRosterWithEmployees = async () => {
    populateRosterWithEmployees();
  };

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={9999}
          radius={"sm"}
          overlayBlur={2}
          h={1000}
        />
      </Box>
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
                    disabled={isLoading}
                    color="green"
                    onClick={() => handlePopulateRosterWithEmployees()}
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
    </>
  );
};

export default Roster;
