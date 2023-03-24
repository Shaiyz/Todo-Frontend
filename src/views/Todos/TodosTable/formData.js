export const TodoformConfig = {
  task: {
    label: 'Task Name:',
    elementType: 'input',
    elementConfig: {
      name: 'task',
      type: 'text',
      placeholder: 'Task Name',
    },
    value: '',
    valid: true,
    validityMessage: 'This value is required!',
    validatingRules: {
      // required: true,
    },
  },


  description: {
    label: 'Description',
    elementType: 'input',
    elementConfig: {
      name: 'description',
      type: 'text',
      placeholder: 'Description',
    },
    value: '',
    valid: true,
    // validityMessage: 'This value is required!',
    validatingRules: {
      // required: true,
    },
  },


  status: {
    label: 'Status',
    elementType: 'select',
    elementConfig: {
      name: 'status',
      placeholder: 'Status',
    },
    options: {
      No: false,
      Yes: true,
    },
    value: '',
    valid: true,
    validityMessage: 'This value is required!',
    validatingRules: {
      required: true,
    },
  },


}

