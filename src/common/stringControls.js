import * as R from "ramda";

export const updateStringName = (index, newName, prevState) => {
  return R.update(index, newName, prevState);
};
