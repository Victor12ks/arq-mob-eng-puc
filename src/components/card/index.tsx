import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { style } from "./style";
import { FormProps } from "../../types/form";
import { number } from "yup";

type Props = {
  data: FormProps;
  onPress: () => void;
};

export function Card({ data, onPress }: Props) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  function togglePasswordIsVisible() {
    setPasswordIsVisible((prevState) => !prevState);
  }

  return (
    <View style={style.container}>
      <View style={style.content}>
        <View>
          <View style={style.row}>
            <Text style={style.name}>
              Nome:{`${data.firstName} ${data.lastName}`}
            </Text>
            <Text style={style.phone}>Telefone:{data.phone}</Text>
          </View>

          <View style={style.row}>
            <Text style={style.name}>
              Endereço:{`${data.street} ${data.number}`}
            </Text>
            <Text style={style.phone}>CIdade:{data.city}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={style.button} onPress={onPress}>
        <MaterialCommunityIcons
          name="account-edit"
          color={"#888D97"}
          size={26}
        />
      </TouchableOpacity>
    </View>
  );
}
