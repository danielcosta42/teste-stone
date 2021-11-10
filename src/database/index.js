/* eslint-disable no-unused-expressions */
import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Product from './models/Product';
import User from './models/User';
import UserProduct from './models/UserProduct';

const models = [User, Product, UserProduct];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
    });

    models.forEach((model) => {
      model.associate && model.associate(this.connection.models);
    });
  }
}

export default new DataBase();
