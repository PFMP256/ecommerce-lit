import { Given, When, Then, After, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import puppeteer from 'puppeteer';

// Variables globales para el navegador y la página
let browser;
let page;

// Datos de ejemplo para el registro
const validUserData = {
  nombre: 'Juan Pérez',
  email: 'juan.perez@example.com',
  password: 'SecurePassword123'
};

const invalidUserData = {
  nombre: 'Ana Gómez',
  email: 'ana.gomez@invalid', // Correo inválido
  password: 'AnotherSecurePassword456'
};

// Hook para inicializar el navegador antes de cada escenario
Before(async () => {
  browser = await puppeteer.launch({
    headless: false, // Cambiar a true para ejecutar en modo headless
    slowMo: 50, // Opcional: ralentiza las acciones para ver lo que sucede
  });
  page = await browser.newPage();
  // Opcional: configurar el viewport
  await page.setViewport({ width: 1280, height: 800 });
});

// Hook para cerrar el navegador después de cada escenario
After(async () => {
  await browser.close();
});

// Paso: Dado que estoy en la página de registro
Given('que estoy en la página de registro', async () => {
  await page.goto('https://tusitio.com/registro'); // Reemplaza con la URL real de la página de registro
  // Espera a que el formulario de registro esté visible
  await page.waitForSelector('form#registro');
});

// Paso: Cuando ingreso mis datos válidos en el formulario de registro
When('ingreso mis datos válidos en el formulario de registro', async () => {
  await page.type('input[name="nombre"]', validUserData.nombre);
  await page.type('input[name="email"]', validUserData.email);
  await page.type('input[name="password"]', validUserData.password);
});

// Paso: Y ingreso un correo electrónico inválido en el formulario
When('ingreso un correo electrónico inválido en el formulario', async () => {
  await page.type('input[name="nombre"]', invalidUserData.nombre);
  await page.type('input[name="email"]', invalidUserData.email);
  await page.type('input[name="password"]', invalidUserData.password);
});

// Paso: Y hago clic en "Registrar"
When('hago clic en {string}', async (buttonText) => {
  // Busca el botón por su texto y hace clic en él
  const buttons = await page.$x(`//button[contains(text(), '${buttonText}')]`);
  if (buttons.length > 0) {
    await buttons[0].click();
  } else {
    throw new Error(`No se encontró el botón con el texto: ${buttonText}`);
  }
});

// Paso: Entonces debería ver un mensaje de confirmación de registro
Then('debería ver un mensaje de confirmación de registro', async () => {
  // Asumiendo que el mensaje de confirmación tiene un selector específico
  await page.waitForSelector('.mensaje-confirmacion');
  const mensaje = await page.$eval('.mensaje-confirmacion', el => el.textContent);
  expect(mensaje).to.contain('Registro exitoso'); // Ajusta el texto según corresponda
});

// Paso: Y debería estar autenticado en el sitio
Then('debería estar autenticado en el sitio', async () => {
  // Verifica la presencia de un elemento que solo está visible para usuarios autenticados, por ejemplo, un botón de "Cerrar sesión"
  const logoutButton = await page.$('button#cerrar-sesion');
  expect(logoutButton).to.not.be.null;
});

// Paso: Entonces debería ver un mensaje de error indicando "Correo electrónico no válido"
Then('debería ver un mensaje de error indicando {string}', async (mensajeError) => {
  // Asumiendo que el mensaje de error tiene un selector específico
  await page.waitForSelector('.mensaje-error');
  const mensaje = await page.$eval('.mensaje-error', el => el.textContent);
  expect(mensaje).to.contain(mensajeError);
});

// Paso: Y permanecer en la página de registro
Then('permanecer en la página de registro', async () => {
  // Verifica que la URL actual es la de registro
  const urlActual = page.url();
  expect(urlActual).to.include('/registro'); // Ajusta la ruta según corresponda
  // Opcional: Verifica que el formulario de registro sigue visible
  const formulario = await page.$('form#registro');
  expect(formulario).to.not.be.null;
});