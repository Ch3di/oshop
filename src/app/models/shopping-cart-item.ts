export class ShoppingCartItem {
    constructor(public product: any, public quantity: number) {}
    get totalPrice() {
        return this.product.price * this.quantity;
    }
}