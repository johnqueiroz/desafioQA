import { expect } from '@playwright/test'
import { productsData } from '../../utils/products' 

export class CartPage {
    constructor(page){
        this.page = page

        this.cartTile = page.locator('[data-test="title"]')
        this.itemName = (index) => page.locator(`[data-test="item-${index}-title-link"]`)
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
        this.itemPrice = page.locator('[data-test="inventory-item-price"]')
        this.checkout = page.locator('[data-test="checkout"]')
        this.RemoveFromCart = page.locator('[data-test="remove-sauce-labs-bike-light"]')
    }

  /**
   * 
   */
    async validateCart(index) {
        await expect(this.itemName(index)).toHaveText(productsData[index].title)
        await expect(this.itemDescription).toHaveText(productsData[index].description)
        await expect(this.itemPrice).toHaveText(productsData[index].price)
    }

}