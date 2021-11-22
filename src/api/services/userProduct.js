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
    const { type, userId, productId, quantity, userSource, userTarget, productSource, productTarget } = req.body;

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
      const { Op } = require("sequelize");
      let response = {};

      const source = await UserProduct.findOne({ where: { user_id: req.body.userSource, product_id: req.body.productSource, quantity: { [Op.ne]: 0 } } });

      const sourceA = await UserProduct.findOne({ where: { user_id: req.body.userSource, product_id: req.body.productTarget, quantity: { [Op.ne]: 0 } } });

      const target = await UserProduct.findOne({ where: { user_id: req.body.userTarget, product_id: req.body.productSource, quantity: { [Op.ne]: 0 } } });

      const targetA = await UserProduct.findOne({ where: { user_id: req.body.userTarget, product_id: req.body.productTarget, quantity: { [Op.ne]: 0 } } });

      if(source !== null && source.quantity >= req.body.quantity){
        if(target !== null){

          await source.decrement(['quantity'], { by: req.body.quantity });

          await target.increment(['quantity'], { by: req.body.quantity });

          response = { error: 0, message: "Itens trocados com sucesso" };
        }else if(targetA === null){
          await source.decrement(['quantity'], { by: req.body.quantity });
          await UserProduct.create({
            userId: req.body.userTarget,
            productId: req.body.productSource,
            quantity,
          });
          response = { error: 0, message: "Itens trocados com sucesso" };

        }else{
          response = { error: 0, message: "Pessoa ou produto não encontrado" };
        }

      }else{
        response = { error: 1, message: "Usuário source não possui a quantitidade do produto" };
      }
      res.json(response);
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
