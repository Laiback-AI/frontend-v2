import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    error: string;
    title?: string;
}

export const ErrorModal = ({
    isOpen,
    onClose,
    error,
    title = "Error"
}: ErrorModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="top"
            size="sm"
            classNames={{
                backdrop: "bg-background/50 backdrop-opacity-40",
                base: "border border-secondary-200 bg-background dark:bg-background shadow-small dark:shadow-large",
                header: "border-b-[1px] border-secondary-200",
                body: "text-foreground",
                footer: "border-t-[1px] border-secondary-200",
                closeButton: "hover:bg-secondary-100 active:bg-secondary-200",
                wrapper: "shadow-small dark:shadow-large",
            }}
        >
            <ModalContent className="dark:border-secondary-100">
                <ModalHeader className="flex flex-col gap-1 text-danger">
                    {title}
                </ModalHeader>
                <ModalBody>
                    <p className="text-foreground">{error}</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        className="font-medium"
                        radius="sm"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}; 