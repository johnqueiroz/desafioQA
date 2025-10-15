import { test as fixture } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { ProductPage } from './pages/ProductPage'

export const test = fixture.extend({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
	productPage: async ({ page }, use) => {
		await use(new ProductPage(page))
	},
})
export default test