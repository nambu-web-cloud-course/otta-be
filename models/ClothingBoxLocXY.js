const Sequelize = require('sequelize');

class ClothingBoxLocXY extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
        },
        x: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
        },
        y: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'ClothingBoxLocXY',
        tableName: 'ClothingBoxLocXY',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.ClothingBoxLocXY.belongsTo(db.ClothingBoxLoc, {
      foreignKey: 'id',
      // sourceKey: id,
    });
  }
}

module.exports = ClothingBoxLocXY;
