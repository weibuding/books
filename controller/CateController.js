const path = require('path');
const { title } = require('process');
const CateController = {};

// 导入模型
const query = require('../model/query.js')


CateController.index = (req, res) => {
    res.render(`catelist.html`)
}

CateController.add = (req, res) => {
    // res.sendFile( path.join(path.dirname(__dirname), 'views/add.html'))
    res.render(`add.html`)
}

CateController.gade = (req, res) => {
    // res.sendFile( path.join(path.dirname(__dirname), 'views/add.html'))
    res.render(`gade.html`)
}

CateController.books = (req, res) => {
    // res.sendFile( path.join(path.dirname(__dirname), 'views/add.html'))
    res.render(`books.html`)
}


CateController.bookkstrap = (req, res) => {
    // res.sendFile( path.join(path.dirname(__dirname), 'views/add.html'))
    res.render(`bokkstrap.html`)
}
// bokkstrap.html


CateController.cateCount = async (req, res) => {
    const sql = 'SELECT count(t1.id) total,t2.text  FROM heisi t1 LEFT JOIN text t2 on t1.cata_id = t2.cata_id GROUP BY t1.cata_id;';
    let result = await query(sql)
    result = result.map(item => {
        if (!item.text) {
            item.text = '未分类'
        }
        return item;
    })
    res.json(result)
}

CateController.cateCounts = async (req, res) => {
    const sql = 'SELECT count(t1.id) gfade,t3.text  FROM books t1 LEFT JOIN side t3 on t1.cate_id = t3.cata_id GROUP BY t1.cate_id;';
    let result = await query(sql)
    result = result.map(item => {
        if (!item.text) {
            item.text = '未分类'
        }
        return item;
    })
    res.json(result)
}



// 分类接口数据
CateController.cateData = async (req, res) => {
   
    const sql = 'select * from heisi';
    const data = await query(sql)

    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

CateController.updCateData = async (req, res) => {
    //1. 接收post参数
    const {
        id,
        title,
        name,
       old
    } = req.body;
   
    const sql = `update heisi set title = '${title}', name = '${name}',old = ${old} 
    where id = ${id}`;
    const {
        affectedRows
    } = await query(sql)
    const successData = {
        code: 0,
        message: "update success"
    }
    const failData = {
        code: 1,
        message: "fail success"
    }

    if (affectedRows > 0) {
        res.json(successData)
    } else {
        res.json(failData)
    }
}

CateController.remove = async(req,res)=>{
   const{id} = req.body;
   let sql = `delete from heisi where id = ${id}`;

   const {
    affectedRows
} = await query(sql)
const successData = {
    code: 0,
    message: "delete success"
}
const failData = {
    code: 1,
    message: "fail success"
}

if (affectedRows > 0) {
    res.json(successData)
} else {
    res.json(failData)
}
}

CateController.adddata = async(req, res) => {
    const {
        old,
        title,
        name
    } = req.body;
    let sql = `insert into heisi(title,name,old) values ('${title}', '${name}',${old} )`
    const {
        affectedRows
    } = await query(sql)
    const successData = {
        code: 0,
        message: "add success"
    }
    const failData = {
        code: 1,
        message: "fail succes"
    }
    
    if (affectedRows > 0) {
        res.json(successData)
    } else {
        res.json(failData)
    }
}


//文章列表
CateController.write = async (req, res) => {
   const {page,limit,id} = req.query;
    const sql1 = 'select count(id) as count from books';
    const filedata = await query(sql1)
    const {count} = filedata[0]
    const one = (page - 1)*limit;
    const sql2 = `select * from books limit ${one},${limit}`
    const data = await query(sql2)
    const responseData = {
        count,
        data,
        code: 0,
        msg: "成功"
    }
    res.json(responseData)
}

CateController.addbooks = async(req,res) =>{
    const sql = `select * from side`
    const data = await query(sql)

    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

CateController.delete = async(req,res)=>{
    const{id} = req.body;
    console.log(req.body);
    let sql = `delete from books where id = ${id}`;
 
    const {
     affectedRows
 } = await query(sql)
 console.log({id});
 const successData = {
     code: 0,
     message: "delete success"
 }
 const failData = {
     code: 1,
     message: "fail success"
 }
 
 if (affectedRows > 0) {
     res.json(successData)
 } else {
     res.json(failData)
 }
 }

CateController.hg =(req,res)=>{
    res.render(`hg.html`)
}

module.exports = CateController;