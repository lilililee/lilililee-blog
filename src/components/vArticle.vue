<template>
  <article class="article" v-html="articleContent">
    <!-- {{articleContent}} -->
  </article>

</template>

<script>
  export default {
    name: '',
    data () {
      return {
        articleContent: ''
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

            this.$store.commit('updateIsShowMenu', false);
            
            
          } 
          
        }
        xhr.send(null);
      }

    }
  }
</script>
