import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/button";
import {
  Text,
  Box,
  FlatList,
  HStack,
  Heading,
  Spacer,
  VStack,
  View,
  ScrollView,
} from "native-base";
import { FormProps } from "../../types/form";
import { Card } from "../../components/card";
import { style } from "./style";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
};

export const Home = ({ navigation }: Props) => {
  // const [data, setData] = useState([] as Array<FormProps>);

  // async function handlerRegister() {
  //   const reponseData = await AsyncStorage.getItem("@crud_form:usuario2");
  //   const dbData = reponseData ? JSON.parse(reponseData!) : [];
  //   setData(dbData);
  // }
  // useEffect(() => {
  //   handlerRegister;
  // }, []);

  // const dados = [
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  //   {
  //     city: "Araguaina",
  //     district: "Centro",
  //     email: "joao@gmail.com",
  //     phone: "31984919881",
  //     firstName: "Joao",
  //     lastName: "Victor",
  //     id: "dasdas",
  //     number: "1302",
  //     postalCode: "30412-032",
  //     state: "TO",
  //     street: "Dona Luci",
  //   },
  // ];

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
      console.log(dbData);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }

  const handlerEdit = (id: string) => {
    navigation.navigate("User", { id: id });
  };

  return (
    <View style={style.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={style.list}
        contentContainerStyle={style.listContent}
        renderItem={({ item }) => (
          <Card data={item} onPress={() => handlerEdit(item.id)} />
        )}
      />
    </View>
  );

  // return (
  //   <View style={style.container}>
  //     <ScrollView style={style.scrollView}>
  //       {data?.map((item) => {
  //         return <Card onPress={() => console.log()} data={item}></Card>;
  //       })}
  //     </ScrollView>
  //   </View>
  // );
};
//   return (
//     <Box>
//       <Heading my={5} color={"#265C4B"}>
//         Usuários
//       </Heading>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <Box
//             borderBottomWidth="1"
//             _dark={{
//               borderColor: "muted.50",
//             }}
//             borderColor="muted.800"
//             pl={["0", "4"]}
//             pr={["0", "5"]}
//             py="2"
//           >
//             <HStack space={[2, 3]} justifyContent="space-between">
//               <VStack>
//                 <Text
//                   _dark={{
//                     color: "warmGray.50",
//                   }}
//                   color="coolGray.800"
//                   bold
//                 >
//                   {item?.firstName}
//                 </Text>
//                 <Text
//                   color="coolGray.600"
//                   _dark={{
//                     color: "warmGray.200",
//                   }}
//                 >
//                   {item?.email}
//                 </Text>
//               </VStack>
//               <Spacer />
//             </HStack>
//           </Box>
//         )}
//       />
//       <Button title="Salvar" onPress={handlerRegister}></Button>
//     </Box>
//   );
// };
