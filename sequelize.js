const { Sequelize, DataTypes } = require("sequelize");

// ONE TO ONE

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

const initDb = () => {
  //ONE TO ONE ASSOCIATION( HASONE)
  const Country = sequelize.define(
    "country",
    {
      countryName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

  const Capital = sequelize.define(
    "capital",
    {
      capitalName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
  // Country.hasOne(Capital);
  // Capital.belongsTo(Country);

  //i delete both
  // Country.hasOne(Capital, { onDelete: "CASCADE" });
  //i update this
  Country.hasOne(Capital, { onUpdate: "CASCADE" });
  Capital.belongsTo(Country, { onDelete: "CASCADE" });

  let country, capital;

  sequelize
    .sync({ alter: true })
    .then(() => {
      //   return Capital.findOne({ where: { capitalName: "Madrid" } });
      // =====================
      //   return Country.findOne({ where: { countryName: "Spain" } });
      // =====================
      //   return Country.create({
      //     countryName: "USA",
      //   });
      // =====================
      // return Country.findOne({ where: { countryName: "France" } });
      // =====================
      // return Country.destroy({ where: { countryName: "Spain" } });
      // ======================
      return Country.findOne({ where: { countryName: "France" } });
    })
    .then((data) => {
      //   capital = data;
      //   return Country.findOne({ where: { countryName: "Spain" } });
      //======================
      //   country = data;
      //   return country.getCapital();
      // =====================
      //   country = data;
      //   return country.createCapital({
      //     capitalName: "Washington",
      // =====================
      country = data;
      return Capital.findOne({ where: { capitalName: "Paris" } });
    })
    // =====================
    // country = data;
    // return Capital.findOne({ where: { capitalName: "Paris" } });
    // =====================
    // })
    .then((data) => {
      //   country = data;
      //   country.setCapital(capital);
      //=========================
      //   console.log(data.toJSON());
      //=========================
      //   console.log(data.toJSON());
      // =====================
      // capital = data;
      // return capital.setCountry(country);
      // =====================
      capital = data;
      // return country.setCapital(capital);
      // =====================
      return capital.setCountry(country);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  initDb,
};
