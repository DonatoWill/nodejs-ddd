import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import FirstLogWhenCustomerCreatedHandler from "../customer/handler/first-log-when-customer-created.handler";
import SecondLogWhenCustomerCreatedHandler from "../customer/handler/second-log-when-customer-created.handler";
import SendWhenChangeCustomerAddressHandler from "../customer/handler/send-when-change-customer-address.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {


    it("shoulde register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("shoulde unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("shoulde unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        eventDispatcher.unreigsterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });


    it("shoulde notify an event", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);


        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);


        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.00,
        });

        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(eventHandler.handle).toHaveBeenCalledTimes(1);
        expect(eventHandler.handle).toHaveBeenCalledWith(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();

    });


    it("should send event customer created", () =>{

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new FirstLogWhenCustomerCreatedHandler();
        const secondEventHandler = new SecondLogWhenCustomerCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondEventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            email: "",
            cpf: "",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(eventHandler.handle).toHaveBeenCalledTimes(1);
        expect(eventHandler.handle).toHaveBeenCalledWith(customerCreatedEvent);
        expect(secondEventHandler.handle).toHaveBeenCalledTimes(1);
        expect(secondEventHandler.handle).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spySecondEventHandler).toHaveBeenCalled();
    });



    it("should send event customer address changed", () =>{

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendWhenChangeCustomerAddressHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerAddressChangedEvent({
            id: 1,
            name: "Customer 1",
            address: "Rua 1 - Bairro 1",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(eventHandler.handle).toHaveBeenCalledTimes(1);
        expect(eventHandler.handle).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });

})