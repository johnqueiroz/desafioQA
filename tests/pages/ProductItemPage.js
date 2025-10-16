import { expect } from '@playwright/test'

export class ProductItemPage {
  constructor(page) {
    this.page = page

    this.itemName = page.locator('[data-test="inventory-item-name"]')
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
    this.itemPrice = page.locator('[data-test="inventory-item-price"]')
    this.addCart = page.locator('[data-test="add-to-cart"]')
    this.removeFromCart = page.locator('[data-test="remove"]')
    this.cart = page.locator('[data-test="shopping-cart-link"]')
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
  }

  /**
   * Adiciona o produto ao carrinho e verifica se a ação foi bem-sucedida.
   * Valida que o botão "Remover" aparece e o badge do carrinho mostra "1".
   * @async
   * @throws {Error} Se o botão "Remover" não ficar visível ou o badge não mostrar "1"
   * @example
   * await productItemPage.addProductToCart()
   */
  async addProductToCart() {
    await this.addCart.click()
    await expect(this.removeFromCart).toBeVisible()
    await expect(this.cartBadge).toHaveText('1')
  }
}
