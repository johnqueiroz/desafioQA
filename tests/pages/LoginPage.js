export class LoginPage {
  constructor(page) {
    this.page = page

    this.username = page.locator('[data-test="username"]')
    this.password = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.lockedError = page.locator('[data-test="error"]')
  }

  /**
   * Navega até a página de login
   * @async
   * @example
   * await loginPage.visit()
   */
  async visit() {
    await this.page.goto('/')
  }

  /**
   * Realiza o processo de login preenchendo as credenciais e submetendo o formulário.
   * Aguarda o carregamento completo da página após o clique no botão.
   * @async
   * @param {string} user - Nome de usuário para login
   * @param {string} password - Senha do usuário
   * @example
   * await loginPage.doLogin('standard_user', 'secret_sauce')
   */
  async doLogin(user, password) {
    await this.username.fill(user)
    await this.password.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState()
  }
}
