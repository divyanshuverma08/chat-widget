const isProduction = process.env.NODE_ENV === "production";

const environment = {
    DB: isProduction ? process.env.DB_PROD : process.env.DB_DEV,
    JWT_SECRET: isProduction ? process.env.JWT_SECRECT_PROD : process.env.JWT_SECRET_DEV,
}

module.exports = environment;