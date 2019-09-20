<template>
  <div class="new-game">
    <form v-on:submit.prevent="submit">
      <div class="form-group form-row justify-content-center">
        <label class="col-2 col-form-label" for="width">Width: </label>
        <div class="col-2">
          <input class="form-control" type="number" id="width" name="width"
                 v-model.number="width"/>
        </div>
      </div>
      <div class="form-group form-row justify-content-center">
        <label class="col-2 col-form-label" for="height">Height: </label>
        <div class="col-2">
          <input class="form-control" type="number" id="height" name="height"
                 v-model.number="height" />
        </div>
      </div>
      <div class="form-group form-row justify-content-center">
        <label class="col-2 col-form-label" for="mines">Mines: </label>
        <div class="col-2">
          <input class="form-control" type="number" id="mines" name="mines"
                 v-model.number="mines" />
        </div>
      </div>
      <div class="form-group form-row justify-content-center">
        <div class="offset-2 col-2">
          <button class="btn btn-primary btn-block" type="submit">Start</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NewGame extends Vue {
  @Prop({ default: 10})
  private initialWidth!: number;

  @Prop({ default: 10 })
  private initialHeight!: number;

  @Prop({ default: 10 })
  private initialMines!: number;

  @Prop()
  private start!: (width: number, height: number, mines: number) => void | null;

  private width: number;
  private height: number;
  private mines: number;

  constructor() {
    super();

    this.width = this.initialWidth;
    this.height = this.initialHeight;
    this.mines = this.initialMines;
  }

  public submit() {
    if (!!this.start) {
      this.start(this.width, this.height, this.mines);
    }
  }
}
</script>