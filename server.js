const Koa = require('koa')
const Router = require('koa-router')
const nodemailer = require('nodemailer')

const router = new Router()
const app = new Koa()

const EMAIL_HOSTNAME = process.env.EMAIL_HOSTNAME
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_TO = process.env.EMAIL_TO
const EMAIL_FROM = process.env.EMAIL_FROM

var transporter = nodemailer.createTransport({
    host: EMAIL_HOSTNAME,
    port: 587,
    secure:false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
});

transporter.verify((err, success) => {
    if(err){
        console.log(err);
        process.exit();
    }else if(success){
        console.log(`
TEXT NOTIFY SERVER
MAIL HOST:   ${EMAIL_HOSTNAME}
MAIL USER:   ${EMAIL_USER}
SENDING AS:  ${EMAIL_FROM}
SENDING TO:  ${EMAIL_TO}
        `)
        
    }
})

function sendText(message, subject){
    transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        text:message
    })
}

router.get("/", async (ctx, next) => {
    ctx.body = "Hello world";
})

router.get("/notify", async (ctx, next) => {
    let content = ctx.query["m"];
    if (content){
        console.log("Sending message: ", content);
        sendText(content, ctx.query['s']);
    }
})


app.use(router.routes());

app.listen(80)

