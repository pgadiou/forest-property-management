const { collection } = require('forest-express-sequelize');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('properties', {
  actions: [
    {
      name: 'add building',
      type: 'single',
      fields: [
        {
          field: 'name',
          type: 'String',
        }, {
          field: 'number',
          type: 'Number',
        }, {
          field: 'address line 1',
          type: 'String',
        }, {
          field: 'central heating',
          type: 'Boolean',
        },
      ],
    }, {
      name: 'add lot',
      type: 'single',
      fields: [
        {
          field: 'number',
          type: 'Number',
        }, {
          field: 'building',
          reference: 'buildings.id',
          description: 'attach to building',
        }, {
          field: 'owner',
          reference: 'owners.id',
          description: 'attach to customer (if already exists)',
        }, {
          field: 'owner first name',
          type: 'String',
          description: 'fill in if customer is not yet registered',

        }, {
          field: 'owner last name',
          type: 'String',
          description: 'fill in if customer is not yet registered',

        }, {
          field: 'owner email',
          type: 'String',
          description: 'fill in if customer is not yet registered',
        },
      ],
    }, {
      name: 'add repartition key',
      type: 'single',
      fields: [
        {
          field: 'name',
          type: 'String',
        }, {
          field: 'total',
          type: 'Number',
        },
      ],
    },
  ],
  fields: [
    {
      field: 'owners',
      type: ['String'],
      reference: 'owners.id',
    }, {
      field: 'lots',
      type: ['String'],
      reference: 'lots.id',
    },
  ],
  segments: [],
});
