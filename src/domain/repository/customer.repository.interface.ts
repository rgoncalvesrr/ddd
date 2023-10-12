import { Customer } from "../entity/customer";
import { IRepository } from "./repository.interface";

export interface ICustomerRepository extends IRepository<Customer> {

}