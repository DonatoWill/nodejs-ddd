import CustomerFactory from "../../customer/factory/customer.factory";
import ProductFactory from "../../product/factory/product.factory";
import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {

    it("should create an order", () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product A",
                    productId: uuid(),
                    quantity: 1,
                    price: 100,
                }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order).toBeDefined();
        expect(order.id).toBeDefined();
        expect(order.customerId).toBeDefined();
        expect(order.items).toBeDefined();
        expect(order.items.length).toBe(1);
        expect(order.items[0].id).toBeDefined();
        expect(order.items[0].name).toBe("Product A");
        

    });
})