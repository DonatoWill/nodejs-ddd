import EventHandlerInterface from "../../../event/@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SecondLogWhenCustomerCreatedHandler 
                        implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
    
}