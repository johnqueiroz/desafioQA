import { test as fixture } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductItemPage } from './pages/ProductItemPage'
import { CartPage } from './pages/CartPage'

export const test = fixture.extend({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
	productsPage: async ({ page }, use) => {
		await use(new ProductsPage(page))
	},
	productItemPage: async ({ page }, use) => {
		await use(new ProductItemPage(page))
	},
	cartPage: async ({ page }, use) => {
		await use(new CartPage(page))
	},
})
export default test