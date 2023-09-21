import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Group,
  Modal,
  Space,
  Text,
  rem,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import {
  clearRosterData,
  setOperaFileAction,
  setRosterEmployeesFileAction,
} from "../store/slices/app";
import { useAppDispatch } from "../hooks/reduxHooks";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACCEPT_MIME_TYPES = [MIME_TYPES.csv];

const ImportModal = ({ isOpen, onClose }: ImportModalProps) => {
  const [rosterDataFile, setRosterDataFile] = React.useState<File>();
  const [rosterEmployeeFile, setRosterEmployeeFile] = React.useState<File>();
  const [error, setError] = React.useState<string>();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      setError(undefined);
      await dispatch(setOperaFileAction(rosterDataFile)).unwrap();
      await dispatch(setRosterEmployeesFileAction(rosterEmployeeFile)).unwrap();
      handleCloseModal();
    } catch (err) {
      setError("Failed to import data. Please recheck the size or data format");
      dispatch(clearRosterData());
      setRosterDataFile(undefined);
      setRosterEmployeeFile(undefined);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setRosterDataFile(undefined);
    setRosterEmployeeFile(undefined);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Import roster data">
      <Modal.Body>
        <Box>
          <Dropzone
            onDrop={(files) => setRosterDataFile(files[0])}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={2000000} // 2MB
            accept={ACCEPT_MIME_TYPES}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <Box style={{ textAlign: "center" }}>
                <Text size="xl" inline>
                  Drag your opera data file here
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as single only, and the file should not exceed 2MB
                </Text>
              </Box>
            </Group>
          </Dropzone>
          <Space h={4} />
          {!!rosterDataFile && <Text>{rosterDataFile.name}</Text>}
        </Box>
        <Space h={10} />
        <Box>
          <Dropzone
            onDrop={(files) => setRosterEmployeeFile(files[0])}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2} // 5MB
            accept={ACCEPT_MIME_TYPES}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <Box style={{ textAlign: "center" }}>
                <Text size="xl" inline>
                  Drag your employee data file here
                </Text>
                <Text size="xs">
                  (Temporary Step - Removed when embedded into Ready Work Force)
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as single only, and the file should not exceed 5MB
                </Text>
              </Box>
            </Group>
          </Dropzone>
          <Space h={4} />
          {!!rosterEmployeeFile && <Text>{rosterEmployeeFile.name}</Text>}
        </Box>
        <Space h={10} />

        {!!error && (
          <>
            <Alert color="red" title={error}>
              Failed to parse data
            </Alert>
            <Space h={10} />
          </>
        )}

        <Box>
          <Button
            disabled={!rosterDataFile || !rosterEmployeeFile}
            w={"100%"}
            onClick={() => handleSubmit()}
          >
            Submit and parse data
          </Button>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ImportModal;
