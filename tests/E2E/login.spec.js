import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'

test.beforeEach('Acessar página do saucedemo', async ({ loginPage }) => {
  await loginPage.visit()
})

test.describe('Fluxo de login padrão', () => {
  test('deve validar o fluxo de login padrão', {
  }, async ({ loginPage, page }) => {
    await loginPage.doLogin(users.standard, 'secret_sauce')
    await expect(page).toHaveURL(routes.inventory)
  })
})
