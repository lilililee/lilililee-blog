<template>
  <header class="header">
    <el-progress 
    v-show="progress!=100"
    :text-inside="true" 
    :stroke-width="2" 
    :percentage="progress">
      
    </el-progress>
      
    <div class="container">

      <el-row type="flex" justify="space-between">

        <el-col :sm="4" class="logo">
          <img src="../assets/images/logo4.png" alt="">
        </el-col>
        <el-col :span="20" class="caption">
          <div class="motto">人生如逆旅，我亦是行人!</div>  
        </el-col>
        <i class="menu iconfont icon-mulu3" @click="toggleMenu"></i>
      </el-row>

    </div>

  </header>



</template>

<script>
  export default {
    name: 'vHeader',
    data () {
      return {
        
      }
    },
    computed: {
      isShowMenu(){
        return this.$store.state.isShowMenu;
      },
      progress() {
        return this.$store.state.progress;
      }
    },
    

    methods: {
      toggleMenu() {
        this.$store.commit('updateIsShowMenu', !this.isShowMenu);
      }
    }
  }
</script>
