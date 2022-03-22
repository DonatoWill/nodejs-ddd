export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(_id: string, _name: string, _price: number, productId: string, quantity: number) {
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this._quantity = quantity
        this._productId = productId;
    }

    get price(): number {
        return this._price * this._quantity;
    }
}