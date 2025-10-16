import { expect } from '@playwright/test'

/**
 * Classe que representa a página de conclusão do checkout.
 * Fornece métodos para validar que o pedido foi finalizado com sucesso.
 */
export class CheckoutCompletePage {
  constructor(page) {
    this.page = page

    this.checkoutCompletedTitle = page.locator('[data-test="title"]')
    this.completedHeader = page.locator('[data-test="complete-header"]')
    this.completedText = page.locator('[data-test="complete-text"]')
    this.backHomeButton = page.locator('[data-test="back-to-products"]')
  }

  /**
   * Valida que as informações de conclusão do pedido estão visíveis.
   * Verifica se o cabeçalho e o texto de confirmação são exibidos na página.
   * @async
   * @throws {Error} Se o cabeçalho ou texto de confirmação não estiverem visíveis
   * @example
   * await checkoutCompletePage.checkInformation()
   */
  async checkInformation() {
    await expect(this.completedHeader).toBeVisible()
    await expect(this.completedText).toBeVisible()
  }
}
