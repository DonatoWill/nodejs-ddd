export default class Address {

    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: number, city: string, zip: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._zip = zip;
    }

    get street() { return this._street; }

    get number() { return this._number;}

    get zip() { return this._zip; }

    get city() { return this._city; }

}