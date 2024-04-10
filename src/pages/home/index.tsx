import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, View, ScrollView, VStack, HStack, Box } from "native-base";
import { FormProps } from "../../types/form";
import { Card } from "../../components/card";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
};

export const Home = ({ navigation }: Props) => {
  useFocusEffect(
    useCallback(() => {
      handlerFetchData();
    }, [])
  );

  const [data, setData] = useState<FormProps[]>([]);
  async function handlerFetchData() {
    try {
      const responseData = await AsyncStorage.getItem("@crud_form:usuario2");
      const dbData = responseData ? JSON.parse(responseData) : [];
      setData(dbData);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }

  const handlerEdit = (id: string) => {
    navigation.navigate("User", { id: id });
  };

  return (
    <Box pt={5} flex={1}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handlerEdit(item.id)} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
