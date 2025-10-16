export class CheckoutPage {
  constructor(page) {
    this.page = page

    this.checkoutTitle = page.locator('')
    this.itemName = page.locator('')
    this.itemDescription = page.locator('')
    this.itemPrice = page.locator('')
    this.paymentInformation = page.locator('')
    this.shippingInformation = page.locator('')
    this.taxPrice = page.locator('')
    this.totalPrice = page.locator('')
    this.finishButton = page.locator('')
  }

  /**
   * Navega para a página de produtos
   */
  async fillInformation() {}
}
