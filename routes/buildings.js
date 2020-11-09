const express = require('express');
const { PermissionMiddlewareCreator, RecordSerializer, RecordsGetter } = require('forest-express-sequelize');
const models = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('buildings');

router.get('/buildings/:recordId/relationships/owners', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  const buildingId = request.params.recordId;
  const limit = parseInt(request.query.page.size, 10) || 20;
  const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
  const include = [{
    model: models.lots,
    as: 'lots',
    where: { buildingIdKey: buildingId },
  }];
  // const recordSerializer = new RecordSerializer({ name: 'owners' });
  const recordsGetter = new RecordsGetter(models.owners);
  const findAllQuery = models.owners.findAll(
    {
      include,
      limit,
      offset,
    },
  );
  const countQuery = models.owners.count({ include });

  Promise.all([findAllQuery, countQuery])
    .then((owners, count) => recordsGetter.serialize(owners[0]))
    .then((ownersSerialized) => response.send(ownersSerialized))
    .catch(next);
});

// Create a Building
router.post('/buildings', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Building
router.put('/buildings/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Building
router.delete('/buildings/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Buildings
router.get('/buildings', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Buildings
router.get('/buildings/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Building
router.get('/buildings/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Buildings
router.get('/buildings.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Buildings
router.delete('/buildings', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
