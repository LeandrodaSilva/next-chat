export default {
  user: process.env.SQL_DB_USER || "",
  password:process.env.SQL_DB_PASSWORD || "",
  database: process.env.SQL_DB_NAME || "",
  server: process.env.SQL_DB_HOST || "",
  options: {
    encrypt: process.env.SQL_DB_TLS || false,
    trustServerCertificate: process.env.SQL_DB_TRUST_CERT || false
  }
}
