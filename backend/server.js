/////////////// Import dependencies ///////////////
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
/////////////////////////////////////////////////

//////////////////// Configurations /////////////////////
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const mongoUSERNAME = process.env.MONGO_USER;
const mongoPASS = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb+srv://${mongoUSERNAME}:${mongoPASS}@bugblaster.ql7e0sc.mongodb.net/production?retryWrites=true&w=majority`;
////////////////////////////////////////////////////////

/////////////////// Database connection //////////////////
mongoose.connect(mongoURI)
.then(
    () => {
        console.log('Connected successfully to mongodb.');
    },
	( err ) => {
        console.log(`Failed to connect to mongodb. Error: ${err}`);
    }
)
/////////////////////////////////////////////////////////

///////////////////// Import routes ////////////////////
const ProjectRouter = require('./routes/project.route');
const BugRouter = require('./routes/bug.route');
const UpdateRouter = require('./routes/update.route');
const RegisteredEmailRouter = require('./routes/RegisteredEmail.route');
const AdminRouter = require('./routes/admin.route');
///////////////////////////////////////////////////////

//////////////////// Middleware ///////////////////////
app.use(cors());
app.use(express.json({limit: '70mb'}));
app.use(express.urlencoded({limit: '70mb'}));
app.listen(port, () => console.log('RESTful API server started on: ' + port + '.'));
app.use('/project', ProjectRouter);
app.use('/bug', BugRouter);
app.use('/update', UpdateRouter);
app.use('/registeredEmail', RegisteredEmailRouter);
app.use('/admin', AdminRouter);
//////////////////////////////////////////////////////