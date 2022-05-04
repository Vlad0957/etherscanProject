'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction }) {
      // define association here
      // this.hasMany(Transaction, {foreignKey: "blockNumber", as: 'transactions'})
    }
  }
  Block.init({
    number: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    sequelize,
    // tableName: 'block',
    modelName: 'Block',
  });
  return Block;
};
