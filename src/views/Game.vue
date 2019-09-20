<template>
  <div v-if="playing" class="game" tabindex="0" v-focus v-on:keyup.space="flag">
    <div class="mine-row" v-for="(col, x) in gameState.cells" v-bind:key="x">
      <div class="mine-cell" v-for="(cell, y) in col" v-bind:key="(x + 1) * y">
        <Cell v-bind:cell="cell" />
      </div>
    </div>
    <div v-if="gameOver" class="mt-3">
      <h2 style="color: red">GAME OVER <font-awesome-icon icon="sad-tear" /></h2>
      <a href="#" v-on:click.prevent="restart">Play again?</a>
      <!-- <router-link to="/">Play again?</router-link> -->
    </div>
  </div>
  <div v-else>
    <p>No game in progress</p>
    <router-link to="/">Start game</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue  } from 'vue-property-decorator';

import store from '@/store';

import Cell from '@/components/Cell.vue';

@Component({
  components: {
    Cell,
  },
})
export default class Game extends Vue {
  get playing() {
    return this.$store.getters.playing;
  }

  get gameOver() {
    return this.$store.getters.gameOver;
  }

  get size() {
    return this.$store.state.mineConfig.size;
  }

  get gameState() {
    return this.$store.state.gameState;
  }

  get mines() {
    if (this.$store.getters.playing) {
      return this.$store.state.mineData.mines;
    }
  }

  public flag() {
    if (this.$store.state.activeCell) {
      this.$store.commit('toggleFlag', this.$store.state.activeCell);
    }
  }

  public restart() {
    this.$store.dispatch('start');
  }
}
</script>

<style lang="scss">
  .mine-row {
    height: 26px;
  }

  .mine-cell {
    display: inline-block;
    width: 26px;
    height: 100%;
    overflow: hidden;
  }
</style>>