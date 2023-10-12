import { Order } from "../entity/order";
import { IRepository } from "./repository.interface";

export interface IOrderRepository extends IRepository<Order> {

}