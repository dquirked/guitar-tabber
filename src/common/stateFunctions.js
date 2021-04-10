import * as R from "ramda";

export const removeValueFromString = (string, index, state) => {
  return R.evolve(
    {
      [string]: (values) => values.filter((currVal, i) => i !== index),
    },
    state,
  );
};

export const addValueToString = (string, value, state) => {
  return R.evolve(
    {
      [string]: (values) => [...values, value],
    },
    state,
  );
};

export const changeValueOfString = (string, index, value, state) => {
  return R.evolve(
    {
      [string]: (values) => {
        values[index] = value;
        return values;
      },
    },
    state,
  );
};
