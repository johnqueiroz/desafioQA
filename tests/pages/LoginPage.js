export class LoginPage {
  constructor(page) {
    this.page = page

    this.username = page.locator('[data-test="username"]')
    this.password = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.lockedError = page.locator('[data-test="error"]')
  }

  async visit() {
    await this.page.goto('/')
  }

  async doLogin(user, password) {
    await this.username.fill(user)
    await this.password.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState()
  }
}
