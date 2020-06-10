import {
  DetectionIndexParams,
  SetEditingIndexParams,
  ChangeDetectionParams,
} from "./types";
import { ContextType } from "../types";

const changeDetection = ({
  context,
  setContext,
  detections,
}: ChangeDetectionParams) => {
  setContext({
    ...context,
    detections,
    editCount: context.editCount + 1,
  });
};

const deleteDetection = ({
  context,
  setContext,
  index,
}: DetectionIndexParams) => {
  const { detections } = context;
  if (!detections) {
    return;
  }
  detections.splice(index, 1);
  setContext({
    ...context,
    detections: [...detections],
    editingIndex: undefined,
    editCount: context.editCount + 1,
  });
};

const incrementDetection = ({ context, setContext }: ContextType) => {
  const { editingIndex, detections } = context;
  const newIndex = (() => {
    if (!editingIndex || !detections) {
      return undefined;
    } else if (editingIndex + 1 >= detections.length) {
      return 0;
    } else {
      return editingIndex + 1;
    }
  })();
  setContext({
    ...context,
    editingIndex: newIndex,
    editCount: context.editCount + 1,
  });
};

const focusDetection = ({
  context,
  setContext,
  editingIndex,
}: SetEditingIndexParams) => {
  setContext({
    ...context,
    editingIndex,
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
  // Detection
  changeDetection,
  deleteDetection,
  // Editing Index
  incrementDetection,
  defocusDetection,
  focusDetection,
  // SnackBar
  closeSnackBar,
  // Dialog
  showDialog,
};
