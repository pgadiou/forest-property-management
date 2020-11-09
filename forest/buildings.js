const { collection } = require('forest-express-sequelize');

collection('buildings', {
  actions: [],
  fields: [
    {
      field: 'owners',
      type: ['String'],
      reference: 'owners.id',
    },
  ],
  segments: [],
});
