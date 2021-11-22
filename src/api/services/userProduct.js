import Product from '../../database/models/Product';
import User from '../../database/models/User';
import UserProduct from '../../database/models/UserProduct';

import paginationFormatter from '../utils/paginationFormatter';

module.exports = () => {
  const service = {};

  service.listProducts = async (req, res) => {
    cont { type } = req.body;

      const result = await UserProduct.findAll({
        include: [
          {
            model: Product,
            as: 'product',
          },
          {
            model: User,
            as: 'user',
          },
        ],
      });

      res.status(200).send(result);

  }

  service.genericAction = async (req, res) => {
    const { type, userId, productId, quantity } = req.body;

    if (type == 'add') {
      res.send(
        await UserProduct.create({
          userId,
          productId,
          quantity,
        })
      );
    }
  };

  service.delete = async (req, res) => {
    res.send(
      await UserProduct.destroy({
        where: {
          id: req.params.id,
        },
      })
    );
  };

  return service;
};
