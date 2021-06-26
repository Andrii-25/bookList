const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./jsonserver/db.json');
const middlelewares = jsonServer.defaults();
const PORT = process.env.PORT || 8000;
server.use(middlelewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(router);
server.listen(PORT, () => {
    console.log('Server is running');
});