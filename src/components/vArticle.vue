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
  export default {
    name: '',
    data () {
      return {
        articleContent: '',
        loading: true
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
      }
    },
    watch: {
      articleId() {
        this.getArticle();
      }
    },
    updated() {
        this.$hljs.initHighlighting.called = false;
        this.$hljs.initHighlighting();
    },
    methods: {
      getArticle() {
        this.loading = true;
        this.articleContent = '';
        let xhr = new XMLHttpRequest();
        // 在生成环境中打包会自动添加 /blog/路径
        xhr.open('get', `./static/articles/${this.articleId}.html`);
        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4 ) {
            
            if (xhr.status == 200) {
              this.articleContent = xhr.responseText;
            } else {
              this.articleContent = '获取文章失败...'
            }

            this.loading = false;       
            this.$store.commit('updateIsShowMenu', false);
            
            
          } 
          
        }
        xhr.send(null);
      }

    }
  }
</script>
