<template>
    <div class="infoall">
        <div class="tobag"><router-link to="/UserBag">背包</router-link></div>
        <div><router-link to="/tujian">图鉴</router-link></div>
        <div>签到</div>

        <div @click="reset">重置</div>
        <div><router-link to="/panel">后台</router-link></div>
        
    </div>
</template>

<script setup>

    import {ref, reactive, onMounted , inject} from "vue"
    const axios = inject("axios")
    const reset = async()=>{
        let toreset = await axios.get("/sow/reset")  
        console.log(toreset);
        window.location.reload()
    }

</script>

<style scoped>
.infoall{
    background-color: bisque;
    min-height: 50px;
    width: 1300px;
    text-align: center;
    border-radius: 0 0 15px 15px;
    display: flex;
    align-items: center;
    padding: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5)

}
.infoall>div{
    width: 60px;
    height: 40px;
    line-height: 40px;
    background-color: azure;
    margin: 0 20px;
    border-radius: 12px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5)
}
.bag{
    position: absolute;
    /* display: none; */
    width: 100px;
    height: 100;
    background-color: blue;
}
</style>