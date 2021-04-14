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

export const createTabString = (stringValues) => {
  return R.compose(
    R.reduce((acc, value) => acc + `${value}\n`, ""),
    R.values,
    R.map(R.reduce(R.concat, "")),
  )(stringValues);
};

export const clearStringValues = (string, state) => {
  return R.evolve(
    {
      [string]: (values) => [],
    },
    state,
  );
};

export const clearAllStringValues = (state) => {
  return R.map(() => [], state);
};

export const findLongestPosition = (state) => {
  return R.compose(
    R.reduce(
      (acc, stringValues) =>
        stringValues.length - 1 > acc ? stringValues.length - 1 : acc,
      -1,
    ),
    R.values,
  )(state);
};

export const bringStringValuesForward = (string, longestPos, state) => {
  return R.evolve(
    {
      [string]: (values) =>
        longestPos === -1
          ? []
          : R.concat(values, Array(longestPos - (values.length - 1)).fill("-")),
    },
    state,
  );
};

export const addSingleValueToAllStrings = (state) => {
  return R.map(
    (values) => [...values, "-", "-", "-", "-", "-", "-", "-", "-", "|"],
    state,
  );
};
