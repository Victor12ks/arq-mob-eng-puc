import Address from "../Models/address";

export class AddressService {
  static async getAddress(postCode: string) {
    if (!postCode) throw new Error("Favor, informe um CEP válido.");
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${postCode}/json/`
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
          "Não foi encontrado nenhum endereço para o CEP informado."
        );
      }
    } catch (error) {
      throw new Error(
        "Ops, ocorreu um erro ao buscar o CEP, tente novamente em instantes..."
      );
    }
  }
}
