<template>
  <div class="container">
    <hero />
    <latest-articles :language="language"/>
    <link-button 
      :text="$t('Home.moreArticles')" 
      :link="`/${language}/articles`"
    />
    <our-story/>
    <link-button 
      :text="$t('Home.aboutLinkText')" 
      :link="`/${language}/about`"
    />
    <taste-our-coffee :language="language"/>
    <link-button 
      :text="$t('Home.cafesLinkText')" 
      :link="`/${language}/cafes`"
    />
  </div>
</template>

<script>
import Hero from './Hero'
import LatestArticles from './LatestArticles'
import LinkButton from './LinkButton'
import OurStory from './OurStory'
import TasteOurCoffee from './TasteOurCoffee'

export default {
  name: 'Home',
  components: {
    Hero,
    LatestArticles,
    LinkButton,
    OurStory,
    TasteOurCoffee,
  },
  props: ['language'],
}
</script>

