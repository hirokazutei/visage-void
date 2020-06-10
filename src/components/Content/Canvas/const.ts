const resizerRadius = 6.5;
const resizerTolerance = 3;
// We enforce a minimum size of the boxes so there never ambiguity on which
// side we are resizing from.
const minDimension = 10;

const keys = {
  backspace: 8,
  tab: 9,
  escape: 27,
  delete: 46,
};

export default { resizerRadius, resizerTolerance, minDimension, keys };
