const { Sequelize, DataTypes } = require("sequelize");

//ONE TO MANY

sequelize = new Sequelize("differentes-relations", "root", "root", {
  port: 8889,
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connexion etablis");
  })
  .catch((error) => {
    console.log(error);
  });

const initDb2 = () => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  const Post = sequelize.define(
    "post",
    {
      message: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  User.hasMany(Post);
  Post.belongsTo(User);

  sequelize
    .sync({ alter: true })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  initDb2,
};
