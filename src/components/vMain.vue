<template>
  <section class="main-content">
    <div class="container">
     <el-row :gutter="30">
     <el-col :sm="6">
        <v-aside></v-aside>
      </el-col>
      <el-col :sm="18">
        <router-view></router-view>
      </el-col>
    </el-row> 
  </div>

   
</section>

</template>

<script>
  import vAside from '@/components/vAside'
  export default {
    name: 'vMain',
    data () {
      return {

      }
    },

    components: { 'v-aside': vAside }
  }
</script>
