Feature: Registro de Usuario

  Scenario: Registro exitoso de un nuevo usuario
    Given que estoy en la página de registro
    When ingreso mis datos válidos en el formulario de registro
    And hago clic en "Registrar"
    Then debería ver un mensaje de confirmación de registro
    And debería estar autenticado en el sitio
  
  Scenario: Intento de registro con datos inválidos
    Given que estoy en la página de registro
    When ingreso un correo electrónico inválido en el formulario
    And hago clic en "Registrar"
    Then debería ver un mensaje de error indicando "Correo electrónico no válido"
    And permanecer en la página de registro
