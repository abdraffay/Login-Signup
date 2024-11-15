const Express = require('express');
const app = Express();
const dotenv = require("dotenv").config();
const { connectDB } = require('./Configs/connectionDB');
const { UserAccount } = require('./Models/userAccounts')
const { UserRole } = require('./Models/userRole');
const {ImageHandle} = require("./Middlewares/UploadImage");
const upload = ImageHandle();

const cors = require("cors");
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors())



const { getUserRole, postUserRole, deleteUserRole, updateUserRole } = require('./Controllers/RoleController');
const {CreateUser, loginUser} = require("./Controllers/UserController");


app.route("/userrole").get(getUserRole).post(postUserRole);

app.route("/userrole/:id").delete(deleteUserRole).put(updateUserRole);


app.route("/user").post(upload.single("userImage"),CreateUser);

app .route("/login").post(loginUser)

app.listen(process.env.PORT, function () {
    console.log("Server is running on port " + process.env.PORT);

    connectDB();
})