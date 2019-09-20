<template>
  <div class="menu">
    <h1>Minesweeper</h1>
    <NewGame v-bind:initial-width="width" v-bind:initial-height="height"
             v-bind:initial-mines="mines" v-bind:start="startGame" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import router from '../router';

import NewGame from '@/components/NewGame.vue'; // @ is an alias to /src

@Component({
  components: {
    NewGame,
  },
})
export default class Menu extends Vue {
  get width() {
    return this.$store.state.mineConfig.size.width;
  }

  get height() {
    return this.$store.state.mineConfig.size.height;
  }

  get mines() {
    return this.$store.state.mineConfig.mineCount;
  }

  public startGame(width: number, height: number, mines: number) {
    this.$store.dispatch('configure', { size: { width, height }, mineCount: mines });
    router.push('game');
  }
}
</script>
