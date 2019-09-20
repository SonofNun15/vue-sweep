<template>
  <div v-if="cell.revealed" class="cell revealed-cell">
    <font-awesome-icon v-if="cell.mine" icon="bomb" />
    <span v-else-if="cell.adjacent > 0" v-bind:class="['adjacent-label', numberLabel]">{{ cell.adjacent }}</span>
  </div>
  <div v-else class="cell unrevealed-cell" v-on:click="reveal"
       v-on:mouseenter="activate" v-on:mouseleave="deactivate">
    <font-awesome-icon icon="flag" v-if="cell.flagged" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICell } from '../models/mine';

@Component
export default class Cell extends Vue {
  @Prop()
  private cell!: ICell;

  private numberLabels: string[] = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
  ];

  get numberLabel() {
    return this.numberLabels[this.cell.adjacent];
  }

  public reveal() {
    if (this.$store.getters.gameOver || this.cell.flagged) { return; }

    this.$store.dispatch('reveal', { x: this.cell.col, y: this.cell.row });
  }

  public activate() {
    this.$store.commit('activate', this.cell);
  }

  public deactivate() {
    this.$store.commit('deactivate');
  }
}
</script>

<style lang="scss">
  .cell {
    display: inline-block;
    height: 100%;
    width: 100%;
  }

  .unrevealed-cell {
    background: rgb(252,252,252);
    background: linear-gradient(155deg, rgba(252,252,252,1) 0%, rgba(240,240,240,1) 38%, rgba(207,207,207,1) 100%);
    border: 1px solid #cfcfcf;
  }

  .revealed-cell {
    background: #fafafa;
    border: 1px solid #d2d2d2;
  }

  .adjacent-label {
    font-weight: bold;
  }

  .one {
    color: blue;
  }

  .two {
    color: green;
  }

  .three {
    color: red;
  }

  .four {
    color: lightblue;
  }

  .five {
    color: brown;
  }

  .six {
    color: purple;
  }

  .seven {
    color: orange;
  }

  .eight {
    color: black;
  }
</style>