import handler from './.open-next/worker.js';
export * from './.open-next/worker.js';

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === 'piazzapopoloascoli.com' ||
        (url.hostname === 'www.piazzapopoloascoli.com' && url.protocol === 'http:')) {
      url.protocol = 'https:';
      url.hostname = 'www.piazzapopoloascoli.com';
      url.port = '';
      return Response.redirect(url.href, 308);
    }
    return handler.fetch(request, env, ctx);
  }
};
