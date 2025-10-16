export class CheckoutPage {
  constructor(page) {
    this.page = page

    this.checkoutTitle = page.locator('')
    this.userFirstName = page.locator('')
    this.userLastName = page.locator('')
    this.userPostalCode = page.locator('')
    this.continueButton = page.locator('')
  }

  /**
   * Navega para a página de produtos
   */
  async fillInformation() {}
}
