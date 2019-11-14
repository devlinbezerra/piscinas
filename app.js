const express = require('express');
const app = express();
const custoRouter = require('./routers/custoRouters');
const clientesRouter = require('./routers/clientesRoutes');
const userRouter = require('./routers/userRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error');

//Midlewares

app.use(express.json());

//Routers

app.use('/api/v1/custo', custoRouter);
app.use('/api/v1/clientes', clientesRouter);
app.use('/api/v1/user', userRouter);

//Error Midleware
app.all('*', (req, res, next) => {
  next(new appError('Ocorreu um erro', 401));
});

app.use(globalErrorHandler);

module.exports = app;
