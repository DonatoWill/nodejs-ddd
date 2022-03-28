import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendWhenChangeCustomerAddressHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {

    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do client: ${event.eventData.id}, ${event.eventData.name} alterado para ${event.eventData.address}`);
    }

}