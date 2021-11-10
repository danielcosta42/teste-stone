import ValidateExceptionns from '../utils/validateExceptions';

import authMiddleware from '../middleware/auth';

module.exports = (app) => {
  const service = app.services.users;
  const validations = app.validations.users;

  const baseURL = '/users';

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

  app.get(`${baseURL}/:userId`, authMiddleware, (req, res) =>
    baseValidateAndControllerCall('findOne', req, res)
  );

  app.get(`${baseURL}`, authMiddleware, (req, res) =>
    baseValidateAndControllerCall('findAll', req, res)
  );

  app.post(`${baseURL}`, (req, res) =>
    baseValidateAndControllerCall('create', req, res)
  );

  app.put(`${baseURL}/:userId`, authMiddleware, (req, res) =>
    baseValidateAndControllerCall('update', req, res)
  );

  app.delete(`${baseURL}/:userId`, (req, res) =>
    baseValidateAndControllerCall('delete', req, res)
  );

  app.post(`${baseURL}/login`, (req, res) =>
    baseValidateAndControllerCall('login', req, res)
  );
};
