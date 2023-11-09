const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")


// 获取背包-种子的基本信息
router.get("/BS", async(req, res) =>{
    const search_sql = "SELECT * FROM `UserBagSeed`"
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

// 获取背包-产品的基本信息
router.get("/BC", async(req, res) =>{
    const search_sql = "SELECT * FROM `UserBagCrop`"
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




// 获取背包-道具的基本信息
router.get("/userPP", async(req, res) =>{
    const search_sql = "SELECT * FROM `UserBagProp`"
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

// 通过道具格子提供的道具id 查询道具的所有信息
router.get("/PP", async(req, res) =>{

    let {id} = req.query

    const search_sql = "SELECT * FROM `PropsInfo` WHERE pp_id = ?"

    let {err, rows} = await db.async.all(search_sql,[id])

    if(err == null){
        res.send({
            msg:"道具查询成功",
            rows
        })
    }else{
        res.send({
            msg:"妈的的失败了"
        })
    }
})



module.exports = router