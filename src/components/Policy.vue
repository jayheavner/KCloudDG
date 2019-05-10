<template>
  <section class="section-content padding-top-lg padding-bottom-md has-large-feature-image">
    <div class="container">
      <img 
        :src="policyData.image"
        alt="" 
        class="large-feature-image"
      >
      <h3 class="subtitle text-xs-left">Policy <span>&gt; Issues</span></h3>
      <h1 class="page-title text-xs-left">{{ policyData.title }}</h1>
      <RichTextElement
        v-if="policyData.description.getHtml()"
        :element="policyData.description"
        style-class="policy-detail-content"
      />
    
      <div class="clearfix"/>
      <div class="row flex"/>
    </div>
  </section>
</template>

<script>
import { PolicyStore } from '../Stores/Policy';
import RichTextElement from './RichTextElement.vue';
import _ from 'lodash';

export default {
  name: 'Policy',
  components: {
    RichTextElement
  },
  props: ['language'],
  data: () => ({
    policy: null,
  }),
  computed: {
    policyData: function() {
      // eslint-disable-next-line no-debugger
      debugger;

      return {
        title: _.get(this.policy, 'title.value'),
        description: _.get(this.policy, 'description'),
        image: _.get(this.policy, 'image.assets[0].url')
      };
    }
  },
  watch: {
    language: function() {
      PolicyStore.providePolicy(this.$route.params.policyId, this.language);
    }
  },
  mounted: function() {
    // eslint-disable-next-line no-debugger
    debugger;

    PolicyStore.subscribe();
    PolicyStore.addChangeListener(this.onChange);
    PolicyStore.providePolicy(this.$route.params.policyId, this.language);
    this.policy = PolicyStore.getPolicy(this.$route.params.policyId, this.language);
  },
  beforeUpdate: function(){
    this.policy = PolicyStore.getPolicy(this.$route.params.policyId, this.language);
  },
  beforeDestroy: function() {
    PolicyStore.unsubscribe();
  },
  destroyed: function(){
    PolicyStore.removeChangeListener(this.onChange);
  },
  methods: {
    onChange: function(){
      this.policy = PolicyStore.getPolicy(this.$route.params.policyId, this.language);
    }
  },
}
</script>

<style lang="scss" scoped>

.sticky {
    background: #0d98d8;
    padding-top: 0;
    padding-bottom: 0;
    transition: all .3s ease-in 0s;
    -o-transition: all .3s ease-in 0s;
    -moz-transition: all .3s ease-in 0s;
    -webkit-transition: all .3s ease-in 0s;
}
.page-section-header {
    padding-top: 2.36842em;
    padding-bottom: 2.36842em;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 5;
    transition: all .3s ease-in 0s;
    -o-transition: all .3s ease-in 0s;
    -moz-transition: all .3s ease-in 0s;
    -webkit-transition: all .3s ease-in 0s;
}
.container-fluid {
    margin-left: auto;
    margin-right: auto;
    padding-left: .9375rem;
    padding-right: .9375rem;
}

.has-large-feature-image {
    overflow: hidden;
}
.padding-bottom-md {
    padding-bottom: 2.63158em;
}
.padding-top-lg {
    padding-top: 3.15789em;
}
section {
    position: relative;
}


.large-feature-image {
    // margin-right: -50%;
    float: right;
}
img {
    vertical-align: middle;
}
img {
    border: 0;
}

.subtitle {
    text-align: center;
    font-size: 1.21053em;
    text-transform: uppercase;
    font-family: "karbonmedium",sans-serif;
    font-style: normal;
    font-weight: 500;
    letter-spacing: .2em;
}
.text-xs-left {
    text-align: left!important;
}
h3 {
    font-family: "karbonmedium",sans-serif;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 1.05263em;
    margin-top: .78947em;
}

.page-title {
    font-family: 'karbonbold';
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 4.42105em;
    line-height: .90476em;
    margin-bottom: .59524em;
    text-align: center;
    letter-spacing: -.05em;
    position: relative;
    z-index: 1;
}
</style>
