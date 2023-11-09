const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")


// 播种使用的种子的数量
// 通过提供的植物id 查询植物的所有信息
router.get("/inquiry", async(req, res) =>{

    let {id} = req.query

    const search_sql = "SELECT * FROM `UserBagSeed` WHERE BS_lattice_id = ?"
    let {err, rows} = await db.async.all(search_sql,[id])
    if(err == null){
        res.send({
            id:genid.NextId(),
            rows
        })
    }else{
        res.send({
            msg:"妈的的失败了"
        })
    }
})

// 更新背包中种子的数量
router.post("/update", async (req, res) => {
    let seednum = req.body.seednum;
    let seedid = req.body.seedid
    
    const update_sql = "UPDATE `UserBagSeed` SET `goods_qty` = ? WHERE `BS_lattice_id` = ?"
    
    let params = [seednum, seedid]

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
// 一键重置
router.get("/reset", async (req, res) => {
   
    const update_sql = "UPDATE `PotInfo` SET `sc_state` = ? ,`zw_id` = ? "

    let { err, rows } = await db.async.run(update_sql, [0,23000])

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
router.post("/resetonly", async (req, res) => {
    let id = req.body.id
   
    const update_sql = "UPDATE `PotInfo` SET `sc_state` = ? ,`zw_id` = ? WHERE `pot_id`= ?"

    let { err, rows } = await db.async.run(update_sql, [0,23000,id])

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



  
// 更新花盆中种子的种类
router.post("/updatekind", async (req, res) => {
    let zwid = req.body.zwid
    let potid = req.body.potid;
    
    
    const update_sql = "UPDATE `PotInfo` SET `zw_id` = ? WHERE `pot_id` = ?"
    
    let params = [zwid, potid]

    let { err, rows } = await db.async.run(update_sql, params)

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

// 删除种子数量为 0 的种子格子
router.post("/del", async (req, res) => {
    let seedid = req.body.seedid
    console.log(seedid);
    const del_sql = "DELETE FROM `UserBagSeed` WHERE `BS_lattice_id` = ? "
    
    let { err, rows } = await db.async.run(del_sql, [seedid])

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