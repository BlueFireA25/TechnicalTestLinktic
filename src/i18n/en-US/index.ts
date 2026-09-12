export default {
  auth: {
    login: {
      title: 'Sign in',
      username: 'Username',
      password: 'Password',
      submit: 'Sign in',
      invalidCredentials: 'Invalid username or password',
      usernameRequired: 'Username is required',
      passwordRequired: 'Password is required',
      fillDemoCredentials: 'Autofill demo credentials',
      logoLoadError: "Logo couldn't load",
    },
    logout: 'Log out',
  },

  paymentMethods: {
    pageTitle: 'Payment methods',
    newButton: 'New payment method',

    table: {
      name: 'Name',
      type: 'Type',
      status: 'Status',
      createdAt: 'Creation date',
      actions: 'Actions',
    },

    types: {
      credit_card: 'Credit card',
      debit_card: 'Debit card',
      bank_transfer: 'Bank transfer',
      digital_wallet: 'Digital wallet',
    },

    status: {
      active: 'Active',
      inactive: 'Inactive',
    },

    filters: {
      name: 'Name',
      type: 'Type',
      status: 'Status',
      createdAt: 'Creation date',
      search: 'Search',
      clear: 'Clear',
      fieldRequired: 'This field is required',
      validationError: 'Please fill in the required fields before searching',
    },

    form: {
      createTitle: 'New payment method',
      editTitle: 'Edit payment method',
      name: 'Name',
      type: 'Type',
      description: 'Description',
      cancel: 'Cancel',
      save: 'Save',
      nameRequired: 'Name is required',
      typeRequired: 'Type is required',
      savedSuccess: 'Payment method saved successfully',
    },

    delete: {
      title: 'Delete payment method',
      message: 'Are you sure you want to delete "{name}"? This action cannot be undone.',
      confirm: 'Delete',
      deletedSuccess: 'Payment method deleted successfully',
    },

    errors: {
      fetch: 'Could not load the payment methods list',
      toggleStatus: "Could not update the payment method's status",
      create: 'Could not create the payment method',
      update: 'Could not update the payment method',
      delete: 'Could not delete the payment method',
    },
  },

  accessibility: {
    increaseFont: 'Increase text size',
    decreaseFont: 'Decrease text size',
  },

  languageSwitcher: {
    spanish: 'Spanish',
    english: 'English',
  },

  notFound: {
    title: "This page doesn't exist",
    subtitle: 'Check the address or go back to the payment methods list.',
    goHome: 'Go to home',
  },
};
