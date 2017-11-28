<template lang="slm">
  #app.container-fluid
    PickOne[
      :kanjis='kanjis'
      :question='question'
      :answer='answer'
      :key="questionID"
      @done='done'
      ]
</template>

<script>
import PickOne from './components/Lessons/PickOne'

import { PickOneExercise, PickOneOption, Word } from './db'

const words = [
  new Word('南', ['south'], ['みなみ']),
  new Word('北', ['north'], ['きた']),
  new Word('西', ['west'], ['にし']),
  new Word('東', ['east'], ['ひがし'])
]

const options = words.map(w => new PickOneOption(w.display(), w.meaning()))
const picker = new PickOneExercise(options)

export default {
  name: 'app',
  data: function() {
    const exercize = picker.ask()

    return {
      kanjis: exercize.options,
      question: exercize.question,
      answer: exercize.answer,
      questionID: 0
    }
  },
  components: {
    PickOne
  },
  methods: {
    done(status) {
      this.questionID += 1
      this.nextQuestion()
    },
    nextQuestion() {
      const exercize = picker.ask()

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
