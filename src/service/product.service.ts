import { Product } from './../entity/product';

export class ProductService {
    static increasePrice(products: Product[], percent: number) {
        products.forEach(product => product.changePrice(product.price + product.price * percent / 100));
    }
}