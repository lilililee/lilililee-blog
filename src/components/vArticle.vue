<template>
  <article class="article"  v-loading="loading"
  element-loading-text="拼命加载中">

  <div class="artile-all" v-show="!loading">
    <div class="article-title">
       <div class="caption" v-if="articleTitle">
          <h1>{{articleTitle}}</h1>
          <small>发表于{{articleTime}} by lilililee &nbsp;  &nbsp;文章类别：{{articleType}} </small>
        </div>
    </div>

    <div class="article-content" v-html="articleContent"></div>

    <div class="article-footer">
        <div class="footer-link">
          <router-link :to="'/article?id=' + articlePrev.id"  class="left-link" v-if="articlePrev">
            <i class="el-icon-arrow-left"></i>
            上一篇：{{articlePrev.title}}
          </router-link> 

          <router-link :to="'/article?id=' + articleNext.id"  class="right-link" v-if="articleNext">        
            下一篇：{{articleNext.title}}
            <i class="el-icon-arrow-right"></i>
          </router-link>
        
        </div>
    </div>
  </div>
<!--    
<div v-loading="loading2"
    element-loading-text="拼命加载中">
      
  </div> -->
  <!-- {{articleContent}} -->
</article>

</template>

<script>
  import {runAjaxScript} from '../assets/scripts/util.js'
  import list from "@/assets/articles/list"

  export default {
    name: '',
    data () {
      return {
        articleTitle: '',
        articleTime: '',
        articleType: '',
        articleContent: '',
        articlePrev: null,
        articleNext: null,
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

      // 让滚动条到顶部
      document.body.scrollTop = 0;
    },
    methods: {
      getArticle() {
        // 先设置标题和上下文章
        
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
                // 设置标题和上下文章
                // 放在此处是为了和文章内容同步显示
                let articleList = list.learing;
                let isFind = false;
                for ( var column in articleList) {
                    if (isFind)  break;
                    let subList = articleList[column];
                    if (articleList.hasOwnProperty(column) && Array.isArray(subList)) {
                      subList.forEach((item, index) => {
                        if( item.id === this.articleId ) {
                            this.articleTitle = item.title;
                            this.articleTime = item.time;
                            this.articleType = column;
                            this.articlePrev = subList[index-1]? subList[index-1] : null;
                            this.articleNext = subList[index+1]? subList[index+1] : null;
                            isFind = true;
                            return false;
                        }
                      })
                    }
                }
                // 设置内容
                this.articleContent = xhr.responseText; 
              } else {
                this.articleContent = '<p>获取文章失败...</p>'
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
