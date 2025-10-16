/**
 * Classe que representa a primeira etapa do checkout.
 * Fornece métodos para preencher as informações do usuário (nome, sobrenome e CEP).
 */
export class CheckoutPage {
  constructor(page) {
    this.page = page

    this.checkoutTitle = page.locator('[data-test="title"]')
    this.userFirstName = page.locator('[data-test="firstName"]')
    this.userLastName = page.locator('[data-test="lastName"]')
    this.userPostalCode = page.locator('[data-test="postalCode"]')
    this.continueButton = page.locator('[data-test="continue"]')
  }

  /**
   * Preenche as informações do usuário e avança para a próxima etapa do checkout.
   * @async
   * @param {string} firstName - Primeiro nome do usuário
   * @param {string} lastName - Sobrenome do usuário
   * @param {string} postalCode - Código postal/CEP do usuário
   * @example
   * await checkoutPage.sendUserInformation('João', 'Silva', '12345-678')
   */
  async sendUserInformation(firstName, lastName, postalCode) {
    await this.userFirstName.fill(firstName)
    await this.userLastName.fill(lastName)
    await this.userPostalCode.fill(postalCode)
    await this.continueButton.click()
  }
}
