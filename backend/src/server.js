const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const authRouter = require('./components/auth/authAPI');
const userRouter = require('./components/user/userAPI');
const companyRouter = require('./components/company/companyAPI');
const inspectionRouter = require('./components/inspection/inspectionAPI');
const itemRouter = require('./components/item/itemAPI');
const vehicleRouter = require('./components/vehicle/vehicleAPI');
const syncRouter = require('./components/sync/syncAPI');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/inspection', inspectionRouter);
app.use('/item', itemRouter);
app.use('/vehicle', vehicleRouter);
app.use('/sync', syncRouter);
app.use('/auth', authRouter);

app.get('/test', (req, res) => {
  res.send({message: "Checkcar API it's working! \o/" });
});

module.exports = app;