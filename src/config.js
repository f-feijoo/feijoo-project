import "dotenv/config";
export default {
  fileSystem: {
    path: "./DB",
  },
  mongodb: {
    cnxStr: process.env.MONGOPASS,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {
    type: "service_account",
    project_id: "coder-ecommerce-f0ff1",
    private_key_id: "f986991fdce5bdaba8c4d203abb516b16d883219",
    private_key: process.env.FBKEY
      ? process.env.FBKEY.replace(/\\n/g, "\n")
      : undefined,
    client_email:
      "firebase-adminsdk-2pjel@coder-ecommerce-f0ff1.iam.gserviceaccount.com",
    client_id: "100648362174915587777",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2pjel%40coder-ecommerce-f0ff1.iam.gserviceaccount.com",
  },
};
