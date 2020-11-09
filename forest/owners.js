const { collection } = require('forest-express-sequelize');

collection('owners', {
  actions: [
    {
      name: 'notify users',
      fields: [{
        field: 'subject',
        type: 'String',
      }, {
        field: 'body',
        type: 'String',
        widget: 'text area',
      }],
    },
  ],
  fields: [],
  segments: [],
});
