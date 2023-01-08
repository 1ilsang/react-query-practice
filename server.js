const Koa = require("koa");
const cors = require("@koa/cors");

const app = new Koa();

app.use(cors());

// response
app.use((ctx) => {
  ctx.body = { result: "Hello, World!" };
});

app.listen(3030);
