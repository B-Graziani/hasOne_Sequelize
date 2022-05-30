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

  //   User.hasMany(Post);
  //   Post.belongsTo(User);

  User.hasMany(Post, { onDelete: "CASCADE" });
  Post.belongsTo(User, { onDelete: "CASCADE" });

  let user, posts;

  sequelize
    .sync({ alter: true })
    .then(() => {
      //   return User.findOne({ where: { username: "testMike" } });
      //=======================
      //   return User.destroy({ where: { username: "testMike" } });
      //=====================
      return User.findOne();
    })
    .then((data) => {
      //   user = data;
      //   //   return Post.findAll();
      //   //==========================
      //   //   return user.countPosts();
      //   //==========================
      //   return Post.findOne();
      //=======================
      user = data;
      return Post.findOne();
    })
    .then((data) => {
      //   //   posts = data;
      //   //   return user.addPosts(posts);
      //   //==========================
      //   posts = data;
      //   return user.removePost(posts);
      //=====================
      posts = data;
      posts.setUser(user);
    })
    // .then((data) => {
    //   console.log(data);
    // })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  initDb2,
};
