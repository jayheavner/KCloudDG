<template>
  <div class="row">
    <div
      v-for="(policy, index) in policyData"
      :key="index"
      class="col-md-6"
    >
      <div class="col-md-6">
        <div 
          :class="policy.codename"
          class="color-block color-block-rectangle" 
        >
          <a :href="policy.link">     
            <div class="title">{{ policy.title }}</div>
            <RichTextElement
              :element="policy.excerpt"
              class="hidden-md-down"
            />
            {{ policy.link }}
            <div class="learn-more">Learn More &gt;</div>
            <img 
              :src="policy.image" 
              class="icon-background" 
              alt=""
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PolicyStore } from '../Stores/Policy';
import RichTextElement from './RichTextElement.vue'

export default {
  components: {
    RichTextElement,
  },
  props: ['language'],
  data: () => ({
    policies: [],
  }),
  computed: {
    policyData: function () {
      return this.policies.map(policy => {
        return {
          title: policy.title.value,
          excerpt: policy.excerpt,
          description: policy.description,
          image: policy.image.assets[0].url,
          codename: policy.system.codename,
          link: `/${this.language}/policy/${_.get(policy, 'system.id')}`,
        }
      })
    }
  },
  watch: {
    language: function () {
      PolicyStore.providePolicies(this.language);
    },
  },
  mounted: function () {
    PolicyStore.subscribe();
    PolicyStore.addChangeListener(this.onChange);
    PolicyStore.providePolicies(this.language);
    this.policies = PolicyStore.getPolicies(this.language);
  },
  beforeDestroy: function() {
    PolicyStore.unsubscribe();
  },
  destroyed: function () {
    PolicyStore.removeChangeListener(this.onChange);
  },
  methods: {
    onChange: function () {
      this.policies = PolicyStore.getPolicies(this.language);
    }
  },
}
</script>

<style lang="scss" scoped>

.color-block {
    margin-bottom: 2.10526em;
    background-repeat: no-repeat;
    background-position: right bottom;
    position: relative;

  &.policy {
    &___accessibility {
          background-color: #43bb98;
          transition: .2s;
      }

    &___artificial_intelligence {
        background-color: #f48b45;
        transition: .2s;
    }

    &___jay {
      background-color: #c43d11;
      transition: .2s;
    }
  }
  &.color-block-rectangle:before {
      content: '';
      display: block;
      padding-top: 50%;
  }

  a {
      color: #fff;
      text-decoration: none;
      padding: 2.10526em 2.10526em 0;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
  }

  .title {
      font-size: 1.15789em;
      letter-spacing: 0;
      line-height: 1;
      text-align: left;
      margin-top: 0!important;
      margin-bottom: .43182em;
      font-family: "karbonmedium",sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 1.36842em;
      margin-bottom: .36538em;
  }

  p {
      font-family: "karbonregular_italic",sans-serif;
      font-style: italic;
      font-weight: 400;
      font-size: .84211em;
      line-height: 1.2;
  }

  .learn-more {
    text-transform: uppercase;
    position: absolute;
    font-family: 'karbonbold';
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    bottom: 1.76471em;
    font-size: .89474em;
  }
  .icon-background {
      position: absolute;
      right: 0;
      bottom: 0;
      max-height: 100%;
      opacity: .25;
  }
}

[class^="icon-"], [class*=" icon-"] {
    font-family: 'icomoon';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>



