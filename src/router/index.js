import Vue from 'vue'
import Router from 'vue-router'
import vArticle from '@/components/vArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/article',
      name: 'vArticle',
      component: vArticle
    },

    {
    	path: '/', 
    	redirect: '/article?id=10001'
    }
  ]
})
