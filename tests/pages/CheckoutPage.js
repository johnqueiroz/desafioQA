export class CheckoutPage {
  constructor(page) {
    this.page = page

    this.checkoutTitle = page.locator('[data-test="title"]')
    this.userFirstName = page.locator('[data-test="firstName"]')
    this.userLastName = page.locator('[data-test="lastName"]')
    this.userPostalCode = page.locator('[data-test="postalCode"]')
    this.continueButton = page.locator('[data-test="continue"]')
  }

  async sendUserInformation(firstName, lastName, postalCode) {
    await this.userFirstName.fill(firstName)
    await this.userLastName.fill(lastName)
    await this.userPostalCode.fill(postalCode)
    await this.continueButton.click()
  }
}
