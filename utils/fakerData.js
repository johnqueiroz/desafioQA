import { faker } from '@faker-js/faker/locale/pt_BR'

/**
 * Gera um nome garantindo que não seja vazio
 */
const getValidFirstName = () => {
  let firstName = faker.person.firstName()
  while (!firstName) {
    firstName = faker.person.firstName()
  }
  return firstName
}

/**
 * Gera um sobrenome garantindo que não seja vazio
 */
const getValidLastName = () => {
  let lastName = faker.person.lastName()
  while (!lastName) {
    lastName = faker.person.lastName()
  }
  return lastName
}

/**
 * Gera um CEP garantindo que não seja vazio
 */
const getValidZipCode = () => {
  let zipCode = faker.location.zipCode()
  while (!zipCode) {
    zipCode = faker.location.zipCode()
  }
  return zipCode
}

export const generateCheckoutData = () => {
  return {
    firstName: getValidFirstName(),
    lastName: getValidLastName(),
    postalCode: getValidZipCode(),
  }
}
