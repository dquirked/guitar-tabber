import * as R from "ramda";

export const removeBar = () => {};

export const updateStringName = (index, newName, prevState) => {
  return R.update(index, newName, prevState);
};

export const updateNoteType = (beatsPerMeasure, noteType) =>
  R.cond([
    [R.equals(4), () => R.range(0, R.multiply(beatsPerMeasure, 1))],
    [R.equals(8), () => R.range(0, R.multiply(beatsPerMeasure, 2))],
    [R.equals(16), () => R.range(0, R.multiply(beatsPerMeasure, 4))],
  ])(noteType);

export const updateBarNotes = (string, index, newNote, prevState) => {
  const [stringName] = string;
  return R.map((stringArray) => {
    const [name, notes] = stringArray;
    return name === stringName
      ? [name, R.update(index, newNote, notes)]
      : [name, notes];
  })(prevState);
};
