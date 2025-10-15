/**
 * Rotas da aplicação SauceDemo
 */
export const routes = {
    /** Página de login */
    login: '/',
    
    /** Página de inventário de produtos */
    inventory: '/inventory.html',
    
    /** Página do carrinho de compras */
    cart: '/cart.html',
    
    /** Página de checkout */
    checkout: '/checkout-step-one.html',
    
    /**
     * Retorna a rota de um produto específico
     * @param {number} index - ID do produto
     * @returns {string} - URL do produto
     */
    product: (index) => `/inventory-item.html?id=${index}`,
  }