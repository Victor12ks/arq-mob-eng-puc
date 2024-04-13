import Address from "../models/address";

export class AddressService {
  static async getAddress(postalCode: string) {
    var value = postalCode.replace(/[^0-9]/g, "");
    if (!value || value.length != 8)
      throw new Error("Favor, informe um CEP válido");
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${postalCode}/json/`
      );
      const data = await response.json();
      if (!data.erro) {
        const address = new Address(
          data.cep,
          data.logradouro,
          data.bairro,
          data.localidade,
          data.uf
        );
        return address;
      } else {
        throw new Error(
          "Não foi encontrado nenhum endereço para o CEP informado"
        );
      }
    } catch (error: any) {
      if (error?.message) throw new Error(error?.message);
      throw new Error(error);
    }
  }
}
