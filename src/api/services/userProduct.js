import Product from '../../database/models/Product';
import User from '../../database/models/User';
import UserProduct from '../../database/models/UserProduct';

import paginationFormatter from '../utils/paginationFormatter';

module.exports = () => {
  const service = {};

  service.listProducts = async (req, res) => {
    const { type } = req.body;

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

  };

  service.genericAction = async (req, res) => {
    const { type, userId, productId, quantity, userSource, userTarget } = req.body;

    if (type == 'add') {
      res.send(
        await UserProduct.create({
          userId,
          productId,
          quantity,
        })
      );
    } else if (type == 'updateQuantity') {
      res.send(
        await UserProduct.update({ ...req.body }, { where: { user_id: req.body.userId, product_id: req.body.productId } })
      );
    } else if (type == 'tradeProducts') {
      const source = await UserProduct.findOne({ where: { user_id: req.body.userSource, product_id: req.body.productId } });
      const target = await UserProduct.findOne({ where: { user_id: req.body.userTarget, product_id: req.body.productId } });

      if(source.quantity >= req.body.quantity){
        if(target !== null){

          await source.decrement(['quantity'], { by: req.body.quantity });

          await target.increment(['quantity'], { by: req.body.quantity });

          res.json({ error: 0, message: "Itens trocados com sucesso" });
        }

      }
      res.json({ error: 1, message: "Não foi possível trocar itens" });
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
