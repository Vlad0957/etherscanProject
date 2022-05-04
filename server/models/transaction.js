'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Block}) {
      // define association here
      // this.belongsTo(Block, {foreignKey: 'blockNumber'})
    }
  }
  Transaction.init({
    from:  {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    to:  {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    value:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    blockNumber:  {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    sequelize,
    // tableName: 'transaction',
    modelName: 'Transaction',
  });
  return Transaction;
};
