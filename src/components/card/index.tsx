import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Box, Text, Stack, Heading } from "native-base";
import { CardProps } from "../../types/card";

export function Card({ data, onPress }: CardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} >
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
          <Stack p="4" space={1}>
            <Stack space={1}>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Heading size="md" ml="-1">
                  {`${data.firstName} ${data.lastName}`}
                </Heading>
                <MaterialCommunityIcons
                  name="account-edit"
                  color={"#888D97"}
                  size={26}
                />
              </Stack>
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
            <Text fontWeight="700">{`${data.street}, ${data.number}  - ${data.district}`}</Text>
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
