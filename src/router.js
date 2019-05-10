import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Configuration from './components/Admin/Configuration.vue'
import Home from './components/Home.vue'
import Store from './components/Store.vue'
import CoffeeStore from './components/CoffeeStore.vue'
import BrewerStore from './components/BrewerStore.vue'
import Articles from './components/Articles.vue'
import About from './components/About.vue'
import Cafes from './components/Cafes.vue'
import Coffee from './components/Coffee.vue'
import Brewer from './components/Brewer.vue'
import Contacts from './components/Contacts.vue'
import Policy from './components/Policy'
import Policies from './components/Policies'
import Article from './components/Article.vue'

import { projectConfigurationPath } from './Utilities/SelectedProject'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: projectConfigurationPath,
      component: Configuration
    },
    {
      path: '/:lang?/store',
      component: Store,
      children: [
        {
          path: 'coffees',
          component: CoffeeStore,
        },
        {
          path: 'brewers',
          component: BrewerStore,
        },
        {
          path: '',
          component: CoffeeStore,
        }
      ]
    },
    {
      path: '/:lang?/articles',
      component: Articles,
    },
    {
      path: '/:lang?/articles/:articleId',
      component: Article,
    },
    {
      path: '/:lang?/about',
      component: About,
    },
    {
      path: '/:lang?/cafes',
      component: Cafes,
    },
    {
      path: '/:lang?/contacts',
      component: Contacts,
    },
    {
      path: '/:lang?/policies',
      component: Policies,
    },
    {
      path: '/:lang?/policy/:policyId',
      component: Policy,
    },
    {
      path: '/:lang?/coffees/:coffeeSlug',
      component: Coffee,
    },
    {
      path: '/:lang?/brewers/:brewerSlug',
      component: Brewer,
    },
    {
      path: '/:lang?',
      component: Home,
    },
    // {
    //   path: '*',
    //   redirect: '/',
    // }
  ]
});

export default router;
