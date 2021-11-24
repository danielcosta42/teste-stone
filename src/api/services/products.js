import Product from '../../database/models/Product';
import UserProduct from '../../database/models/UserProduct';

import paginationFormatter from '../utils/paginationFormatter';

module.exports = () => {
  const service = {};

  service.findOne = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    return res.status(200).json(product);
  };

  service.findAll = async (req, res) => {
    const { type } = req.body;
    if (type == 'list') {
      let { page = 1, per_page: perPage = 10 } = req.query;
      if (Number(page) <= 0) page = 1;
      if (Number(perPage) < 0) perPage = 1000;

      const products = await Product.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
      });

      const productsCount = await Product.count({
        distinct: true,
      });

      const paginatedResults = paginationFormatter(
        products,
        page,
        perPage,
        productsCount
      );

      return res.status(200).json(paginatedResults);
    } else if (type == 'quantities'){
      const result = await Product.findAll({
        attributes: ['name', [Product.sequelize.fn('sum', Product.sequelize.col('product.quantity')), 'quantity']],
        group: ['Product.id'],
        //raw: true,
        include: [
          {
            required: true,
            model: UserProduct,
            as: 'product',
            group: 'product_id',
            attributes: []
          }
        ],
      });
      return res.status(200).json(result);
    }
  };

  service.create = async (req, res) => {
    res.send(await Product.create(req.body));
  };

  service.update = async (req, res) => {
    res.send(
      await Product.update(
        { ...req.body },
        { where: { id: req.params.productId } }
      )
    );
  };

  service.delete = async (req, res) => {
    res.send(
      await Product.destroy({
        where: { id: req.params.productId },
      })
    );
  };

  return service;
};
