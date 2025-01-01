export default {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  LogFile: process.env.LOGFILE == "true",
  app: {
    url: process.env.APP_URL,
  },
  allowsOrigins: [
    "http://localhost:8013",
    "https://linz-dev.muhammadiyah.or.id",
  ],
  jwt: {
    secret: process.env.JWT_SECRET || "supersecret",
  },
  mail: {
    mailer: process.env.MAIL_MAILER || "smtp",
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.MAIL_PORT || "587", 10),
    username: process.env.MAIL_USERNAME || "",
    password: process.env.MAIL_PASSWORD || "",
    encryption: process.env.MAIL_ENCRYPTION || "tls",
    fromAddress: process.env.MAIL_FROM_ADDRESS || "noreply@example.com",
    fromName: process.env.MAIL_FROM_NAME || "Example Name",
  },
};
