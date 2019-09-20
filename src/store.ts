import Vue from 'vue';
import Vuex from 'vuex';

import { IMineConfig, IMineStartData, IGameState, ICell, buildMinefield, getAdjacentCoordinates } from './models/mine';
import generate from './utils/generator';
import { faRulerVertical, faCommentMedical } from '@fortawesome/free-solid-svg-icons';

Vue.use(Vuex);

const defaultSize = { width: 10, height: 10 };
const defaultCount = 10;

export interface IStore {
  mineConfig: IMineConfig;
  mineStartData: IMineStartData | null;
  gameState: IGameState | null;
  activeCell: ICell | null;
}

export default new Vuex.Store<IStore>({
  state: {
    mineConfig: { size: defaultSize, mineCount: defaultCount},
    mineStartData: null,
    gameState: null,
    activeCell: null,
  },
  getters: {
    playing: (state) => !!state.mineStartData,
    gameOver: (state) => !state.gameState || state.gameState.gameOver,
  },
  mutations: {
    configuration: (state, config: IMineConfig) => {
      state.mineConfig = config;
    },

    start: (state, data: IMineStartData) => {
      state.mineStartData = data;
    },

    startGame: (state, initialState: IGameState) => {
      state.gameState = initialState;
      state.gameState.gameOver = false;
    },

    reveal: (state, { x, y }) => {
      if (!state.gameState) { return; }

      state.gameState.cells[x][y].revealed = true;
    },

    gameOver: (state) => {
      if (!state.gameState) { return; }

      state.gameState.gameOver = true;
    },

    activate: (state, cell) => {
      state.activeCell = cell;
    },

    deactivate: (state) => {
      state.activeCell = null;
    },

    toggleFlag: (state, { col, row }) => {
      if (!state.gameState) { return; }

      const cell = state.gameState.cells[col][row];
      cell.flagged = !cell.flagged;
    },
  },
  actions: {
    configure: ({ commit }, config: IMineConfig) => {
      commit('configuration', config);

      const mines = generate(config.size, config.mineCount);
      const start = { size: config.size, mines };

      commit('start', start);

      const gameState = buildMinefield(start);

      commit('startGame', gameState);
    },

    start: ({ commit, state }) => {
      if (!state.mineConfig) { return; }

      const mines = generate(state.mineConfig.size, state.mineConfig.mineCount);
      const start = { size: state.mineConfig.size, mines };

      commit('start', start);
      const gameState = buildMinefield(start);
      commit('startGame', gameState);
    },

    reveal: ({ commit, state }, coordinates) => {
      if (!state.gameState || !state.mineStartData) { return; }

      const cell = state.gameState.cells[coordinates.x][coordinates.y];

      if (cell.adjacent === 0) {
        const [cols, rows] = getAdjacentCoordinates(coordinates.x, coordinates.y);
        cols.forEach((col) => {
          rows.forEach((row) => {
            if (col >= 0 && row >= 0
                && col < state.mineStartData.size.width
                && row < state.mineStartData.size.height) {
            reveal({ commit, state }, col, row);
            }
          });
        });
      } else {
        reveal({ commit, state }, coordinates.x, coordinates.y);
      }
    },
  },
});

function reveal({ commit, state }: { commit: any, state: IStore }, x: number, y: number) {
  if (!state.gameState) { return; }

  commit('reveal', { x, y });

  if (state.gameState.cells[x][y].mine) {
    commit('gameOver');
  }
}
