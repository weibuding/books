var express = require('express')

var fs = require('fs')
var router = express.Router()
const multer = require('multer')



// 设置上传的目录
const upload = multer({
    dest: './uploads/'
})

// 导入控制器模块
const IndexController = require('../controller/IndexController.js')
const CateController = require('../controller/CateController.js')
const ArtController = require('../controller/ArtController.js')
// const users = require('../controller/name.js')
// 后台首页
router.get('/', IndexController.index)
// 展示分类列表页面
router.get('/catelist', CateController.index)
router.get('/artlist', ArtController.index)
router.post('/speaker',IndexController.speaker)
router.post('/updapassword',IndexController.updapassword)
// 后台登录页
router.get('/login', IndexController.login)
router.get('/test', IndexController.test)
router.post('/takeabout', IndexController.takeabout)
router.post('/userLogout',IndexController.userLogout)
router.get('/apiData', IndexController.apiData)
router.get('/add',CateController.add)
router.post('/adddata',CateController.adddata)
router.get('/systemData',IndexController.systemData )
router.get('/formfile',IndexController.formfile )
router.get('/cateCount',CateController.cateCount)
router.get('/writespeak',IndexController.speakwrite)
router.post('/updatawrite',IndexController.updatawrite)
router.post('/writefile', upload.single('file'),IndexController.writefile)
router.get('/cateCounts',CateController.cateCounts)
router.get('/hg',CateController.hg)
router.post('/filedata', upload.single('file'),IndexController.filedata)

router.post('/addArtData', upload.single('pic'), IndexController.addArtData)
// router.post('/addArtData',upload.single('file'),IndexController.addArtData)
// 分类列表数据接口
router.get('/cateData', CateController.cateData)
router.get('/gade',CateController.gade)

// router.post('/userLogin',users.userLogin)

// router.post('/loginout',users.userLogout)
//文章列表
router.get('/books',CateController.books)
router.get('/bookkstrap',CateController.bookkstrap)
// router.get('/bookst',CateController.bookst)
router.get('/bookstrap',CateController.write)
router.get('/booksadd',CateController.addbooks)
router.post('/delete',CateController.delete)

// 编辑分类的接口  
router.post('/updCateData', CateController.updCateData)

router.post('/remove',CateController.remove)
module.exports = router;