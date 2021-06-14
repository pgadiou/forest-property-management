const { collection } = require('forest-express-sequelize');
const models = require('../models')

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
    }, {
      field: 'property label',
      type: 'String',
      get: (record) => `${record.addressCity} - ${record.name}`,
    }, {
      field: 'registration process',
      type: 'String',
      get: async (record) => {
        const recordWithRelationships = await models.properties.findByPk(record.id, {
          include: [{
            model: models.buildings,
            as: 'buildings',
            include: [{
              model: models.lots,
              as: 'lots',
            }],
          }, {
            model: models.repartitionKeys,
            as: 'repartitionKeys',
          }],
        });
        const lotsCount = await models.lots.count({
          include: [{
            model: models.buildings,
            as: 'building',
            where: { propertyIdKey: record.id },
          }],
        });
        const stepsNameList = {
          'buildings': recordWithRelationships.buildings.length,
          'lots': lotsCount,
          'repartitionKeys': recordWithRelationships.repartitionKeys.length,
        };
        let stepsList = '';
        const stepsDivStyle = 'margin: 24px 0px; color: #415574';
        const stepsNameStyle = 'padding: 6px 16px; margin: 12px; background-color:#b5c8d05e; border-radius: 6px';
        const stepsValueStyleRed = 'padding: 6px 12px; background-color:#ff7f7f87; border-radius: 6px';
        const stepsValueStyleGreen = 'padding: 6px 12px; background-color:#7FFF7F; border-radius: 6px';
        for (const [key, value] of Object.entries(stepsNameList)) {
          let stepsValueStyle = value ? stepsValueStyleGreen :stepsValueStyleRed;
          stepsList += `<div style="${stepsDivStyle}">
            <span style="${stepsNameStyle}">registered ${key}</span>
            <span style="${stepsValueStyle}">${value}</span>
          </div>`;
        }
        return stepsList;
      },
    },
  ],
  segments: [],
});
