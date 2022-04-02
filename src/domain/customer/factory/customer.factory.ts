import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {

    static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    static createWithAddress(name: string, addres: Address): Customer{
        let customer = new Customer(uuid(), name);
        customer.address = addres;
        return customer;
    }
}