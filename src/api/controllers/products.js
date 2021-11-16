import ValidateExceptionns from '../utils/validateExceptions';

import adminAuth from '../middleware/adminAuth';

module.exports = function(app) {
  //console.log(app.services.products)
  const service = app.services.products;
  const validations = app.validations.products;

  const baseURL = '/products';

  const baseValidateAndControllerCall = async (serviceName, req, res) => {
    const errors = await validations[serviceName](req, res);
    if (errors.length === 0) {
      service[serviceName](req, res);
    } else {
      res
        .status(400)
        .send(
          new ValidateExceptionns(
            400,
            'Erro ao processar solicitação!',
            req.url,
            errors
          )
        );
    }
  };

  app.get(`${baseURL}/:productId`, (req, res) =>
    baseValidateAndControllerCall('findOne', req, res)
  );

  app.get(`${baseURL}`, (req, res) =>
    baseValidateAndControllerCall('findAll', req, res)
  );

  app.post(`${baseURL}`, adminAuth, (req, res) =>
    baseValidateAndControllerCall('create', req, res)
  );

  app.put(`${baseURL}/:productId`, adminAuth, (req, res) =>
    baseValidateAndControllerCall('update', req, res)
  );

  app.delete(`${baseURL}/:productId`, adminAuth, (req, res) =>
    baseValidateAndControllerCall('delete', req, res)
  );
};
