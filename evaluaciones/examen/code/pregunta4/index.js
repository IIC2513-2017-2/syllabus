const Koa = require('koa');

const app = new Koa();

/***** RESPUESTA ******/
const RATE_LIMIT_MS_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // max requests per window
const ipRequestsDates = {};

app.use(async (ctx, next) => {
  const now = new Date();
  const { ip } = ctx.request;
  // create new requests dates array with just recent (according to RATE_LIMIT_MS_WINDOW) requests
  ipRequestsDates[ip] = (ipRequestsDates[ip] || []).filter(date => now - date < RATE_LIMIT_MS_WINDOW);
  ctx.assert(ipRequestsDates[ip].length < RATE_LIMIT_MAX_REQUESTS, 429); // HTTP status 429 is "Too Many Requests"
  ipRequestsDates[ip].push(now);
  await next();
});
/***** FIN RESPUESTA ******/

app.use(async (ctx) => {
  // artificial delay
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });
  ctx.body = 'Done!';
});

app.listen(3000);