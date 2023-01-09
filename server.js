const Koa = require("koa");
const cors = require("@koa/cors");

const app = new Koa();

const sleep = (ms = 1200) => new Promise((resolve) => setTimeout(resolve, ms));

app.use(cors());

const list = [Number(new Date())];

// response
app.use(async (ctx) => {
  if (ctx.path === "/") {
    await sleep();
    ctx.body = { text: "Hello, World!" };
    return;
  } else if (ctx.path === "/list") {
    await sleep();
    ctx.body = { text: "success", list };
    return;
  } else if (ctx.path === "/add") {
    await sleep();
    list.push(Number(new Date()));
    ctx.body = { text: "success", list };
  }
});

app.listen(3030);
