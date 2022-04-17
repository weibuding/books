const express = require('express');
const path = require('path');
const artTemplate = require('art-template');
const express_template = require('express-art-template');
const session = require ('express-session')
const multer = require('multer')
const fs = require('fs')



// 设置上传的目录
const upload = multer({
    dest: './uploads/'
})


// 导入路由模块中间件
const router = require('./router/router.js')

const app = express();

app.use('/static', express.static('static/'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 设置托管静态资源
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(session({
    name: 'sessionID',
    secret: "TRF$#%^&%^12",
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 60000 * 24, // 设置有效期为24分钟，说明：24分钟内，不访问就会过期，如果24分钟内访问了。则有效期重新初始化为24分钟。
    }
}))

app.use((req,res,next)=>{
        // 放行的路由
        const notSessAuth = ['/login', '/takeabout'];
        const reqPath = req.path.toLowerCase()
        if (notSessAuth.includes(reqPath)) {
            // 在，放行
            next();
        } else {
            // 判断sesion，有效继续操作，无效重定向到登录页
            if (req.session.userInfo) {
                next();
            } else {
                // res.sendFile(path.join(__dirname, 'views/login.html'))
                res.redirect('/login')
                return;
            }
        }
  
})
app.use(router)

app.listen(3000, () => {
    console.log('keep is running 3000')
})