import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a customer", () => {

        const customer = CustomerFactory.create("Customer A");
    
        expect(customer).toBeDefined();
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.address).toBeUndefined();
    
    });

    it("it shouldcreate a customer with an address", () => {

        const address = new Address("Street A", 123, "City A", "State A");
        
        let customer = CustomerFactory.createWithAddress("Customer B", address);
        expect(customer).toBeDefined();
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer B");
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe("Street A");
    })
})