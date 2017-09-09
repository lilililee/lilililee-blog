<template>
  <aside class="aside-nav" :class="{active:isShowMenu}" @click.self="toggleMenu" >
    <div> </div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true">

      <el-menu-item :index="handlePath(articleList.introduce.id)"><i class="el-icon-menu"></i>个人简介</el-menu-item>
      <el-menu-item :index="handlePath(articleList.life.id)"><i class="el-icon-document"></i>生活杂记</el-menu-item>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-edit"></i>前端博文</template>
        <el-menu-item-group v-for="(value, key) in articleList.learing">
          <template slot="title">{{key}}</template>
          <el-menu-item :index="handlePath(item.id)" v-for="item in value">{{item.title}}</el-menu-item>    
        </el-menu-item-group>      
      </el-submenu>

    </el-menu>

  </aside>

</template>

<script>
  import list from "@/assets/articles/list"

  export default {
    name: 'vAside',
    data () {
      return {
        articleList: list,
      }
    },
    computed: {
      isShowMenu() {
        return this.$store.state.isShowMenu;
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handlePath(id) {
        return '/article?id=' + id
      },
      toggleMenu() {
        this.$store.commit('updateIsShowMenu', !this.isShowMenu);
      }

    }
  }
</script>
