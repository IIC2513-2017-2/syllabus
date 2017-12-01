const Koa = require('koa');
const uuid = require('uuid');

const app = new Koa();

// respuesta
app.use(async (ctx, next) => {
  const before = new Date();
  await next();
  const after = new Date();
  ctx.body = {
    data: ctx.body,
    metadata: {
      timeSpent: after - before,
      requestId: uuid(),
    },
  };
});
// fin respuesta

app.use(async (ctx) => {
  // artificial delay
  await new Promise(resolve => setTimeout(resolve, 3000 * Math.random()));
  ctx.body = {
    foo: 1,
    bar: 'baz',
  };
});

app.listen(3000);