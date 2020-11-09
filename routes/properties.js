const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const models = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('properties');

// This file contains the logic of every route in Forest Admin for the collection properties:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Property
router.post('/properties', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Property
router.put('/properties/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Property
router.delete('/properties/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Properties
router.get('/properties', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Properties
router.get('/properties/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Property
router.get('/properties/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Properties
router.get('/properties.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Properties
router.delete('/properties', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.get('/properties/:recordId/relationships/owners', permissionMiddlewareCreator.list(), async (request, response, next) => {
  const propertyId = request.params.recordId;
  const limit = parseInt(request.query.page.size, 10) || 20;
  const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
  // originally had issue with the query akin to this => https://github.com/sequelize/sequelize/issues/9507
  // the required:true is necessary to turn the left outer join into an inner join for model lots
  // the duplicating:true option avoids the error reported in the github issue
  const include = [{
    model: models.lots,
    as: 'lots',
    required: true,
    include: [{
      model: models.buildings,
      as: 'building',
      where: { propertyIdKey: propertyId },
      duplicating: true,
    }],
  }];
  const recordsGetter = new RecordsGetter(models.owners);

  const findAndCountAllOwnersQuery = models.owners.findAndCountAll(
    {
      include,
      limit,
      offset,
    },
  );

  return findAndCountAllOwnersQuery
    .then((results) => recordsGetter.serialize(results.rows, { count: results.count }))
    .then((serializedRecords) => response.send(serializedRecords))
    .catch(next);
});

router.get('/properties/:recordId/relationships/lots', permissionMiddlewareCreator.list(), (request, response, next) => {
  const propertyId = request.params.recordId;
  const limit = parseInt(request.query.page.size, 10) || 20;
  const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
  const include = [{
    model: models.buildings,
    as: 'building',
    where: { propertyIdKey: propertyId },
  }, {
    model: models.owners,
    as: 'owner',
  }];
  const recordsGetter = new RecordsGetter(models.lots);
  const findAndCountAllLotsQuery = models.lots.findAndCountAll(
    {
      include,
      limit,
      offset,
    },
  );

  return findAndCountAllLotsQuery
    .then((results) => recordsGetter.serialize(results.rows, { count: results.count }))
    .then((serializedRecords) => response.send(serializedRecords))
    .catch(next);
});

router.post('/actions/add-building', permissionMiddlewareCreator.smartAction(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  const { attributes } = request.body.data;
  models.buildings.create({
    propertyIdKey: attributes.ids[0],
    name: attributes.values.name,
    number: attributes.values.number,
    addressLine1: attributes.values['address line 1'],
    centralHeating: attributes.values['central heating'],
  })
    .then(() => response.send({
      success: 'building created!',
      refresh: { relationships: ['buildings'] },
    }))
    .catch((e) => next(e));
});

router.post('/actions/add-lot', permissionMiddlewareCreator.smartAction(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  const { attributes } = request.body.data;

  const fields = {
    lotNumber: attributes.values.number,
    buildingIdKey: attributes.values.building,
  };
  if (attributes.values.owner) {
    fields.ownerIdKey = attributes.values.owner;
  } else {
    fields.owner = {
      firstName: attributes.values['owner first name'],
      lastName: attributes.values['owner last name'],
      email: attributes.values['owner email'],
    };
  }
  const include = [{
    model: models.owners,
    as: 'owner',
  }, {
    model: models.buildings,
    as: 'building',
  }];

  return models.lots.create(fields, { include })
    .then(() => response.send({
      success: 'building created!',
      refresh: { relationships: ['owners', 'lots'] },
    }));
});

router.post('/actions/add-repartition-key', permissionMiddlewareCreator.smartAction(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  const { attributes } = request.body.data;
  models.repartitionKeys.create({
    propertyIdKey: attributes.ids[0],
    name: attributes.values.name,
    total: attributes.values.total,
  })
    .then(() => response.send({
      success: 'repartition key created!',
      refresh: { relationships: ['repartitionKeys'] },
    }))
    .catch((e) => next(e));
});

module.exports = router;
