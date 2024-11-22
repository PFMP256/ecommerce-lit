# language: es
Característica: Registro de usuario
  Como un usuario no registrado
  Quiero poder crear una cuenta
  Para poder acceder a las funcionalidades del ecommerce

  Escenario: Registro exitoso
    Dado que estoy en la página de registro
    Cuando ingreso un email válido "usuario@ejemplo.com"
    Y ingreso una contraseña válida "Contraseña123!"
    Y hago clic en el botón de registro
    Entonces debería ver un mensaje de registro exitoso 