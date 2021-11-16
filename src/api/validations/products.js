import * as Yup from 'yup';
import Product from '../../database/models/Product';

import FieldMessage from '../utils/fieldmessage';

module.exports = (products) => {
  const validations = {};

  validations.findAll = async () => [];

  validations.findOne = async (req) => {
    const errors = [];
    const { productId } = req.params;

    const product = await Product.findByPk(productId);

    if (!product) {
      errors.push(new FieldMessage('productId', 'not found'));
      return errors;
    }

    return errors;
  };

  validations.create = async (req) => {
    const errors = [];

    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      weight: Yup.required(),
    });

    try {
      await validationSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
    }

    return errors;
  };

  validations.update = async () => [];

  validations.delete = async () => [];

  return validations;
};
