<template lang="slm">
  #app.container-fluid
    PickOne[
      :kanjis='["何", "先", "円", "南"]'
      question="なに"
      ]
</template>

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
