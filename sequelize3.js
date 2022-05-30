const { Sequelize, DataTypes } = require("sequelize");

//MANY TO MANY

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

const initDb3 = () => {
  const Customer = sequelize.define(
    "customer",
    {
      customerName: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  const Product = sequelize.define(
    "product",
    {
      productName: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  const CustomerProduct = sequelize.define(
    "customerproduct",
    {
      customerproductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Customer.belongsToMany(Product, { through: CustomerProduct });
  Product.belongsToMany(Customer, { through: CustomerProduct });

  let customer, product;

  // answer about my big problem
  sequelize
    .sync({ alter: true })
    .then(() => {
      //   return Customer.findOne({ where: { customerName: "Mike" } });
      //=====================
      //   return Product.findOne({ where: { productName: "ordi" } });
      //=======================
      return Customer.destroy({ where: { customerName: "Mike" } });
    })
    .then((data) => {
      //   customer = data;
      //   return Product.findAll();
      //=======================
      //   product = data;
      //   return Customer.findAll();
      //========================
      console.log(data);
    })
    // .then((data) => {
    //   //   product = data;
    //   //   customer.addProducts(product);
    //   //=======================
    //   customer = data;
    //   product.addCustomers(customer);
    // })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  initDb3,
};
