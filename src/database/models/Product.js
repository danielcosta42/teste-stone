import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.FLOAT,
        weight: Sequelize.FLOAT,
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {

    this.hasMany(models.UserProduct, {
      foreignKey: 'product_id',
      as: 'product',
    });
  }

}

export default Product;
