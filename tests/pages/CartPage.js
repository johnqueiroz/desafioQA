import { expect } from '@playwright/test'
import { productsData } from '../../utils/products'

export class CartPage {
  constructor(page) {
    this.page = page

    this.cartTile = page.locator('[data-test="title"]')
    this.itemName = (index) =>
      page.locator(`[data-test="item-${index}-title-link"]`)
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
    this.itemPrice = page.locator('[data-test="inventory-item-price"]')
    this.checkout = page.locator('[data-test="checkout"]')
    this.RemoveFromCart = page.locator(
      '[data-test="remove-sauce-labs-bike-light"]',
    )
  }

  /**
   * Valida as informações de um produto no carrinho.
   * Verifica se o nome, descrição e preço correspondem aos dados esperados.
   * @async
   * @param {number} index - Índice do produto no array productsData para comparação
   * @throws {Error} Se alguma informação do produto não corresponder aos dados esperados
   * @example
   * await cartPage.validateCart(0)
   */
  async validateCart(index) {
    await expect(this.itemName(index)).toHaveText(productsData[index].title)
    await expect(this.itemDescription).toHaveText(
      productsData[index].description,
    )
    await expect(this.itemPrice).toHaveText(productsData[index].price)
  }
}
