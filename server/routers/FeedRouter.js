const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")



// 更新道具背包中道具的数量
router.post("/update", async (req, res) => {
    let num = req.body.num;
    let id = req.body.lat
    
    const update_sql = "UPDATE `UserBagProp` SET `goods_qty` = ? WHERE `BP_lattice_id` = ?"
    
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


// 删除道具数量为 0 的道具格
router.post("/del", async (req, res) => {
    let id = req.body.lat
    const del_sql = "DELETE FROM `UserBagProp` WHERE `BP_lattice_id` = ? "
    
    let { err, rows } = await db.async.run(del_sql, [id])

    if (err == null) {
        res.send({
            msg: "删除成功"
        })
    } else {
        res.send({
            msg: "修改失败"
        })
    }
})  





module.exports = router