import { expect } from '@playwright/test'

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page

    this.checkoutCompletedTitle = page.locator('[data-test="title"]')
    this.completedHeader = page.locator('[data-test="complete-header"]')
    this.completedText = page.locator('[data-test="complete-text"]')
    this.backHomeButton = page.locator('[data-test="back-to-products"]')
  }
  async checkInformation() {
    await expect(this.completedHeader).toBeVisible()
    await expect(this.completedText).toBeVisible()
  }
}
