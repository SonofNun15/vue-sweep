import { IVector2, IArea2 } from './vectors';
import { count } from '@/utils/array';
import sum from 'lodash.sum';
import times from 'lodash.times';

export interface IMineConfig {
  size: IArea2;
  mineCount: number;
}

export interface IMineStartData {
  size: IArea2;
  mines: IVector2[];
}

export interface IGameState {
  gameOver: boolean;
  cells: ICell[][];
}

export interface ICell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
  col: number;
  row: number;
}

export function buildMinefield(start: IMineStartData) {
  const cells: ICell[][] = times(start.size.width, (x) => {
    return times(start.size.height, (y) => {
      return {
        mine: false, // we'll set this later
        revealed: false,
        flagged: false,
        adjacent: 0, // we'll set this later
        col: x,
        row: y,
      };
    });
  });

  start.mines.forEach((mine) => cells[mine.x][mine.y].mine = true);

  cells.forEach((col, x) => {
    col.forEach((cell, y) => {
      cell.adjacent = countAdjacent(cells, x, y);
    });
  });

  return { cells, gameOver: false };
}

function countAdjacent(cells: ICell[][], col: number, row: number): number {
  const [adjacentCols, adjacentRows] = getAdjacentCoordinates(col, row);

  const minesPerCol = adjacentCols.map((x) => {
    return count(adjacentRows, (y) => {
      if (x >= 0 && y >= 0
          && x < cells.length && y < cells[x].length) {
        return cells[x][y].mine;
      } else {
        return false;
      }
    });
  });

  return sum(minesPerCol);
}

export function getAdjacentCoordinates(col: number, row: number): [number[], number[]] {
  const adjacentCols = [col - 1, col, col + 1];
  const adjacentRows = [row - 1, row, row + 1];

  return [adjacentCols, adjacentRows];
}
