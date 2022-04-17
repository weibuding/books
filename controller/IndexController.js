const fs = require('fs')
const path = require('path')

const moment = require('moment')
const IndexController = {};
const {
    promisify
} = require('util')


const rename = promisify(fs.rename)


const viewsDir = path.join(path.dirname(__dirname), 'views')

const query = require('../model/query.js')



IndexController.index = (req, res) => {
    // res.sendFile(`${viewsDir}/index.html`)
    res.render('index.html', {
        age: 18
    })
}

//修改密码
IndexController.updapassword = async (req,res) =>{
    const {
       password
    } = req.body
    console.log(req.body);
    // console.log(id);
    let {id} = req.session.userInfo;

    console.log(req.session.userInfo);
    // console.log(password);
    const sql = `update login set password = '${password}' where id = ${id} `
    const {
        affectedRows
    } = await query(sql)
    const successData = {
        code: 0,
        message: "修改成功"
    }
    const failData = {
        code: 1,
        message: "修改失败"
        
    }

    if (affectedRows > 0) {
        res.json(successData)
        req.session.destroy(function (err) {
            if (err) {
                throw err;
            }
        })
        console.log('清除成功');
        
    } else {
        res.json(failData)
    }

    

}

IndexController.speakwrite = async (req, res) => {
    const sql = 'SELECT * FROM hhhhh';
    const rows = await query(sql)
    res.json(rows)
}

IndexController.updatawrite = async(req,res)=>{
    let {heisi} = req.body
    console.log(req.body);
    // console.log(req.session.userInfo);
    let sql = `update hhhhh set username = '${heisi}' where id = 1 `
    const {
        affectedRows
    } = await query(sql)
    if(affectedRows > 0){
          const successData = {
        code: 0,
        message: "修改成功"
    }
    console.log('成功');
    }
  
    const failData = {
        code: -1,
        message: "修改失败"
    }
//     console.log('失败');
 }

IndexController.systemData = async (req, res) => {
    const sql = 'select * from login';
    const rows = await query(sql)
    res.json(rows)
}

IndexController.formfile = (req, res) => {
    res.render(`formfile.html`)
}

IndexController.login = (req, res) => {
    res.render(`login.html`)
}

IndexController.takeabout = async (req, res) => {
    //1. 接受参数
    const {
        username,
        password
    } = req.body;
    // console.log(req.body);

    const sql = `select * from login where username = '${username}' and password = '${password}'`

    const result = await query(sql)
    if (result.length > 0) {
        // 将信息记录到session
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })


        res.json({
            code: 0,
            message: "登陆成功"
        })
    } else {
        // 失败则提示用户
        res.json({
            code: -2,
            message: "用户名或者密码有误"
        })
    }

}

IndexController.speaker = async (req, res) => {
    const {
        id,
        intro
    } = req.body;
    const sql = `update login set intro = '${intro}' where id = ${id}`;
    const {
        affectedRows
    } = await query(sql)
    const successData = {
        code: 0,
        message: "修改成功"
    }
    const failData = {
        code: -1,
        message: "修改失败"
    }

    if (affectedRows > 0) {
        // 取出用户信息，再同步session和cookie中的用户信息
        const sql = `select * from login where id = ${id}`
        const result = await query(sql)
        // 将信息记录到session或cookie
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })

        res.json(successData)
    } else {
        res.json(failData)
    }
}


IndexController.writefile = async (req, res) => {
    // 1. 获取用户在session中的信息
    const {
        id, result
    } = req.body
    // console.log(req.session.userInfo);
    console.log(req.body);
    let pic = ''
    if (req.file) {

        let {
            destination,
            originalname,
            filename
        } = req.file;
        console.log(req.file);
        let extName = originalname.substring(originalname.lastIndexOf('.'))
        let uploadDir = './uploads'
        let oldName = path.join(uploadDir, filename);
        let newName = path.join(uploadDir, filename) + extName;

        try {
            fs.renameSync(oldName, newName)
            pic = `uploads/${filename}${extName}` 

             const oldRows = await query(`select picesc from hhhhh where id = 1`)
            const oldPath = path.join(path.dirname(__dirname), oldRows[0].picesc); // 获取旧图完整路径
                 console.log(oldPath);

            // console.log(req.session.userInfo.pic);
            // let oldfile = req.session.userInfo.pic
            // oldfile = path.join(path.dirname(__dirname), oldfile)
            fs.unlink(oldPath,(err)=>{
                console.log('删除成功');
            })
            // console.log(oldfile);
            console.log('成功');
        } catch (err) {
            console.log('上传失败')
        }


        const sql = `update hhhhh set picesc = '${pic}' where id = 1`
        await query(sql)

        const sql2 = `select * from hhhhh where id = 1`
        const result = await query(sql2)

      

        // req.session.userInfo = result[0];
        // res.cookie('userInfo', JSON.stringify(result[0]), {
        //     expires: new Date(Date.now() + 1 * 3600000),
        // })
        res.json({
            code: 0,
            message: "上传成功"
        })
    } else {
        res.json({
            code: -1,
            message: "fail",

        })
    }
}


IndexController.filedata = async (req, res) => {
    // 1. 获取用户在session中的信息
    const {
        id, avatar
    } = req.session.userInfo;
    console.log(req.session.userInfo);

    let pic = ''
    if (req.file) {

        let {
            destination,
            originalname,
            filename
        } = req.file;
        console.log(req.file);
        let extName = originalname.substring(originalname.lastIndexOf('.'))
        let uploadDir = './uploads'
        let oldName = path.join(uploadDir, filename);
        let newName = path.join(uploadDir, filename) + extName;

        try {
            fs.renameSync(oldName, newName)
            pic = `uploads/${filename}${extName}` 

             const oldRows = await query(`select pic from login where id = ${id}`)
            const oldPath = path.join(path.dirname(__dirname), oldRows[0].pic); // 获取旧图完整路径
                 console.log(oldPath);

            // console.log(req.session.userInfo.pic);
            // let oldfile = req.session.userInfo.pic
            // oldfile = path.join(path.dirname(__dirname), oldfile)
            fs.unlink(oldPath,(err)=>{
                console.log('删除成功');
            })
            // console.log(oldfile);
            console.log('成功');
        } catch (err) {
            console.log('上传失败')
        }


        const sql = `update login set pic = '${pic}' where id = ${id}`
        await query(sql)

        const sql2 = `select * from login where id = ${id}`
        const result = await query(sql2)

      

        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 0,
            message: "上传成功"
        })
    } else {
        res.json({
            code: -1,
            message: "fail",

        })
    }
}

IndexController.userLogout = async (req, res) => {
    //1. 清除session
    req.session.destroy(function (err) {
        if (err) {
            throw err;
        }
    })
    //2. 响应json
    res.json({
        code: 0,
        message: "logout success"
    })

}


IndexController.addArtData = async (req, res) => {
    // 1. 接收参数
    const {
        title,
        text,
        name,
        content
    } = req.body;
    console.log(req.body);
    // to do .....
    // const add_date = moment().format('YYYY-MM-DD HH:mm:ss')
    // const id = req.session.userInfo.id;
    let pic = '';
    // 上传文件
    if (req.file) {
        // 2. 上传文件得到路径
        let {
            destination,
            originalname,
            filename
        } = req.file;
        let extName = originalname.substring(originalname.lastIndexOf('.'))
        let uploadDir = './uploads'
        let oldName = path.join(uploadDir, filename);
        let newName = path.join(uploadDir, filename) + extName;

        try {
            fs.renameSync(oldName, newName)
            pic = `uploads/${filename}${extName}` 
        } catch (err) {
            console.log('上传失败')
        }


    }
    //2. 编写sql语句
    let sql = `insert into books(title,old,name,bookstrap,pic) 
            values('${title}','${text}','${name}','${content}','${pic}')`
    const {
        affectedRows
    } = await query(sql)
    //3. 返回结果
    if (affectedRows > 0) {
        res.json({
            code: 0,
            message: '添加文章成功'
        })
    } else {
        res.json({
            code: -7,
            message: '添加文章失败'
        })
    }
}

IndexController.test = (req, res) => {
    res.render(`test.html`)
}

// api数据接口
IndexController.apiData = (req, res) => {
    const myData = [{
        id: 1,
        title: '小样乳酸菌',
        content: '1232',
        author: "爱年轻,爱肠道",
        status: 0,
        pic: "1.png",
        add_date: "2018",
        cate_id: 1
    },
    {
        id: 2,
        title: '蒙牛纯牛奶',
        content: '42322',
        author: "自然好牛奶",
        status: 0,
        pic: "1.png",
        add_date: "2012",
        cate_id: 1
    },
    {
        id: 3,
        title: '特仑苏',
        content: '23123',
        author: "不是每一瓶牛奶都叫特仑苏",
        status: 0,
        pic: "1.png",
        add_date: "2015",
        cate_id: 1
    },
    {
        id: 4,
        title: '安慕希',
        content: '113231',
        author: "浓浓的超好喝",
        status: 0,
        pic: "1.png",
        add_date: "2012",
        cate_id: 1
    },
    {
        id: 5,
        title: '纯甄',
        content: '2356125',
        author: "一口纯真,回归纯与真",
        status: 0,
        pic: "1.png",
        add_date: "2000",
        cate_id: 1
    },
    ]
    res.json({
        code: 0,
        msg: "success",
        count: 100,
        data: myData
    })
}


module.exports = IndexController;