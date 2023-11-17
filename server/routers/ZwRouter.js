const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")


// 获取种植盆的基本信息
router.get("/givepot", async(req, res) =>{
    const search_sql = "SELECT * FROM `PotInfo`"
    let {err, rows} = await db.async.all(search_sql,[])
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
// 通过种植盆提供的植物id 查询植物的所有信息
router.get("/givezw", async(req, res) =>{

    let {id} = req.query


    const search_sql = "SELECT * FROM `zwinfo` WHERE zw_id = ?"
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


// 更新植物生长状态
router.post("/updatepotsc", async (req, res) => {
    let potid = req.body.id;
    let scnum = req.body.sc

    
    const update_sql = "UPDATE `PotInfo` SET `sc_state` = ? WHERE `pot_id` = ?"
    
    let params = [scnum, potid]

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


// 查询所有植物的信息
router.get("/allzw", async(req, res) =>{

  

    const search_sql = "SELECT * FROM `zwinfo` "
    let {err, rows} = await db.async.all(search_sql,[])
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

module.exports = router