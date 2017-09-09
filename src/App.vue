<template>
  <div id="app">
   	
    <!-- <router-view></router-view> -->
	  <v-header :progress="progress"></v-header>
    <v-main></v-main>
    <v-footer></v-footer>

    <v-to-top></v-to-top>

  </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
  	return {
  		progress: 0
  	}
  	
  },
  
  mounted() {
  	this.progress = 70;
  }

}
</script>

