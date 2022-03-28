import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {


    async create(customer: Customer): Promise<void> {
        await CustomerModel.create({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            zipCode: customer.address.zip

        });
    }

    async update(customer: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
                zipCode: customer.address.zip
            },
            {
                where: {
                    id: customer.id
                }
            });
    }

    async find(id: string): Promise<Customer> {

        let customerModel
        try {
            customerModel = await CustomerModel.findOne({ where: { id: id } });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(
            customerModel.id,
            customerModel.name
        )

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.city,
            customerModel.zipCode
        )
        customer.address = address;

        return customer;
        
    }

    async findAll(): Promise<Customer[]> {
        const customerModel = await CustomerModel.findAll();

        return customerModel.map((customerModel) =>
            new Customer(
                customerModel.id,
                customerModel.name
            )
        )
    }
}