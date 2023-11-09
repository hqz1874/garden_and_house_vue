<template>
    <div class="gdall">
        <div class="pot" v-for="(pot, index) in showdatapot">
            <div class="pot-id">{{pot.pot_id}}</div>

            <img class="zw-showimg" :src="showdatazw[index].zw_state_0" alt="" v-if="pot.sc_state == 0">
            <img class="zw-showimg" :src="showdatazw[index].zw_state_1" alt="" v-if="pot.sc_state == 1">
            <img class="zw-showimg" :src="showdatazw[index].zw_state_2" alt="" v-if="pot.sc_state == 2">
            <img class="zw-showimg" :src="showdatazw[index].zw_state_3" alt="" v-if="pot.sc_state == 3">
            <img class="zw-showimg" :src="showdatazw[index].zw_state_4" alt="" v-if="pot.sc_state == 4">
                        
            <div class="zw-info">
                <div v-if="pot.sc_state == 0">空</div>
                <div v-if="pot.sc_state == 1">种子期</div>
                <div v-if="pot.sc_state == 2">发芽期</div>
                <div v-if="pot.sc_state == 3">成长中</div>
                <div v-if="pot.sc_state == 4">已成熟</div>
                <div>{{ showdatazw[index]  ? showdatazw[index].zw_name : "请播种" }}</div>
            </div>
            <div class="tool">
                <div class="openbag">播种
                    <div class="seedbag" >
                        <div class="seed" v-for="(lat,index) in showlatBS" 
                        @click="sow(pot.sc_state,pot.pot_id,lat.BS_lattice_id,lat.goods_id)">
                            <img :src="showBS[index].zw_seed" alt="" >
                            <div class="qty">{{lat.goods_qty}}</div>
                        </div>
                    </div>
                </div>
                <div class="openbag">养育
                    <div class="seedbag" >
                        <div class="seed" v-for="(lat,index) in showlatBP" 
                        @click="feed(pot.sc_state,pot.pot_id,lat.BP_lattice_id,showBP[index].pp_effect,lat.goods_qty,pot.zw_id)">
                            <img :src="showBP[index].pp_img" alt="" >
                            <div class="qty">{{lat.goods_qty}}</div>
                        </div>
                    </div>
                </div>
                <div @click="wipe(pot.pot_id)">铲除</div>
                <div @click="reap(pot.sc_state, pot.zw_id, pot.pot_id)">收获</div>
            </div>
        </div> 


     
       


    </div>
</template>

<script setup>
// 基本引入
import {ref, reactive, onMounted , inject} from "vue"
const axios = inject("axios")


onMounted(()=>{
    getzwdata()
})





// 定义展示数据
// 花盆的id  花盆的状态 
const showdatapot = ref([])
// 花盆中植物的信息    
const showdatazw = ref([])

// 从数据库获取数据
const getzwdata = async () =>{
    // 先获取花盆数据  花盆的id     花盆中种植的植物     植物的生长状态
    //               huapen_id         zw_id              sc_state
    let potbackdata =  await axios.get("/zwinfo/givepot");  
    let potdata = potbackdata.data.rows 
    //  输出获取展示的  花盆id    花盆状态值  
    showdatapot.value = potdata

    //提取花盆中的植物id
    let getzwid  = potdata.map((item) =>{
                    let obj = {
                        zw_id : item.zw_id
                    }
                    return obj
                    })
    // 上一步提取的植物id是一个含对象的数组，要把数组转化为简单数组
    let sendid = []
    for(let i=0 ; i<getzwid.length ; i++){
        let arr = Object.values(getzwid[i])
        let arrpush = arr[0]
        sendid.push(arrpush)
    }

    let zwdata = []
    for(let m=0 ; m<sendid.length; m++){
        let zwbackdata = await axios.get("/zwinfo/givezw?id="+sendid[m])
        let zw = zwbackdata.data.rows[0]
        zwdata.push(zw)
    }
    showdatazw.value = zwdata
}

// 种子包资源获取与加载

const showlatBS = ref([])
const showBS = ref([])
onMounted(()=>{
    getSeedBag()
})
//   获取背包里的种子资源
//   设置函数    获取背包内部信息
const getSeedBag = async() =>{
    let seedbackdata = await axios.get("/baginfo/BS")
    let seedbagdata = seedbackdata.data.rows
    showlatBS.value = seedbagdata
    let allzwid  = seedbagdata.map((item) =>{
                    let obj = {
                        goods_id : item.goods_id
                    }
                    return obj
                    })
    // console.log("提取的植物id数组");
    // console.log(allzwid)
    // 转化为数字id 
    let seedsearchid = []
    for(let i=0 ; i<allzwid.length ; i++){
        let arr = Object.values(allzwid[i])
        let arrpush = arr[0]
        seedsearchid.push(arrpush)
    }
    // console.log("这是转化后的纯数字种子植物id数组");
    // console.log(seedsearchid);

    let zwdata = []
    
    for(let m=0 ; m<seedsearchid.length; m++){
        let zwbackdata = await axios.get("/zwinfo/givezw?id="+seedsearchid[m])
        let zw = zwbackdata.data.rows[0]
        zwdata.push(zw)
    }
    showBS.value = zwdata
  }


// 定义播种事件
// 携带参数：  1.植物当前的生长状态 2.该花盆的id  3.播种所用的种子格子  4.播种用的植物id
const sow = async(state,potid,seedout,ZWID) => {
        if(state !=0){
            console.log("已经种植过了");  
        }else{
            // 更新植物盆栽的生长状态
            let uppotevent = await axios.post("/zwinfo/updatepotsc",{id:potid,sc:1})
            // 查询并获取种子的原本数量
            let inquiryQty = await axios.get("/sow/inquiry?id="+seedout)
            let res = inquiryQty.data.rows[0].goods_qty   
            //  减去1表示播种后的数量
            let updateNum = res - 1
            if(updateNum >0){
                 // 把修改后的数值提交给数据库修改
                let upbagNum = await axios.post("/sow/update",{seedid:seedout,seednum:updateNum})
            }else{
                // 小于 0 表示用户没有种子了，需要删除数据中的占的格子（1.避免加载种子背包出现bug  2. 避免无限播种）
                let DelData = await axios.post("/sow/del",{seedid:seedout})
            }
            // 把修改后的种类提交给数据库修改
            let updatekind = await axios.post("/sow/updatekind",{zwid:ZWID,potid:potid})
            // 数据更新   背包数据 
            getSeedBag()
            // 数据更新   植物信息（状态、种类）
            getzwdata()
        }

}

// 道具包资源获取

const showlatBP = ref([])
const showBP = ref([])
onMounted(()=>{
    getPropBag()
})
const getPropBag = async() =>{
    let propbackdata = await axios.get("/baginfo/userPP")
    let ppdata = propbackdata.data.rows
    showlatBP.value = ppdata

    // 提取背包中道具的id
    let getid  = ppdata.map((item) =>{
                    let obj = {
                        goods_id : item.goods_id
                    }
                    return obj
                    })
    // 转化为数字id 
    let searchid = []
    for(let i=0 ; i<getid.length ; i++){
        let arr = Object.values(getid[i])
        let push = arr[0]
        searchid.push(push)
        console.log("id");
        console.log(searchid);
    }
    // 通过道具格子里记录的道具id，查询道具信息，获取展示图
    let ppshowdata = []
    for(let m=0 ; m<searchid.length; m++){
        let ppbackdata = await axios.get("/baginfo/PP?id="+searchid[m])
        let pp = ppbackdata.data.rows[0]
        ppshowdata.push(pp)
    }
    showBP.value = ppshowdata

}

// 定义施肥事件
// 携带参数： 1.生长状态 2.该花盆的id  3.道具所在的道具格   4.道具的效果数值  5.道具的数量   6.花盆中的植物id
const feed = async(state, potid, latid, eff, ppnum,zwid ) => {
        if(state != 4 && zwid != 23000){

            let updatenum = state + eff
            if(updatenum>4){
                updatenum = 4
            }else{
                updatenum = updatenum
            }
            // 更新植物盆栽的生长状态
            let uppotevent = await axios.post("/zwinfo/updatepotsc",{id:potid,sc:updatenum})
            
            // 更新道具数量
            let updateppNum = ppnum - 1

            if(updateppNum >0){
                 // 把修改后的数值提交给数据库修改
                let res = await axios.post("/feed/update",{lat:latid,num:updateppNum})
            }else{
                // 小于 0 表示用户没有种子了，需要删除数据中的占的格子（1.避免加载种子背包出现bug  2. 避免无限播种）
                let DelData = await axios.post("/feed/del",{lat:latid})
            }

            // 数据更新   背包数据 
            getPropBag()
            // 数据更新   植物信息（状态、种类）
            getzwdata()
            
        }else{
            console.log("不能施肥哦~~");
        }
    }

// 定义铲除事件
const wipe = async(id)=>{
    let res = await axios.post("/sow/resetonly",{id:id})  
        getzwdata()
}
// 收获事件
const reap = async(state,zwid,potid)=>{
    if(state !=4){
        console.log("没有成熟呢");
    }else{
        // 查询是否已经存在该植物id的产品格
        let res = await axios.post("/reap/search",{id:zwid})
        console.log(res);
        if(res.data.rows.length==1){
            // 存在，获取原本数量
            console.log(res);
            let backdata = res.data.rows[0].goods_qty
            let newnum = backdata + 1
            console.log(newnum);
            let updatenum = await axios.post("/reap/update",{id:zwid,num:newnum})
        }else{
            // 新增一个产品格子存放
            let add = await axios.post("/reap/add",{id:zwid})
            console.log(zwid);
        }
        wipe(potid)
    }
}


</script>

<style scoped>
.gdall{
    background-color: aqua;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    min-width: 1000px;
    min-height: 500px;
    margin: 20px;

}
.pot{
    margin: 10px;
    background-color: antiquewhite;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 180px;
    height: 280px;
}
.pot-id{
    font-size: 10px;
}
.zw-showimg{
    background-color: black;
    margin-top: 10px;
    width: 150px;
    height: 200px;
    
}
.zw-info{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 20px;
    font-size: 12px;
}

.tool{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    width: 150px;
    background-color: blueviolet;

    border-radius: 8px;
}
.tool>div{
    margin: 5px;
    height: 25px;
    line-height: 25px;
    background-color: aqua;
    border-radius: 6px;
    position: relative;
    font-size: 10px;
}

.seedbag{
    width: 400px;
    height: 100px;
    background-color: blanchedalmond;
    position: absolute;
    display: none;
    overflow:scroll;

}
.openbag:hover .seedbag{
    display: flex;

}
.seed{
    margin: 10px;
    position: relative;
}

.seed>img{
    width: 50px;
    height: 50px;
}
.qty{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25px;
    height: 25px;
    background-color: aqua;
    border-radius: 10px;
    line-height: 25px;
    font-size: 12px;
  }
</style>