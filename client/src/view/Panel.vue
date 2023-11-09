<template >
    <view class="panel-all">
        <div class="p-nav">
            <router-link to="/" class="p-nav-item">回到前台</router-link>
            <div class="p-nav-item">种子信息管理</div>
        </div>
        <div class="panel-content"> 

        </div>
       
    </view>
</template>
  
<script setup>

</script>
  
  
<style scoped>
.panel-all{
    display: flex;
    background-color: aqua;
    height: 100vh;
    width: 100%;
    align-items: center;
    
}
.p-nav{
    display: flex;
    flex-direction: column ;
    width: 15%;
    height: 100%;
    background-color: antiquewhite;
    align-items: center;
    justify-content: center;
}
.p-nav-item{
    width: 100px;
    height: 50px;
    line-height: 50px;
    background-color: blueviolet;
    margin: 20px 0;
}
.panel-content{
    flex: 1;
}

</style>
  