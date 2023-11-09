const express = require("express")
const app = express()
const port = 10086



app.use(express.json())


//开放跨域请求
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    else next();
});


app.use("/test", require("./routers/TestRouter.js"))
app.use("/zwinfo", require("./routers/ZwRouter.js"))
app.use("/baginfo", require("./routers/BagRouter.js"))
app.use("/sow", require("./routers/SowRouter.js"))
app.use("/feed", require("./routers/FeedRouter.js"))
app.use("/reap", require("./routers/ReapRouter.js"))


app.all("*",  async(req, res) =>{
    res.send("<h1>ok</h1>")
})








app.listen(port, (req, res) =>{
    console.log("提供服务中.....端口号:10086");
})