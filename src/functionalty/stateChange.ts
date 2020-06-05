import { DetectionIndexParams } from "./types";
import { ContextType } from "../types";

const deleteDetection = ({
  detections,
  index,
  context,
  setContext,
}: DetectionIndexParams) => {
  detections.splice(index, 1);
  setContext({
    ...context,
    detections: [...detections],
    editingIndex: undefined,
    editCount: context.editCount + 1,
  });
};

const changeDetection = ({
  detections,
  index,
  context,
  setContext,
}: DetectionIndexParams) => {
  const newIndex = (() => {
    if (index + 1 >= detections.length) {
      return 0;
    } else {
      return index + 1;
    }
  })();
  setContext({
    ...context,
    editingIndex: newIndex,
    editCount: context.editCount + 1,
  });
};

const defocusDetection = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    editingIndex: undefined,
    editCount: context.editCount + 1,
  });
};

const closeSnackBar = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    snackBarMessage: "",
  });
};

const showDialog = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    showDialog: true,
  });
};

export default {
  changeDetection,
  closeSnackBar,
  defocusDetection,
  deleteDetection,
  showDialog,
};
