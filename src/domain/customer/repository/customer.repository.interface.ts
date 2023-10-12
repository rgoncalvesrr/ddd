import { Customer } from "../entity/customer";
import { IRepository } from "../../@shared/repository/repository.interface";

export interface ICustomerRepository extends IRepository<Customer> {

}