import * as R from "ramda";

export const processBeatSubdivisions = (beatsPerMeasure, noteType) =>
  R.compose(
    R.tap(console.log),
    R.cond([
      [R.equals(4), () => R.range(0, R.multiply(beatsPerMeasure, 1))],
      [R.equals(8), () => R.range(0, R.multiply(beatsPerMeasure, 2))],
      [R.equals(16), () => R.range(0, R.multiply(beatsPerMeasure, 4))],
    ]),
  )(noteType);
