/**
 * Rotas da aplicação SauceDemo
 */
export const routes = {
  /** Página de login */
  login: '/',

  /** Página de produtos */
  inventory: '/inventory.html',

  /** Página do carrinho de compras */
  cart: '/cart.html',

  /** Página 1 de checkout */
  checkout: '/checkout-step-one.html',

  /** Página 2 de checkout */
  checkoutFinish: '/checkout-step-two.html',

  /** Página 3 de checkout */
  checkoutComplete: '/checkout-complete.html',

  /**
   * Retorna a rota de um produto específico
   * @param {number} index - ID do produto
   * @returns {string} - URL do produto
   */
  product: (index) => `/inventory-item.html?id=${index}`,
}
