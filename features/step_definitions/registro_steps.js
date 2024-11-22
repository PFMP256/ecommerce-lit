import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Given('que estoy en la página de registro', function () {
  // Implementar la navegación a la página de registro
});

When('ingreso un email válido {string}', function (email) {
  // Implementar la entrada de email
});

When('ingreso una contraseña válida {string}', function (password) {
  // Implementar la entrada de contraseña
});

When('hago clic en el botón de registro', function () {
  // Implementar el clic en el botón
});

Then('debería ver un mensaje de registro exitoso', function () {
  // Verificar el mensaje de éxito
}); 