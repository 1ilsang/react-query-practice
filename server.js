const Koa = require("koa");
const cors = require("@koa/cors");

const app = new Koa();

// 500 ~ 1500 ms
const getRandom = Math.floor(Math.random() * 1000 + 500);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.use(cors());

const list = [Number(new Date())];

// response
app.use(async (ctx) => {
  if (ctx.path === "/") {
    await sleep(getRandom());
    ctx.body = { text: "Hello, World!" };
    return;
  } else if (ctx.path === "/list") {
    await sleep(getRandom());
    ctx.body = { text: "success", list };
    return;
  } else if (ctx.path === "/add") {
    await sleep(getRandom());
    list.push(Number(new Date()));
    ctx.body = { text: "success", list };
  }
});

app.listen(3030);
