import { routes } from "../../utils/routes"

export class ProductItemPage {
    constructor(page){
        this.page = page

        this.itemName = page.locator('[data-test="inventory-item-name"]')
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
        this.itemPrice = page.locator('[data-test="inventory-item-price"]')
        this.addCart = page.locator('[data-test="add-to-cart"]')
    }
}