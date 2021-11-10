import Sequelize, { Model } from 'sequelize';

class UserProduct extends Model {
  static init(sequelize) {
    super.init({
      quantity: Sequelize.INTEGER,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    this.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  }
}

export default UserProduct;
