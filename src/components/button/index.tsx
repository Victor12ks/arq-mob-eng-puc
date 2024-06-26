import { Button as ButtonNativeBase, Text } from "native-base";
import { ButtonProps } from "../../types/button";


export function Button({ title, color = "#265C4B", ...res }: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={20}
      bg={color}
      _pressed={{
        bgColor: "#365950",
      }}
      {...res}
    >
      <Text color="white" fontSize={26}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
