export default {
  auth: {
    login: {
      title: 'Iniciar sesión',
      username: 'Usuario',
      password: 'Contraseña',
      submit: 'Ingresar',
      invalidCredentials: 'Usuario o contraseña incorrectos',
      usernameRequired: 'El usuario es obligatorio',
      passwordRequired: 'La contraseña es obligatoria',
    },
    logout: 'Cerrar sesión',
  },

  paymentMethods: {
    pageTitle: 'Métodos de pago',
    newButton: 'Nuevo método de pago',

    table: {
      name: 'Nombre',
      type: 'Tipo',
      status: 'Estado',
      createdAt: 'Fecha de creación',
      actions: 'Acciones',
    },

    types: {
      credit_card: 'Tarjeta de crédito',
      debit_card: 'Tarjeta de débito',
      bank_transfer: 'Transferencia bancaria',
      digital_wallet: 'Billetera digital',
    },

    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },

    filters: {
      name: 'Nombre',
      type: 'Tipo',
      status: 'Estado',
      createdAt: 'Fecha de creación',
      search: 'Buscar',
      clear: 'Limpiar',
      fieldRequired: 'Campo obligatorio',
      validationError: 'Completa los campos obligatorios antes de buscar',
    },

    form: {
      createTitle: 'Nuevo método de pago',
      editTitle: 'Editar método de pago',
      name: 'Nombre',
      type: 'Tipo',
      description: 'Descripción',
      cancel: 'Cancelar',
      save: 'Guardar',
      nameRequired: 'El nombre es obligatorio',
      typeRequired: 'El tipo es obligatorio',
      savedSuccess: 'Método de pago guardado correctamente',
    },

    delete: {
      title: 'Eliminar método de pago',
      message: '¿Seguro que deseas eliminar "{name}"? Esta acción no se puede deshacer.',
    },

    errors: {
      fetch: 'No se pudo cargar el listado de métodos de pago',
      toggleStatus: 'No se pudo actualizar el estado del método de pago',
      create: 'No se pudo crear el método de pago',
      update: 'No se pudo actualizar el método de pago',
      delete: 'No se pudo eliminar el método de pago',
    },
  },
}
