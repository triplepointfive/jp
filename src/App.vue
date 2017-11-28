<template lang="slm">
  #app.container-fluid
    PickOne[
      :kanjis='["南", "北", "西", "東"]'
      question="south"
      answer="南"
      ]
</template>

// みなみ south
// きた north
// にし west
// ひがし east

<script>
import PickOne from './components/Lessons/PickOne'

export default {
  name: 'app',
  components: {
    PickOne
  }
}
</script>

<style lang="stylus">
html, body, .container-fluid {
  height: 100%;
}

.container-fluid {
  padding: 15px;

  > div {
    height: 100%;
    text-align: center;
  }
}
</style>
