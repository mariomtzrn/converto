import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

import { baseButton } from "@/assets/styles";

interface Props {
  actionAccept: () => void;
  actionReject?: () => void;
  message: string;
  status: boolean;
  title: string;
}

export default function DialogMessage({
  actionAccept,
  actionReject,
  message,
  status,
  title,
}: Props) {
  return (
    <Dialog.Root
      lazyMount
      motionPreset="slide-in-bottom"
      open={status}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            maxWidth={{
              base: "360px",
              md: "500px",
            }}
          >
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{message}</Dialog.Body>
            <Dialog.Footer>
              {actionReject && (
                <Dialog.ActionTrigger asChild>
                  <Button onClick={actionReject} variant="outline">
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
              )}
              <Button
                {...baseButton.base}
                _active={baseButton.active}
                _hover={baseButton.hover}
                maxW="80px"
                onClick={actionAccept}
              >
                Accept
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
