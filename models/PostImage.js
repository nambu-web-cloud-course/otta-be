const Sequelize = require('sequelize');

class PostImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER(10),
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        url: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        order: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
        },
        post_id: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'PostImage',
        tableName: 'PostImage',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.PostImage.belongsTo(db.Post, { foreignKey: 'id' });
  }
}

module.exports = PostImage;
