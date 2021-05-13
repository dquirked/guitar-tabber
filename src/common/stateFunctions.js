import * as R from "ramda";
import pako from "pako";

const findIndex = (array) => array.length - 1;

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

//start at -1 because 0 is the first index
export const findLongestPosition = (state) => {
  return R.compose(
    R.reduce(
      (acc, stringValues) =>
        findIndex(stringValues) > acc ? findIndex(stringValues) : acc,
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
          : R.concat(values, Array(longestPos - findIndex(values)).fill("-")),
    },
    state,
  );
};

// TODO: Rename this function maybe addUserdefinedValues
export const addSingleValueToAllStrings = (state) => {
  return R.map(
    (values) => [...values, "-", "-", "-", "-", "-", "-", "-", "-", "|"],
    state,
  );
};

export const decompressData = (data) => {
  return JSON.parse(pako.inflate(Uint8Array.from(data), { to: "string" }));
};

export const compressData = (data) => {
  return pako.deflate(JSON.stringify(data));
};

export const updateTabStringContext = (id, tabString, state) => {
  return R.assoc(id, tabString, state);
};

export const concatTabStrings = (tabStringContext) => {
  return R.compose(R.reduce(R.concat, ""), R.values)(tabStringContext);
};
