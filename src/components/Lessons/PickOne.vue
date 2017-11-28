<template lang="slm">
  .question-node
    .head
      h1 v-text="question"
    .body
      .line[
        v-for="row in collection"
        :key="row.join()"
        ]
        b-card.text-center.-thick[
          :border-variant='picked === kanji ? "primary" : "dark"'
          @click="picked = kanji"
          v-for="kanji in row"
          :key="kanji"
          ]
          h1.kanji.display-1 v-text="kanji"

          b-form-radio.picked[
            v-model="picked"
            :value="kanji"
            plain
            name="option"
            ]
    .footer
      b-btn.submit[
        :disabled="!picked"
        variant="success"
        ]
        | Submit
</template>

<script>
import shuffle from 'shuffle-array'

export default {
  props: ['kanjis', 'question', 'correct'],
  data: function() {
    return {
      collection: this.buildCollection(),
      picked: null
    }
  },
  methods: {
    buildCollection: function() {
      let [v1, v2, v3, v4] = shuffle(this.kanjis, { copy: true })
      return [[v1, v2], [v3, v4]]
    }
  }
}
</script>

<style lang="stylus">
.question-node {
  > .head {
    height: 10%;
    width: 100%;
  }

  > .footer {
    height: 10%;
    width: 100%;

    > .submit {
      width: 80%;
    }
  }

  > .body {
    height: 80%;
    width: 100%;

    > .line {
      height: 40%;
      margin-bottom: 10%;

      > .card {
        width: 40%;
        height: 100%;
        display: inline-block;
        margin-left: 5%;
        margin-right: 5%;
        border-width: 3px;
        position: relative;

        .kanji {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .picked {
          position: absolute;
          left: 0.5em;
          bottom: 0.5em;
          margin: 0;
        }
      }
    }
  }
}
</style>
