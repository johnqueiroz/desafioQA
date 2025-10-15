// import { expect } from '@playwright/test'
export class LoginPage {
    constructor(page){
        this.page = page

        this.username = page.locator('[data-test="username"]')
        this.password = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
    }

    async visit() {
        await this.page.goto('/')
    }

    async doLogin(user, password){
        await this.username.fill(user)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}