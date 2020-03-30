import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: { [productName: string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};
        for(let productName in itemsMap) {
            let item = itemsMap[productName];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalPrice() {
        let sum = 0;
        for(let productName in this.items) {
            sum+= this.items[productName].totalPrice;
        }
        return sum;
    }
    get productNames() {
        return Object.keys(this.items);
    }

    getQuantity(product) {
        // if (!this.itemsMap) return 0;
        let item = this.itemsMap[product.title];
        return item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        for(let productName in this.items) {
            count += this.items[productName].quantity;
        }
        return count;
    }
}