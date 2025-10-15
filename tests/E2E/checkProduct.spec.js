import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'

const productsData = {
    0: {
        title: 'Sauce Labs Bike Light',
        description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
        price: '$9.99',
      },
    1: {
      title: 'Sauce Labs Bolt T-Shirt',
      description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
      price: '$15.99',
    },
    2: {
        title: 'Sauce Labs Onesie',
        description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
        price: '$7.99',
      },
    3: {
        title: 'Test.allTheThings() T-Shirt (Red)',
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
        price: '$15.99',
      },
    4: {
        title: 'Sauce Labs Backpack',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        price: '$29.99',
      },
    5: {
      title: 'Sauce Labs Fleece Jacket',
      description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: '$49.99',
    },

  }

test.beforeEach('Acessar página do saucedemo e fazer login', async ({ loginPage, page }) => {
  await loginPage.visit()
  await loginPage.doLogin(users.standard, 'secret_sauce')
  await expect(page).toHaveURL(routes.inventory)
})

test.describe('Validar produtos', () => {
    for (let index = 0; index < 6; index++) {  
        test(`deve validar informações do produto - ${index}`, {
        }, async ({ productItemPage, productsPage, page }) => {
            await productsPage.clickProduct(index)

            // Validar URL
            await expect(page).toHaveURL(routes.product(index))
            
            // Validar informações do produto
            await expect(productItemPage.itemName).toHaveText(productsData[index].title)
            await expect(productItemPage.itemDescription).toHaveText(productsData[index].description)
            await expect(productItemPage.itemPrice).toHaveText(productsData[index].price)
        })
    }
})

