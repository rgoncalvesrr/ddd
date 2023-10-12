import { Product } from "../entity/product";
import { IRepository } from "../../@shared/repository/repository.interface";

export interface IProductRepository extends IRepository<Product> {

}