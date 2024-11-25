import { Given, When, Then, After, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import { chromium } from '@playwright/test';

let browser;
let context;
let page;

const validUserData = {
  email: `juan.perez${Date.now()}@example.com`,
  password: 'SecurePassword123'
};


const invalidUserData = {
  email: 'ana.gomez@invalid',
  password: 'AnotherSecurePassword456'
};

Before(async function() {
  this.browser = await chromium.launch();
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  
  this.page.on('console', msg => console.log('Browser console:', msg.text()));
});

After(async function() {
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

Given('que estoy en la página de registro', async function() {
  await this.page.goto('http://localhost:8080/register');
  await this.page.waitForSelector('register-page', { timeout: 10000 });
});

When('ingreso mis datos válidos en el formulario de registro', async function() {
  const registerPage = await this.page.locator('register-page');
  await registerPage.locator('#email').fill(validUserData.email);
  await registerPage.locator('#password').fill(validUserData.password);
});

When('ingreso un correo electrónico inválido en el formulario', async function() {
  const registerPage = await this.page.locator('register-page');
  await registerPage.locator('#email').fill(invalidUserData.email);
  await registerPage.locator('#password').fill(invalidUserData.password);
});

When('hago clic en {string}', async function(buttonText) {
  await this.page.locator(`button:has-text("${buttonText}")`).click();
});

Then('debería ver un mensaje de confirmación de registro', async function() {
  await this.page.waitForSelector('.mensaje-confirmacion');
  const mensaje = await this.page.$eval('.mensaje-confirmacion', el => el.textContent);
  expect(mensaje).to.contain('Registro exitoso');
});

Then('debería estar autenticado en el sitio', async function() {
  // Esperamos un momento para asegurar que el token se haya guardado
  await this.page.waitForTimeout(1000);
  
  // Verificar el token en localStorage
  const authToken = await this.page.evaluate(() => localStorage.getItem('authToken'));
  expect(authToken).to.not.be.null;
  expect(authToken).to.be.a('string');
});

Then('debería ver un mensaje de error indicando {string}', async function(mensajeError) {
  await this.page.waitForSelector('.mensaje-error');
  const mensaje = await this.page.$eval('.mensaje-error', el => el.textContent);
  expect(mensaje).to.contain(mensajeError);
});

Then('permanecer en la página de registro', async function() {
  const urlActual = await this.page.url();
  expect(urlActual).to.include('/register');
  const formulario = await this.page.$('form#registro');
  expect(formulario).to.not.be.null;
});