const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
  // set up method to run on instance data to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    id: {
      // use special Sequelize DataTypes object to provide what type of data it is
      type: DataTypes.INTEGER,
      // equivalent of SQL's 'NOT NULL' option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // this means that the username can be at x characters
        len: [4]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password has to be at least 6 characters long
        len: [6]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // setup beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;