const http = require('http');
const socketio = require('socket.io');

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()

const user_route = require('./Routes/userRoutes')
const supplier_route = require('./Routes/supplierRoutes')
const product_route = require('./Routes/productRoutes');
const address_route = require('./Routes/addressRoutes');
const cart_route = require('./Routes/cartRoutes');
const wishlist_route = require('./Routes/wishlistRoutes');
const auth_route = require('./Routes/authRoutes');
const order_route = require('./Routes/orderRoutes')
const supplierOrder_route = require('./Routes/supplierOrderRoutes')
const inventory_route = require('./Routes/inventoryRoutes')
const loggerMiddleware = require('./middleware/logger');
const userModel = require('./models/userModel');
const { userAuth } = require('./middleware/userAuth');
const chartRoutes = require('./Routes/charts');
// const user = require('../models/userModel')

// const { verifyToken, userAuth, verifyTokenAPI } = require('./middleware/userAuth');
const secretKey = 'asdfgghhjklj;ieyyurorpr[knvvm,llnvkvl'

const app = express();
const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    socket.on('activity', (userId) => {
        io.emit(`activity-${userId}`);
        socket.broadcast.emit(`activity-${userId}`); // notify all others to reset
    });
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/user', user_route)
app.use('/supplier', supplier_route)
app.use('/product', product_route)
app.use('/address', address_route)
app.use('/cart', cart_route)
app.use('/wishlist', wishlist_route)
app.use('/auth', auth_route)
app.use('/order', order_route)
app.use('/supplierOrder', supplierOrder_route)
app.use('/inventory', inventory_route)
app.use('/api', chartRoutes);

const userLogin = async (req, res) => {
    // console.log("157")
    // console.log(`>>>>>>req.user`, req.socket.remoteaddress); // to find ip address of requesting-user.

    //email-password entered: ...verified,, if(otp !null) otp sent: ...verified  :: record fetch

    // const { email, password, otp } = req.body
    const { email, password } = req.body
    // const { email, password } = req.query
    console.log(req.body);
    // return
    const userEmail = await userModel.findOne({ email: email }) // here, { email } shorthand for { email : email }
    if (!userEmail) { return res.status(400).json({ message: "please Signup" }) }
    else { console.log(userEmail); }
    const databasePassword = userEmail.password
    console.log(password)
    console.log(databasePassword)
    const match = await bcrypt.compare(password, databasePassword);
    if (!match) { return res.status(400).json({ message: "Invalid Password" }) }

    // const randomOtp = await generateOtp();
    // console.log(`>>>>>>randomOtp>>>>>>>>>>`, randomOtp);

    // if (userEmail.otp != null) {
    //     const { otp } = req.body
    //     if (!(otp)) { return res.status(400).json({ message: "Please enter otp" }) }
    //     if (userEmail.otp === otp) { userEmail.otp = null; }
    //     else { return res.status(400).json({ message: "Wrong otp" }) }
    // } //Email otp

    // console.log(`req1: `, req);
    // req.user = userEmail; console.log(`req.user: `, req.user);
    // console.log(`req2: `, req);
    const token = jwt.sign({ id: userEmail._id }, secretKey, { expiresIn: '15m' });


    // const LoginData = { count: 1, userId: userEmail._id }
    // const usersLog = new loginDetails(LoginData);
    // await usersLog.save()
    // console.log("187");

    // ++userEmail.login_count;
    // await userEmail.save()
    // console.log("191")
    // const id = userEmail._id;
    // console.log("193")
    // return res.status(200).json({ token, id, message: "userLogin succesfully" });
    // return res.status(200).json({ userEmail, message: "userLogin succesfully" }); //token
    // console.log("73")
    return res.status(200).json({ userEmail, token, message: "userLogin succesfully" });
}
app.post('/login', userLogin);

app.post('/api/refresh-token', userAuth, (req, res) => {
    const user = req.user; // Comes from decoded token
    // process.env.JWT_SECRET
    const newToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: '15m' });
    // const token = jwt.sign({ id: userEmail._id }, secretKey, { expiresIn: '15m' });
    res.json({ token: newToken });
});

app.use('/api', userAuth, loggerMiddleware); // authMiddleware,

// app.get("/protectedRoute", userAuth, (req, res) => { res.json({ message: "Access granted", user: req.user }); });
// app.get("/verifyToken", verifyToken);
// app.get("/verifyToken", verifyTokenAPI);

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log(`connected`) })
    .catch(() => { console.log(`Error in connecting`) })
// app.listen(port, () => { console.log(`server is running at ${port}`) })
app.set('socketio', io);

server.listen(port, () => console.log('Server running on port 6080'));