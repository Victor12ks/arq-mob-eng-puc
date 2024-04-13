import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Box, Text, Center, Stack, Heading } from "native-base";
import { CardProps } from "../../types/card";

export function Card({ data, onPress }: CardProps) {
  return (
    <Box alignItems="center" pb={2}>
      <Box
        minWidth="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            PHOTOS
          </Center>
        </Box>

        <Stack p="4" space={1}>
          <Stack space={1}>
            <Heading size="md" ml="-1">
              {`${data.firstName} ${data.lastName}`}{" "}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml=".5"
              mt="-1"
            >
              {data.city}
            </Text>
          </Stack>
          <Text fontWeight="00">{`${data.street}, ${data.number}  - ${data.district}`}</Text>
          <Stack space={1} justifyContent="flex-end" pl={5}>
            <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons
                name="account-edit"
                color={"#888D97"}
                size={26}
              />
            </TouchableOpacity>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
