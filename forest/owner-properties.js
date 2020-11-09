const { collection } = require('forest-express-sequelize');

collection('ownerProperties', {
  actions: [],
  fields: [{
    field: 'ownerFirstName',
    type: 'String',
  }, {
    field: 'ownerLastName',
    type: 'String',
  }, {
    field: 'ownerProperty',
    type: 'String',
  }],
  segments: [],
});
