import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Center, HStack, Heading, Modal, VStack } from "native-base";
import { Input } from "../../components/input/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/button/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-tiny-toast";
import uuid from "react-native-uuid";
import { FormProps } from "../../types/form";
import { schemaRegister } from "./util";
import { AddressService } from "../../services/address";
import Address from "../../models/address";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ExcluirItemDialog } from "../../components/dialog";
import { UserRootProp } from "../../types/user";

export const User = ({ route, navigation }: UserRootProp) => {
  const [editingId, setEditingId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState<Address>();
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormProps>({
    resolver: yupResolver(schemaRegister) as any,
  });
  const handlerGetAddress = async () => {
    try {
      if (!postalCode) return;
      const address = await AddressService.getAddress(postalCode);
      if (address) {
        setAddress(address);
        setValue("city", address.city);
        setValue("district", address.district);
        setValue("postalCode", address.postalCode);
        setValue("state", address.state);
        setValue("street", address.street);
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  const showError = (message: string) => {
    Toast.show(message, {
      position: Toast.position.CENTER,
      containerStyle: { backgroundColor: "#8FC1B5" },
      textStyle: {},
      imgStyle: {},
      mask: true,
      maskStyle: {},
      textColor: "white",
    });
  };

  const goHome = () => {
    setshowDeleteDialog(false);
    setLoading(false);
    setSearching(false);
    setPostalCode("");
    setEditingId("");
    reset();
    setAddress(undefined);
    navigation.navigate("Home");
  };

  const handlerRegister = async (data: FormProps) => {
    data.id = uuid.v4().toString();
    try {
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario2");
      const dbData = reponseData ? JSON.parse(reponseData!) : [];
      const previewData = [...dbData, data];
      await AsyncStorage.setItem(
        "@crud_form:usuario2",
        JSON.stringify(previewData)
      );
      Toast.showSuccess("Usuário registrado com sucesso");
      goHome();
    } catch (error: any) {
      showError(error?.message);
    }
  };

  async function handlerSearcherUser(id: string) {
    try {
      setLoading(true);
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario2");
      const dbData: FormProps[] = reponseData ? JSON.parse(reponseData!) : [];
      const user = dbData.find((u) => u.id == id);
      if (user) {
        setAddress({
          city: user.city,
          district: user.district,
          postalCode: user.postalCode,
          state: user.state,
          street: user.street,
        });
        setPostalCode(user.postalCode);
        setSearching(true);
        Object.keys(user).forEach((key) =>
          setValue(
            key as keyof FormProps,
            user?.[key as keyof FormProps] as string
          )
        );
      }
    } catch (error: any) {
      showError(error?.message);
      goHome();
    } finally {
      setLoading(false);
    }
  }

  const [searching, setSearching] = useState(false);
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const setShowDeleteDialog = (open: boolean) => {
    setshowDeleteDialog(open);
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario2");
      const dbData: FormProps[] = reponseData ? JSON.parse(reponseData!) : [];
      const userIndex = dbData.findIndex((u) => u.id == editingId);
      console.log({ userIndex });
      if (userIndex !== -1) {
        dbData.splice(userIndex, 1);
        await AsyncStorage.setItem(
          "@crud_form:usuario2",
          JSON.stringify(dbData)
        );
        Toast.showSuccess("Usuário atualizado com sucesso");
        goHome();
      }
    } catch (error: any) {
      showError(error?.message);
    }
    setEditingId("");
  };

  const handlerAlterRegister = async (data: FormProps) => {
    try {
      setLoading(true);
      const reponseData = await AsyncStorage.getItem("@crud_form:usuario2");
      const dbData: FormProps[] = reponseData ? JSON.parse(reponseData!) : [];
      const userIndex = dbData.findIndex((u) => u.id == data.id);
      if (userIndex >= 0) {
        dbData.splice(userIndex, 1);
        const previewData = [...dbData, data];
        await AsyncStorage.setItem(
          "@crud_form:usuario2",
          JSON.stringify(previewData)
        );
        Toast.showSuccess("Usuário atualizado com sucesso");
        setSearching(false);
        goHome();
      }
    } catch (error: any) {
      showError(error?.message);
    } finally {
      setLoading(false);
    }
    setEditingId("");
  };

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.id) {
        setEditingId(route?.params?.id);
        setLoading(true);
        handlerSearcherUser(route?.params?.id);
      } else {
        setSearching(false);
        setLoading(false);
        reset();
      }
      resetPostalCode();
      setshowDeleteDialog(false);
    }, [route])
  );

  const resetPostalCode = () => {
    setPostalCode("");
    setValue("postalCode", "");
  };

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <KeyboardAwareScrollView>
      <VStack
        bgColor="gray.300"
        flex={1}
        px={5}
        pb={100}
        backgroundColor="#D9E4DF"
      >
        <Center>
          <Heading my={5} color={"#265C4B"}>
            Cadastrar
          </Heading>
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Primeiro Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.firstName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Segundo Nome"
                onChangeText={onChange}
                errorMessage={errors.lastName?.message}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="postalCode"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="CEP"
                errorMessage={errors.postalCode?.message}
                onChangeText={(value) => setPostalCode(value)}
                onBlur={() => {
                  handlerGetAddress();
                }}
                defaultValue={postalCode}
              />
            )}
          />
          <Controller
            control={control}
            name="street"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Rua"
                onChangeText={onChange}
                errorMessage={errors.street?.message}
                value={value}
                isDisabled={!!address?.street}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Número"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.number?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="district"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Bairro"
                onChangeText={onChange}
                errorMessage={errors.district?.message}
                value={value}
                defaultValue={address?.district}
                isDisabled={!!address?.district}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Cidade"
                onChangeText={onChange}
                errorMessage={errors.city?.message}
                value={value}
                isDisabled={!!address?.city}
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="UF"
                onChangeText={onChange}
                errorMessage={errors.state?.message}
                value={value}
                isDisabled={!!address?.state}
              />
            )}
          />
        </Center>

        {searching ? (
          <VStack>
            <HStack>
              <Button
                rounded="md"
                shadow={3}
                title="Alterar"
                color="#146551"
                onPress={handleSubmit(handlerAlterRegister)}
              />
            </HStack>
            <HStack paddingTop={5}>
              <Button
                rounded="md"
                shadow={3}
                title="Excluir"
                color="#388C77"
                onPress={() => setShowDeleteDialog(true)}
              />
            </HStack>
          </VStack>
        ) : (
          <Button
            title="Salvar"
            color="#146551"
            onPress={handleSubmit(handlerRegister)}
          ></Button>
        )}
      </VStack>
      <Modal isOpen={showDeleteDialog} onClose={!setshowDeleteDialog}>
        <ExcluirItemDialog
          isVisible={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={deleteUser}
          userName={getValues("firstName")}
        ></ExcluirItemDialog>
      </Modal>
    </KeyboardAwareScrollView>
  );
};
