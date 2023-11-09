<script>

</script>

<template>
  <div class="navbox">
      <div><router-link to="/">首页</router-link></div>
      
      <div><router-link to="/huayuan">花棚</router-link></div>
      <div>种子店</div>
      <div><router-link to="/">花店</router-link></div>
        
  </div>
</template>

<style scoped>
a:visited{
    color: black;
}
.navbox{
    display: flex;
    background-color: antiquewhite;
    width: 1300px;
    justify-content: space-around;
    align-items: center;
    box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.5) ;
    border-radius: 10px 10px 0  0;

}
.navbox div{
    width: 120px;
    height: 40px;
    line-height: 40px;
    background-color: white;
  
    padding: 10px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: rgb(19, 19, 19);
    font-size: 20px;
    letter-spacing: 4px;
}

</style>
