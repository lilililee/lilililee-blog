<template>
  <article class="article">
    
    <iframe id="article-iframe" :src="iframeSrc"  scrolling="no" width="100%" height="100%" frameborder="0"></iframe>

  </article>

</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {

      }
    },
    computed: {
      iframeSrc () {
        return `./static/articles/${this.$route.query.id}.html`
      }
    },
    mounted() {
        this.setIframeHeight();
        
    },
    updated() {
        // alert(111)
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      
      // 由于iframe高度会坍塌，需通过js设置其高度以避免内容展示不全
      setIframeHeight() {

        let adjust = () => {
          // 父页面iframe标签
          let iframe = document.getElementById('article-iframe');
          // 子页面内容
          let iframeContent = iframe.contentWindow;
          // 获取html高度
          let iframeHtml = iframeContent.document.getElementsByTagName('html')[0];
          iframe.style.height = iframeHtml.offsetHeight + 'px';
        }

        window.addEventListener('load', adjust, false); 
        // !!bug 在窗口变化时，由大变小，iframe内的html会降低高度，但是由小变大高度却保持不变，所以该函数无法调节
        window.addEventListener('resize', adjust, false);

      }
    }
  }
</script>
