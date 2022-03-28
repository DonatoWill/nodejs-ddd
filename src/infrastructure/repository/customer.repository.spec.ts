import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {

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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "ZipCode 1");
        customer.address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            zipCode: customer.address.zip,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        })
    })


})