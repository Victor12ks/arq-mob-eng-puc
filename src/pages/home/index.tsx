import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Text, Box } from "native-base";
import { FormProps } from "../../types/form";
import { Card } from "../../components/card";
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "../../components/input";

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
  const [filtedData, setFiltedData] = useState<FormProps[]>([]);
  async function handlerFetchData() {
    try {
      const responseData = await AsyncStorage.getItem("@crud_form:usuario2");
      const dbData = responseData ? JSON.parse(responseData) : [];
      setData(dbData);
      setFiltedData(dbData);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }

  const handlerSearche = (name: string) => {
    if (name?.length > 3) {
      setFiltedData(
        data.filter(
          (x) => x.firstName.includes(name) || x.lastName.includes(name)
        )
      );
    } else setFiltedData(data);
  };

  const handlerEdit = (id: string) => {
    navigation.navigate("User", { id: id });
  };

  return (
    <Box pt={5} flex={1}>
      <Input placeholder="Buscar por nome..." onChangeText={handlerSearche} />
      {filtedData?.length <= 0 && (
        <Text>
          Não foi localizado nenhum registro para os parâmetros informado.
        </Text>
      )}
      <FlatList
        data={filtedData}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handlerEdit(item.id)} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
