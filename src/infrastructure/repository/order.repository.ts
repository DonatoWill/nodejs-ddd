import Order from "../../domain/entity/order";
import OrderService from "../../domain/service/order.service";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {


    async create(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            })),
        },
            {
                include: [{ model: OrderItemModel }]
            }

        );
    }

    async update(order: Order): Promise<void> {

        await OrderModel.findOne(
            {
                where: {
                    id: order.id
                },
            }).then(async (orderModel) => {

                await orderModel.update({
                    customer_id: order.customerId,
                    total: order.total()
                });


                order.items.forEach(async (item) => {
                    await OrderItemModel.upsert({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        order_id: order.id,
                        product_id: item.productId
                    });
                })

                await orderModel.save();

            })

    };


find(id: string): Promise < Order > {
    throw new Error("Method not implemented.");
}
findAll(): Promise < Order[] > {
    throw new Error("Method not implemented.");
}

}