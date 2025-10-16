import { expect } from '@playwright/test'

export class ProductItemPage {
    constructor(page){
        this.page = page

        this.itemName = page.locator('[data-test="inventory-item-name"]')
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
        this.itemPrice = page.locator('[data-test="inventory-item-price"]')
        this.addCart = page.locator('[data-test="add-to-cart"]')
        this.removeFromCart = page.locator('[data-test="remove"]')
        this.cart = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
    }

    async addProductToCart(){
        await this.addCart.click()
        await expect(this.removeFromCart).toBeVisible()
        await expect(this.cartBadge).toHaveText('1')
    }
}