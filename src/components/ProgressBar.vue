<template lang="slm">
  b-progress :max="session.total" height=".5em"
    b-progress-bar[
      :value="session.done"
      variant="success"
      ]
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['session'])
}
</script>
