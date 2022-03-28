import { Order } from "sequelize/types/model";
import RepositoryInterface from "../../@shared/repository/repository-interface";
export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {

}