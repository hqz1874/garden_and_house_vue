const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")



// 查询产品背包中是否含有该植物
router.post("/search", async(req, res) =>{
    let id = req.body.id
    const search_sql = "SELECT * FROM `UserBagCrop` WHERE `goods_id` = ? "
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

// 更新产品背包
router.post("/update", async (req, res) => {
    let id = req.body.id;
    let num = req.body.num
    const update_sql = "UPDATE `UserBagCrop` SET `goods_qty` = ? WHERE `goods_id` = ?"
    
    let params = [num,id]

    let { err, rows } = await db.async.run(update_sql, params)

    if (err == null) {
        res.send({
            msg: "更新成功ok"
        })
    } else {
        res.send({
            msg: "修改失败"
        })
    }
})


// 产品背包添加项目
router.post("/add", async (req, res) => {
    let id = req.body.id
    let xid = genid.NextId()
    const add_sql = "INSERT INTO `UserBagCrop`(`id`,`goods_id`,`goods_qty`) VALUES (?,?,?)"
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