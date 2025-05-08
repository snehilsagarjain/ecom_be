const user = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const secretKey = 'asdfgghhjklj;ieyyurorpr[knvvm,llnvkvl'
const nodeMailer = require('nodemailer');
const moment = require('moment');

exports.createUser = async (req, res) => {
    try {
        const { supplierId, name, email, password, phone, role } = req.body
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(role);
        console.log(typeof (role));

        if (role == "admin") { console.log("16"); }
        else console.log("20");
        if (role == 'admin') { console.log("17"); }
        else console.log("20");
        if (role === "admin") { console.log("18"); }
        else console.log("20");
        if (role === 'admin') { console.log("19"); }
        else console.log("20");

        if (!(name && email && password && phone)) { return res.status(404).json({ message: "all fields are required" }) }
        console.log(user);
        const userEmail = await user.findOne({ email: email })
        console.log(userEmail);
        if (userEmail) { return res.status(400).json({ message: "email already exist" }) }
        const salt = bcrypt.genSaltSync(10);
        console.log(`>>>>>>>>>salt>>>>>`, salt);
        const hash = bcrypt.hashSync(password, salt);
        console.log(`>>>>>>>hash>>>>`, hash);
        let data;

        if (supplierId && role == "supplier") { data = { supplierId, name, email, password: hash, phone, role: "supplier" } }
        else if ((supplierId && (!role || role != "supplier")) || (!supplierId && role == "supplier")) { /* Error */ }
        else if (role == "admin") { data = { supplierId, name, email, password: hash, phone, role: "admin" } }
        else { data = { supplierId, name, email, password: hash, phone } }

        console.log(`>>>>>>>>data>>>>>`, data)
        if (!data) { return res.status(404).json({ message: 'no data' }) }
        const users = new user(data)
        console.log(`>>>>>>>>user>>>>>>`, users)
        if (!users) { return res.status(404).json({ message: 'user data not received' }) }

        await users.save();
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }

}

exports.UpdateUser = async (req, res) => {
    const { id } = req.body
    const data = req.body
    console.log(id)

    if (!id) { return res.status(404).json({ error: "ID IS REQUIRED!!!" }) }
    const user = await userModel.findByIdAndUpdate(id, data)
    if (!user) { return res.status(404).json({ error: "record not found" }); }
    res.status(200).json(user)
}

exports.createMail = async (to, subject, message) => {
    try {
        console.log("createMail");
        // const { to, subject, message } = req.body;

        //validation
        // if (!(to && subject && message)) {
        //     res.status(400).json({ message: "All fields required !!" })
        // }

        const transporter = nodeMailer.createTransport({
            //SMTP: "Gmail",
            //port: 465,
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "snehilsagarjain@gmail.com",
                pass: "edbn xmfp wbbn chzd"
            }
        })
        console.log(`>>>>>>>>>transporter`, transporter);

        // "asdfghjkllasdfghjkl
        const data = { to, subject, text: message };
        console.log(`>>>>>>>>>data`, data);
        const result = await transporter.sendMail(data)
        console.log(`>>>>>>>>>result`, result);
        return result;
        // res.status(200).json({ message: "Mail send successfully", success: true, data: message, result })
    }
    catch (error) {
        console.log(error)
    }
}
const generateOtp = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}
exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const userEmail = await userModel.findOne({ email })
    console.log(`>>>>>>>>106>>>>>>>userEmail`, userEmail);
    if (!userEmail) { return res.status(400).json({ message: "email doen't exist" }) }

    const randomOtp = await generateOtp(); console.log(randomOtp);
    const subject = 'otp verification';
    const message = `Otp: ${randomOtp}.\nThis otp is valid upto 5 Minutes.`;
    console.log(message);

    const expirytime = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    console.log(expirytime);

    const result = await this.createMail(email, message, subject)
    // console.log(result);
    // console.log(result.messageId);
    // const userEmail = await userModel.findOne({ email })
    const user = await userModel.findOneAndUpdate(userEmail._id, { otp: randomOtp, expirytime })
    console.log(`>>>>>>>>106>>>>>>>user`, user);
    const userEmails = await userModel.findOne({ email }) // here, { email } shorthand for { email : email }
    console.log(`>>>>>>>>userEmails>>>>>>>userEmails`, userEmails);
    const msgId = result.messageId;
    const output = { userEmails, msgId };
    // if (user) res.status(200).json(user, result.messageId);
    if (user) res.status(200).json(output);


    // const { email, otp } = req.body
    // setTimeout(async () => {
    //     const userEmail1 = await findOne({ email })
    //     userEmail1.otp = null;
    //     await userEmail1.save()
    // }, 5000)
}

// const now = new Date();
// const expirationTime = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now

