import times from 'lodash.times';
import { IArea2, IVector2 } from '../models/vectors';
import { randomInt } from './random';


export default function generate(size: IArea2, count: number): IVector2[] {
  const field = makeField(size);

  const mines = times(count, () => {
    return takeOne(field);
  });

  return mines.filter((mine) => !!mine) as IVector2[];
}

function makeField(size: IArea2): IVector2[] {
  return times(size.width, (x) => {
    return times(size.height, (y) => {
      return { x, y };
    });
  }).flat();
}

function takeOne(minefield: IVector2[]): IVector2 | null {
  if (minefield.length > 0) {
    const seed = randomInt(minefield.length - 1);
    const removedItems = minefield.splice(seed, 1);
    // only removed one
    return removedItems[0];
  } else {
    return null;
  }
}
