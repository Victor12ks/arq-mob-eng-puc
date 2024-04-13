import React from "react";
import { Button, HStack, Heading, Spacer, Text, VStack } from "native-base";
import { ExcluirItemDialogProps } from "../../types/dialog";

export const ExcluirItemDialog: React.FC<ExcluirItemDialogProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  userName,
}) => {
  if (!isVisible) return null;
  return (
    <VStack bg={"#FAFFF5"} p={7} space={2}>
      <Heading size="md">Deseja excluir o usuário {userName} ?</Heading>
      <HStack space={2} justifyContent="center">
        <Button
          rounded="md"
          shadow={3}
          h={20}
          w={150}
          bgColor={"#146551"}
          onPress={onCancel}
        >
          Cancelar
        </Button>
        <Button
          rounded="md"
          shadow={3}
          h={20}
          w={150}
          bgColor={"#388C77"}
          onPress={onConfirm}
        >
          Confirmar
        </Button>
      </HStack>
    </VStack>
  );
};
