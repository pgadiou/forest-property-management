const express = require('express');
const { PermissionMiddlewareCreator, RecordSerializer } = require('forest-express-sequelize');
const models = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('ownerProperties');
const recordsSerializer = new RecordSerializer({ name: 'ownerProperties' });

const include = [{
  model: models.owners,
  as: 'owner',
}, {
  model: models.buildings,
  as: 'building',
  include: [{
    model: models.properties,
    as: 'property',
  }],
}];

function ownerPropertyGetter(id) {
  return models.lots.findByPk(id, { include })
    .then(async (lot) => {
      let ownerProperty = {
        id: lot.id,
        ownerFirstName: lot.owner.firstName,
        ownerLastName: lot.owner.lastName,
        ownerProperty: lot.building.property.name,
      };
      return recordsSerializer.serialize(ownerProperty);
    });
}

// Create records from the owner, lot, building and property collections from create form
router.post('/ownerProperties', permissionMiddlewareCreator.create(), (request, response, next) => {
  const { attributes } = request.body.data;
  const fields = {
    owner: {
      firstName: attributes.ownerFirstName,
      lastName: attributes.ownerLastName,
    },
    building: {
      property: {
        name: attributes.ownerProperty,
      },
    },
  };

  return models.lots.create(fields, { include })
    .then(async (lot) => {
      // don't forget to return the object newly created to ensure a smooth redirection
      const serializedRecord = await ownerPropertyGetter(lot.id);
      return response.send(serializedRecord);
    });
});

// Get a list of owner-properties
router.get('/ownerProperties', permissionMiddlewareCreator.list(), (request, response, next) => {
  const limit = parseInt(request.query.page.size) || 20;
  const offset = (parseInt(request.query.page.number) - 1) * limit;

  const findAllQuery = models.lots.findAll(
    {
      include,
      limit,
      offset,
    },
  );
  const countQuery = models.lots.count({ include });

  Promise.all([
    findAllQuery,
    countQuery,
  ])
    .then(async ([lotsList, count]) => {
      const records = [];
      lotsList.forEach((lot) => {
        let ownerProperty = {
          id: lot.id,
          ownerFirstName: lot.owner.firstName,
          ownerLastName: lot.owner.lastName,
          ownerProperty: lot.building.property.name,
        };
        records.push(ownerProperty);
      });
      const serializedRecords = await recordsSerializer.serialize(records);
      response.send({ ...serializedRecords, meta: { count } });
    })
    .catch((err) => next(err));
});


// Get an owner property
router.get('/ownerProperties/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  return ownerPropertyGetter(request.params.recordId)
    .then((serializedRecord) => response.send(serializedRecord));
});

module.exports = router;
