import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: "/index",
  },
  {
    path: '/home',
    name: 'Home',
    redirect: "/index",
    component: Home,
    meta:{
      title : '首页'
    },
    children:[
      {
        path: '/index',
        name: 'Index',
        component:()=>import('../components/Index'),
        meta:{
          title : '首页'
        },
      },
      {
        path: '/category',
        name: 'Category',
        component:()=>import('@/components/category/CategoryList.vue'),
        meta:{
          title : '文章分类'
        },
      },{
        path: '/category/:id',
        name: 'CategoryArticle',
        component:()=>import('@/components/category/CategoryArticle.vue'),
        meta:{
          title : '加载中...'
        },
      },{
        path: '/tag',
        name: 'Tag',
        component:()=>import('@/components/tag/TagList.vue'),
        meta:{
          title : '文章标签'
        },
      },
      {
        path: '/tag/:id',
        name: 'TagArticle',
        component:()=>import('@/components/tag/TagArticle.vue'),
        meta:{
          title : '加载中...'
        },
      },
      {
        path: '/page/:alias',
        name: 'Page',
        component:()=>import('@/components/Page.vue'),
        meta:{
          title : '加载中...'
        },
      },
      {
        path: '/article/:id',
        name: 'ArticleView',
        component:()=>import('@/components/article/ArticleView.vue'),
        meta:{
          title : '加载中...'
        },
      },{
        path: '/search/:key',
        name: 'Search',
        component: () => import( '@/components/Search.vue'),
        meta:{
          title : '文章搜索'
        },
      },{
        path: '/404',
        name: '404',
        component: () => import( '../views/404.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
