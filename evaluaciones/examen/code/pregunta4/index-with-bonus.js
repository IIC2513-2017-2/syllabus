const Koa = require('koa');

const app = new Koa();

/***** RESPUESTA ******/
const RATE_LIMIT_MS_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // max requests per window

function rateLimitMiddlewareBuilder(maxRequests = 5, msWindow = 60 * 1000) {
  const ipRequestsDates = {};
  const ipOngoingRequests = {};
  return async (ctx, next) => {
    const now = new Date();
    const { ip } = ctx.request;
    // check if request from same IP is ongoing, error if it is or mark ongoing if it's not
    ctx.assert(!ipOngoingRequests[ip], 429);
    ipOngoingRequests[ip] = true;
    // create new requests dates array with just recent (according to RATE_LIMIT_MS_WINDOW) requests
    ipRequestsDates[ip] = (ipRequestsDates[ip] || []).filter(date => now - date < msWindow);
    ctx.assert(ipRequestsDates[ip].length < maxRequests, 429);
    ipRequestsDates[ip].push(now);
    await next();
    // after request is processed, we mark it as not ongoing
    delete ipOngoingRequests[ip];
  };
}

app.use(rateLimitMiddlewareBuilder(RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_MS_WINDOW));
/***** FIN RESPUESTA ******/

app.use(async (ctx) => {
  // artificial delay
  await new Promise((resolve) => {
    setTimeout(resolve, 3000); // longer delay to test rejecting more than 1 request at the same time
  });
  ctx.body = 'Done!';
});

app.listen(3000);