import * as R from "ramda";

export const removeBar = (index, state) => {
  return state.filter((_, i) => index !== i);
};

export const updateStringName = (index, newName, state) => {
  return R.update(index, newName, state);
};

export const updateNoteType = (beatsPerMeasure, noteType) =>
  R.cond([
    [R.equals(4), () => R.range(0, R.multiply(beatsPerMeasure, 1))],
    [R.equals(8), () => R.range(0, R.multiply(beatsPerMeasure, 2))],
    [R.equals(16), () => R.range(0, R.multiply(beatsPerMeasure, 4))],
  ])(noteType);

export const updateBarNotes = (
  barIndex,
  stringIndex,
  noteIndex,
  newNote,
  state,
) => {
  const lens = R.lensPath([barIndex, stringIndex, noteIndex]);
  return R.over(lens, () => newNote)(state);
};
