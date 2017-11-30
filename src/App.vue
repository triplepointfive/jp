<template lang="slm">
  #app.container-fluid
    ProgressBar
    PickOne[
      :kanjis='kanjis'
      :question='question'
      :answer='answer'
      :key="questionID"
      @done='done'
      @track='track'
      ]
</template>

<script>
import PickOne from './components/Lessons/PickOne'
import ProgressBar from './components/ProgressBar'

import { mapMutations } from 'vuex'

export default {
  name: 'app',
  data: function() {
    const exercize = this.$store.state.session.exercise()

    return {
      kanjis: exercize.options,
      question: exercize.question,
      answer: exercize.answer,
      questionID: 0
    }
  },
  components: {
    PickOne,
    ProgressBar
  },
  methods: {
    ...mapMutations(['sessionDone', 'sessionNext']),
    track (status) {
      if (status) {
        this.sessionDone()
      } else {
        this.sessionNext()
      }
    },
    done() {
      this.questionID += 1
      this.nextQuestion()
    },
    nextQuestion() {
      const exercize = this.$store.state.session.exercise()

      this.kanjis = exercize.options
      this.question = exercize.question
      this.answer = exercize.answer
    }
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
