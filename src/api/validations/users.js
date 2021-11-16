import * as Yup from 'yup';

import User from '../../database/models/User';
import FieldMessage from '../utils/fieldmessage';

module.exports = () => {
  const validations = {};

  validations.findOne = async () => [];

  validations.findAllProducts = async () => [];

  validations.findAll = async () => [];

  validations.create = async (req) => {
    const errors = [];

    if (!req.body.name) {
      errors.push(new FieldMessage('name', 'field required'));
    }

    if (!req.body.age) {
      errors.push(new FieldMessage('age', 'field required'));
    }

    if (!req.body.email) {
      errors.push(new FieldMessage('email', 'field required'));
    }

    if (!req.body.password) {
      errors.push(new FieldMessage('password', 'field required'));
    }

    return errors;
  };

  validations.update = async () => [];

  validations.delete = async () => [];

  validations.login = async (req) => {
    const errors = [];

    const validationSchema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    try {
      await validationSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      return errors;
    }

    const { email, password } = req.body;
    const user = await User.findAll({ where: { email } });

    if (!user) {
      errors.push(new FieldMessage('email', 'email inexistente'));
      return errors;
    }

    if (user[0].password != password) {
      errors.push(new FieldMessage('password', 'senha incorreta'));
    }

    return errors;
  };

  return validations;
};
