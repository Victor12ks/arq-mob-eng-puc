export default class Address {
  postalCode: string;
  street: string;
  district: string;
  city: string;
  state: string;

  constructor(
    postalCode: string,
    street: string,
    district: string,
    city: string,
    state: string
  ) {
    this.postalCode = postalCode;
    this.city = city;
    this.state = state;
    this.district = district;
    this.street = street;
  }
}
