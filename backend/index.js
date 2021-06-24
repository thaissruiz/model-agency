require("dotenv").config()
var port  = process.env.PORT || 3000;
var mongoDbConnString = process.env.MONGO_CONN_STRING
var express = require("express");
var app = express();
var fileUpload = require('express-fileupload');
var path = require("path");
var cors = require('cors');
var objectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken')
var dateFns = require("date-fns")
var CandidateModel = require("./model/candidate").Candidate
var UserModel = require("./model/user").User
var ContactModel = require("./model/contact").Contact
var serveStatic = require('serve-static')

app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', serveStatic('uploads'))
app.use('/app/uploads', serveStatic('uploads'))

//Mongoose Conf.
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbConnString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb connected...")
}).catch((err) => {
    console.log("Err" + err)
})


//Routes
app.get("/", function (request, response) {
    response.send("Node server up")

})
app.get("/models", authToken, function (request, response) {
    CandidateModel.find()
    .then(res => 
        response.send(res)
    )
    .catch(err => console.log(err))

})

app.get("/models/male", function (request, response) {
    CandidateModel.find({gender: "male", approved: 'approved'})
    .then(res => {
        const adultCandidates = res.filter(candidate => {
            const candidateBirthday = dateFns.parse(candidate.birthday, 'yyyy-MM-dd', new Date())
            const candidateAge = dateFns.differenceInCalendarYears(new Date(), candidateBirthday)
            return candidateAge >= 18 ? true : false
        })
        
        response.send(adultCandidates)
    }
    )
    .catch(err => console.log(err))
})

app.get("/models/female", function (request, response) {
    CandidateModel.find({gender: "female", approved: 'approved'})
    .then(res => {
        const adultCandidates = res.filter(candidate => {
            const candidateBirthday = dateFns.parse(candidate.birthday, 'yyyy-MM-dd', new Date())
            const candidateAge = dateFns.differenceInCalendarYears(new Date(), candidateBirthday)
            return candidateAge >= 18 ? true : false
        })
        response.send(adultCandidates)
    }
    )
    .catch(err => console.log(err))
})

app.get("/models/kids", function (request, response) {
    CandidateModel.find({approved: 'approved'})
    .then(res => {
        const kidsCandidates = res.filter(candidate => {
            const candidateBirthday = dateFns.parse(candidate.birthday, 'yyyy-MM-dd', new Date())
            const candidateAge = dateFns.differenceInCalendarYears(new Date(), candidateBirthday)
            return candidateAge < 18 ? true : false
        })
        response.send(kidsCandidates)
    }
    )
    .catch(err => console.log(err))
})

app.post("/upload", function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let photo_1 = req.files.photo1;
    let photo_2 = req.files.photo2;
    let photo_3 = req.files.photo3;
    let photo_4 = req.files.photo4;

    const allPhotos = [photo_1, photo_2, photo_3, photo_4]
    let uploadedPhotosCount = 0;
    let allPhotosPathName = {}
    allPhotos.forEach(function(photo) {
        const filePathName = `${__dirname}/uploads/${Date.now()}_${photo.name}`;
        allPhotosPathName = {...allPhotosPathName, [uploadedPhotosCount] :filePathName}
        photo.mv(filePathName, function(err) {
            if(err) {
                console.log(err.stack);
                return res.status(500).send(err.message)
            }
        })
        uploadedPhotosCount +=1;
    })

    return res.send(allPhotosPathName)
})

app.post("/model", function (request, response) {
    new CandidateModel({
        firstName:request.body.firstName,
        lastName: request.body.lastName,
        birthday: request.body.birthday,
        email: request.body.email,
        gender: request.body.gender,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        country: request.body.country,
        zip: request.body.zip,
        height: request.body.height,
        weight: request.body.weight,
        mannequin: request.body.mannequin,
        shoe: request.body.shoe,
        waist:request.body.weist,
        hip: request.body.hip,
        bustTorax: request.body.bustTorax,
        shirt: request.body.shirt,  
        eyeColor:request.body.eyeColor,
        hairColor:request.body.hairColor,
        photo1: request.body.photo1,
        photo2: request.body.photo2,
        photo3: request.body.photo3,
        photo4: request.body.photo4,
        approved: 'pending_approval'
    }).save().then(() => {
        response.send(JSON.stringify({"message":"Created sucessfuly"}));
    }).catch((err) => {
        console.log("ERR" + err)
    })

})

app.post("/contact", function (request, response) {
    new ContactModel({
        firstName:request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        message: request.body.message
    }).save().then(() => {
        response.send(JSON.stringify({"message":"Created sucessfuly"}));
    }).catch((err) => {
        console.log("ERR" + err)
    })

})

app.put("/model", authToken, function (request, response) {
console.log(request.body)
let candidateId = request.body._id
console.log(candidateId)
let candidateUpDate = {
    firstName:request.body.firstName,
    lastName: request.body.lastName,
    birthday: request.body.birthday,
    email: request.body.email,
    gender: request.body.gender,
    address: request.body.address,
    city: request.body.city,
    state: request.body.state,
    country: request.body.country,
    zip: request.body.zip,
    height: request.body.height,
    weight: request.body.weight,
    mannequin: request.body.mannequin,
    shoe: request.body.shoe,
    weist:request.body.weist,
    hip: request.body.hip,
    bustTorax: request.body.bustTorax,
    shirt: request.body.shirt,  
    eyeColor:request.body.eyeColor,
    hairColor:request.body.hairColor,
    approved: request.body.approved
}

CandidateModel.updateOne({
    _id: objectId(candidateId)
},{$set: candidateUpDate})
    .then(res => 
        response.send(res)
    )
    .catch(err => console.log(err))    
   
})

app.delete("/model", authToken, function (request, response) {
    let candidateDelete = request.body._id
    CandidateModel.deleteOne({
        _id:candidateDelete
    }).then(res => 
        response.send(res)
    ).catch(err => console.log(err))
})

app.post("/admin-signup", function(request, res) {
    const username = request.body.username;
    const password = request.body.password;
    const user = {username, password}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    new UserModel({
        username,
        password,
        token: accessToken
    }).save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
})

app.post("/auth", function(request, res) {
    //Auth user

    const username = request.body.username;
    const pwd = request.body.password;

    UserModel.findOne({
        username
    }).then(dbUser => {
        if(dbUser && dbUser.password === pwd) {
            console.log(dbUser);
            const user = {name: username}

            let accessToken;
            if(dbUser && dbUser.token) {
                accessToken = dbUser.token;
                res.send({ accessToken })
            } else {
                accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                UserModel.updateOne({username},{
                    token: accessToken
                })
                .then(() => {
                    res.send({ accessToken })
                })
                .catch(() => res.sendStatus(500))
            }
        } else {
            res.sendStatus(401)
        }
    })
})

function authToken(req, res, next){
    var authHeader = req.headers["authorization"]
    var token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user){
        if(err) res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(port, function () {
    console.log(`Running server ${port} port`)
})