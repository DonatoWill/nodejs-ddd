import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "City", "Zip");
customer.address = address;
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(customer),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test Find Customer Use Case", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequileze.addModels([CustomerModel]);
        await sequileze.sync();
    });

    afterEach( async () => {
        await sequileze.close();    
    });
    
    it("should find a customer", async () => {
        
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        await customerRepository.create(customer);

        const input = { id: "123" };

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                number: 123,
                city: "City",
                zip: "Zip"
            }
        }
        
        const result = await useCase.execute(input);

        expect(result).toStrictEqual(output);
        

    });

})