import { Product } from "../entity/product";
import { IRepository } from "./repository.interface";

export interface IProductRepository extends IRepository<Product> {

}