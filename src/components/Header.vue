<template>
  <header
    class="header"
    role="banner"
  >
    <div class="menu">
      <div class="container">
        <nav role="navigation">
          <ul>
            <li>
              <router-link :to="homeRoute">{{ $t('Header.homeLinkTitle') }}</router-link>
            </li>
            <li>
              <router-link :to="storeRoute">{{ $t('Header.storeLinkTitle') }}</router-link>
            </li>
            <li>
              <router-link :to="articlesRoute">{{ $t('Header.articlesLinkTitle') }}</router-link>
            </li>
            <li >
              <router-link :to="aboutRoute">{{ $t('Header.aboutLinkTitle') }}</router-link>
            </li>
            <li>
              <router-link :to="cafesRoute">{{ $t('Header.cafesLinkTitle') }}</router-link>
            </li>
            <li>
              <router-link :to="contactsRoute">{{ $t('Header.contactsLinkTitle') }}</router-link>
            </li>
            <li>
              <router-link :to="policiesRoute">{{ $t('Header.policyLinkTitle') }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="additional-menu-buttons user-menu">
          <nav role="navigation">
            <ul class="dropdown-items-list dropdown-desktop-visible">
              <li>
                <a @click="changeLang('en-US')">English</a>
              </li>
              <li>
                <a @click="changeLang('es-ES')">Español</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <MessageBox
      v-if="infoMessageText"
      :message="infoMessageText"
    />
  </header>
</template>

<script>
import MessageBox from './MessageBox'

export default {
  name: 'Header',
  components: {
    MessageBox
  },
  props: ['language', 'changeLang', 'infoMessageText'],
  computed: {
    homeRoute: function(){
      return '/' + this.language;
    },
    storeRoute: function(){
      return '/' + this.language + '/' + 'store';
    },
    articlesRoute: function(){
      return '/' + this.language + '/' + 'articles';
    },
    aboutRoute: function(){
      return '/' + this.language + '/' + 'about';
    },
    cafesRoute: function(){
      return '/' + this.language + '/' + 'cafes';
    },
    contactsRoute: function(){
      return '/' + this.language + '/' + 'contacts';
    },
    policiesRoute: function(){
      return '/' + this.language + '/' + 'policies';
    }
  },
}
</script>
