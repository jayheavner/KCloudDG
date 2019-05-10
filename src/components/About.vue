<template>
  <div class="container">
    <div
      v-for="(fact, index) in factsData"
      :key="index"
    >
      <section
        v-if="index % 2 === 0"
        :key="index"
        class="row text-and-image"
      >
        <h2 class="col-lg-12">{{ fact.title }}</h2>
        <div class="col-md-6">
          <RichTextElement
            :element="fact.descriptionElement"
            class="text-and-image-text"
          />
        </div>
        <div class="col-md-6">
          <img
            :alt="fact.title"
            :src="fact.imageLink"
            :title="fact.title"
            class="img-responsive"
          >
        </div>
      </section>
      <section
        v-else
        :key="index"
        class="row text-and-image"
      >
        <h2 class="col-lg-12">{{ fact.title }}</h2>
        <div class="col-md-6 col-md-push-6">
          <RichTextElement
            :element="fact.descriptionElement"
            class="text-and-image-text-right"
          />
        </div>
        <div class="col-md-6 col-md-pull-6">
          <img
            :alt="fact.title"
            :src="fact.imageLink"
            :title="fact.title"
            class="img-responsive"
          >
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import { FactStore } from '../Stores/Fact'
import RichTextElement from './RichTextElement.vue'

export default {
  name: 'About',
  components: {
    RichTextElement,
  },
  props: ['language'],
  data: () => ({
    facts: [],
  }),
  computed: {
    factsData: function () {
      return this.facts.map(fact => ({
        title: fact.title.value,
        descriptionElement: fact.description,
        imageLink: fact.image.value[0].url,
      }))
    }
  },
  watch: {
    language: function () {
      FactStore.provideFacts(this.language);
    }
  },
  mounted: function () {
    FactStore.subscribe();
    FactStore.addChangeListener(this.onChange);
    FactStore.provideFacts(this.language);
    this.facts = FactStore.getFacts(this.language);
  },
  beforeDestroy: function() {
    FactStore.unsubscribe();
  },
  destroyed: function () {
    FactStore.removeChangeListener(this.onChange);
  },
  methods: {
    onChange: function () {
      this.facts = FactStore.getFacts(this.language);
    }
  },
}
</script>