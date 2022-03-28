import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Order from "../../../../domain/checkout/entity/order";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

describe("Order repository test", () => {


    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequileze.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem("1",
            product.name,
            product.price,
            product.id,
            2);

        const orderRepository = new OrderRepository();
        const order = new Order("1", "1", [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: "1"

                },
            ],

        });

    })


    it("should update a order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem("1",
            product.name,
            product.price,
            product.id,
            2);

        const orderRepository = new OrderRepository();
        const order = new Order("1", "1", [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        console.log(orderModel.toJSON());

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: "1"

                },
            ],

        });

        const product2 = new Product("2", "Product 2", 20);

        await productRepository.create(product2);

        const newOrderItem = new OrderItem("1",
            product2.name,
            product2.price,
            product2.id,
            2);

        const newOrder = new Order("1", "1", [newOrderItem]);

        console.log(newOrder);

        await orderRepository.update(newOrder);

        const newOrderModel = await OrderModel.findOne({ where: { id: newOrder.id }, include: ["items"] });


        expect(newOrderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: newOrder.total(),
            items: [
                {
                    id: newOrderItem.id,
                    name: newOrderItem.name,
                    price: newOrderItem.price,
                    quantity: newOrderItem.quantity,
                    order_id: "1",
                    product_id: "2"
                }
            ],
        });

    });

})