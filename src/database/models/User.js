import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models){
    this.hasMany(models.UserProduct, { foreignKey: 'user_id', as: 'userProducts'});
  }
}

export default User;
