const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")



// 更新状态
router.post("/have", async (req, res) => {
    
    let id = req.body.id;

    const update_sql = "UPDATE `zwinfo` SET `zw_tj_state` = ? WHERE `zw_id` = ?"
    
    let params = [1, id]

    let { err, rows } = await db.async.run(update_sql, params)

    if (err == null) {
        res.send({
            msg: "修改成功ok"
        })
    } else {
        res.send({
            msg: "修改失败"
        })
    }
})




    
 
// 查询原本数量
router.post("/search", async(req, res) =>{
    let id = req.body.id
   

    const search_sql = "SELECT * FROM `UserCollectionHistory` WHERE `zw_id` = ? "

    let {err, rows} = await db.async.all(search_sql,[id])


    if(err == null){
        res.send({
            msg:"存在",
            rows,
            exist:1
        })
    }else{
        res.send({
            msg:"妈的的失败了",
            exist:0
        })
    }

})


// 更新数量
router.post("/update", async (req, res) => {
    
    let id = req.body.id;
    let num = req.body.num

    const update_sql = "UPDATE `UserCollectionHistory` SET `ct_qty` = ? WHERE `zw_id` = ?"
    
    let params = [num, id]

    let { err, rows } = await db.async.run(update_sql, params)

    if (err == null) {
        res.send({
            msg: "修改成功ok"
        })
    } else {
        res.send({
            msg: "修改失败"
        })
    }
})

// 添加历史记录
router.post("/add", async (req, res) => {
    let id = req.body.id
    let xid = genid.NextId()
    const add_sql = "INSERT INTO `UserCollectionHistory`(`id`,`zw_id`,`ct_qty`) VALUES (?,?,?)"
    let params = [xid,id,1]
    let { err, rows } = await db.async.run(add_sql, params)

    if (err == null) {
        res.send({
            msg: "植物种类修改成功"
        })
    } else {
        res.send({
            msg: "修改失败"
        })
    }
})  






module.exports = router