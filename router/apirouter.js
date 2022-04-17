var express = require('express')
var router = express.Router()

// 导入Home控制器
const HomeController = require('../controller/Home.js')

// 编辑文章接口
router.get('/article', Home.article)

router.get('/cate', Home.cate)

router.get('/fetchOneArt', Home.fetchOneArt)

router.get('/fetchCateArt', Home.fetchCateArt)







module.exports = router;