<template>
  <article class="article"  v-loading="loading"
  element-loading-text="拼命加载中">

  <div class="article-content" v-html="articleContent"></div>
<!--    
<div v-loading="loading2"
    element-loading-text="拼命加载中">
      
  </div> -->
  <!-- {{articleContent}} -->
</article>

</template>

<script>
  import {runAjaxScript} from '../assets/scripts/util.js'

  export default {
    name: '',
    data () {
      return {
        articleContent: '',
        loading: true,
        intervalId: 10000
      }
    },
    mounted() {
      this.getArticle();
    },
    computed: {
      articleId(){
        return this.$route.query.id;
      },
      isShowMenu() {
        return this.$store.state.isShowMenu;
      },
      progress() {
        return this.$store.state.progress;
      }
    },
    watch: {
      articleId() {
        this.getArticle();
      }
    },
    updated() {
      // 执行高亮
      this.$hljs.initHighlighting.called = false;
      this.$hljs.initHighlighting();

      // 执行ajax获得的html中的js
      runAjaxScript(this.articleContent)
    },
    methods: {
      getArticle() {
        this.loading = true;
        this.articleContent = '';
        let xhr = new XMLHttpRequest();

        let count = 0; 

        clearInterval(this.intervalId)
        this.intervalId = setInterval(() => {
          if(count < 99) {
            this.$store.commit('updateProgress', count++);
          }
        },20)

        // 在生成环境中打包会自动添加 /blog/路径
        xhr.open('get', `./static/articles/${this.articleId}.html`);
        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4 ) {
            // 模拟延时操作
            setTimeout(()=>{
              if (xhr.status == 200) {
                this.articleContent = xhr.responseText;

                // 
               
                
              } else {
                this.articleContent = '获取文章失败...'
              }
              this.loading = false;       
              this.$store.commit('updateIsShowMenu', false);
              clearInterval(this.intervalId)
              this.$store.commit('updateProgress', 100);
            },300)
            
            
            
          } 
          
        }
        xhr.send(null);

        
      }

    }
  }
</script>
