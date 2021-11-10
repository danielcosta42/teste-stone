import ValidateExceptionns from '../utils/validateExceptions';

import authMiddleware from '../middleware/auth';

module.exports = (app) => {
  const service = app.services.userProduct;
  const validations = app.validations.userProduct;

  const baseURL = '/user-product';

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

  app.post(`${baseURL}`, authMiddleware, (req, res) =>
    baseValidateAndControllerCall('genericAction', req, res)
  );
  app.delete(`${baseURL}/:id`, authMiddleware, (req, res) =>
    baseValidateAndControllerCall('delete', req, res)
  );
};
