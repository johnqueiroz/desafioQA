import { expect } from '@playwright/test'
import { productsData } from '../../utils/products'

/**
 * Dados estáticos de pagamento e entrega exibidos na página de revisão.
 * @constant
 */
const data = {
  payment: 'SauceCard #31337',
  shipping: 'Free Pony Express Delivery!',
}

/**
 * Classe que representa a página de revisão final do checkout.
 * Fornece métodos para validar informações do produto, pagamento, entrega e valores totais.
 */
export class CheckoutFinishPage {
  constructor(page) {
    this.page = page

    this.checkoutFinishTitle = page.locator('[data-test="title"]')
    this.itemName = (index) =>
      page.locator(`[data-test="item-${index}-title-link"]`)
    this.itemQuantity = page.locator('[data-test="item-quantity"]')
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]')
    this.itemPrice = page.locator('[data-test="inventory-item-price"]')
    this.paymentInformation = page.locator('[data-test="payment-info-value"]')
    this.shippingInformation = page.locator('[data-test="shipping-info-value"]')
    this.taxPrice = page.locator('[data-test="tax-label"]')
    this.totalPrice = page.locator('[data-test="total-label"]')
    this.finishButton = page.locator('[data-test="finish"]')
  }

  /**
   * Valida todas as informações exibidas na página de revisão do checkout.
   * Verifica dados do produto, quantidade, pagamento, entrega, impostos e total.
   * @async
   * @param {number} index - Índice do produto no array productsData para comparação
   * @throws {Error} Se alguma informação não corresponder aos dados esperados
   * @example
   * await checkoutFinishPage.checkCheckoutInformation(0)
   */
  async checkCheckoutInformation(index) {
    await expect(this.itemQuantity).toHaveText('1')
    await expect(this.itemName(index)).toHaveText(productsData[index].title)
    await expect(this.itemDescription).toHaveText(
      productsData[index].description,
    )
    await expect(this.itemPrice).toHaveText(productsData[index].price)
    await expect(this.paymentInformation).toHaveText(data.payment)
    await expect(this.shippingInformation).toHaveText(data.shipping)
    await expect(this.taxPrice).toHaveText(`Tax: ${productsData[index].tax}`)
    await expect(this.totalPrice).toHaveText(
      `Total: ${productsData[index].total}`,
    )
  }
}
