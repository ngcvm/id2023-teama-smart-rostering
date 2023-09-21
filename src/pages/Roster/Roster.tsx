import React, { FunctionComponent, useRef } from "react";
import { BryntumScheduler, BryntumSplitter } from "@bryntum/scheduler-react";
import { useSchedulerConfig } from "../../hooks/useSchedulerConfig";
import {
  AppShell,
  Box,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { AppConfig } from "../../config";
import ImportModal from "../../components/ImportModal";
import { useAppSelector } from "../../hooks/reduxHooks";

const DEFAULT_HEIGHT = 100;

const calulateHeight = (numberOfDepartment: number) => {
  return Math.round(DEFAULT_HEIGHT / numberOfDepartment) + "vh";
};

const Roster: FunctionComponent = () => {
  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const appData = useAppSelector((state) => state.app);
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
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          h={1000}
        />
      </Box>

      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header p={12}>
          <Grid gutter={5}>
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
                  variant="outline"
                  color="secondary"
                  onClick={() => setImportModalOpen(true)}
                >
                  Import data
                </Button>
                <Button
                  disabled={
                    isLoading ||
                    !appData?.operaData ||
                    !appData?.rosterEmployeesData
                  }
                  color="green"
                  onClick={() => handlePopulateRosterWithEmployees()}
                >
                  Populate roster
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </AppShell.Header>

        <AppShell.Main>
          <Box>{schedulers}</Box>
        </AppShell.Main>
      </AppShell>

      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      />
    </>
  );
};

export default Roster;
