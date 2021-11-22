import Product from '../../database/models/Product';
import User from '../../database/models/User';
import UserProduct from '../../database/models/UserProduct';
import jwt from 'jsonwebtoken';

import paginationFormatter from '../utils/paginationFormatter';

module.exports = () => {
  const service = {};

  service.findAll = async (req, res) => {
    const { type } = req.body;
    if (type == 'list') {
      let { page = 1, per_page: perPage = 10 } = req.query;
      if (Number(page) <= 0) page = 1;
      if (Number(perPage) < 0) perPage = 1000;

      let { findOptions } = req.query;
      console.log();
      if (!findOptions) findOptions = '*';

      const users = await User.sequelize.query(
        `select ${findOptions} from users`,
        {
          type: User.sequelize.QueryTypes.Select,
          model: User,
          mapToModel: true,
        }
      );

      const usersCount = await User.count({
        distinct: true,
      });

      const paginatedResults = paginationFormatter(
        users,
        page,
        perPage,
        usersCount
      );

      return res.status(200).json(paginatedResults);

    } else if (type == 'products'){

      const result = await User.findAll({
        attributes: ['name'],
        group: ['User.id', 'User.name', 'userProducts->product.id', 'userProducts.id'],
        //raw: true,
        include: [
          {
            required: true,
            model: UserProduct,
            as: 'userProducts',
            group: 'product_id',
            attributes: ['quantity'],
            include: [
              {
                model: Product,
                as: 'product',
                group: 'id',
                attributes: ['name'],
              }
            ]
          }
        ],
      });
      const productsByUser = result.map(item => {
        const container = {};
        container[item.name] = item.userProducts.map((item) => {
          const container = {};

          container[item.product.name] = item.quantity

          return container
        });
        return container
      })

      console.log(productsByUser)
      return res.status(200).json(productsByUser);
    }
  };

  service.findOne = async (req, res) => {
    const { userId } = req.params;
    console.log('entrando aqui');
    const user = await User.findByPk(userId);

    return res.status(200).json(user);
  };

  service.create = async (req, res) => {
    res.send(await User.create(req.body));
  };

  service.update = async (req, res) => {
    res.send(
      await User.update({ ...req.body }, { where: { id: req.params.userId } })
    );
  };

  service.delete = async (req, res) => {
    res.send(
      await User.destroy({
        where: { id: req.params.userId },
      })
    );
  };

  service.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    console.log('antes ');

    return res.json({
      token: jwt.sign({ ...user }, 'mySecret', {
        expiresIn: '7d',
      }),
    });
  };

  return service;
};
