const app = require("../index");
const dbSync = require("./sync-db");

dbSync().then((_) => {
  console.log("sync db...");
  app.listen(3001, () => {
    console.log(`server start...`);
  });
});
