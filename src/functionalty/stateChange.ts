import {
  DetectionIndexParams,
  SetEditingIndexParams,
  ChangeDetectionParams,
} from "./types";
import { ContextType } from "../types";
import {
  WithFaceDescriptor,
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from "face-api.js";

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

const showDonateModal = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    modals: { showDonateModal: true },
  });
};

const hideDonateModal = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    modals: { showDonateModal: false },
  });
};

const showInfoModal = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    modals: { showInfoModal: true },
  });
};

const hideInfoModal = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    modals: { showInfoModal: false },
  });
};

const showContactModal = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    modals: { showContactModal: true },
  });
};

const hideContactModal = ({ context, setContext }: ContextType) => {
  setContext({
    ...context,
    modals: { showContactModal: false },
  });
};

const updateDetections = ({
  context,
  setContext,
  fullDescription,
}: ContextType & {
  fullDescription: WithFaceDescriptor<
    WithFaceLandmarks<
      {
        detection: FaceDetection;
      },
      FaceLandmarks68
    >
  >[];
}) => {
  setContext({
    ...context,
    detections: fullDescription.map((fd) => {
      return {
        height: Math.round(fd.detection.box.height),
        width: Math.round(fd.detection.box.width),
        x: Math.round(fd.detection.box.x),
        y: Math.round(fd.detection.box.y),
        hide: false,
      };
    }),
    editCount: context.editCount + 1,
  });
};

const appendDetections = ({
  context,
  setContext,
  fullDescription,
}: ContextType & {
  fullDescription: WithFaceDescriptor<
    WithFaceLandmarks<
      {
        detection: FaceDetection;
      },
      FaceLandmarks68
    >
  >[];
}) => {
  const oldDetections = context.detections ? context.detections : [];
  setContext({
    ...context,
    detections: [
      ...oldDetections,
      ...fullDescription.map((fd) => {
        return {
          height: Math.round(fd.detection.box.height),
          width: Math.round(fd.detection.box.width),
          x: Math.round(fd.detection.box.x),
          y: Math.round(fd.detection.box.y),
          hide: false,
        };
      }),
    ],
    editCount: context.editCount + 1,
  });
};

const updateInputSize = ({
  context,
  setContext,
  inputSize,
}: ContextType & { inputSize: number }) => {
  setContext({ ...context, inputSize });
};

export default {
  // Detection
  changeDetection,
  deleteDetection,
  updateDetections,
  updateInputSize,
  appendDetections,
  // Editing Index
  incrementDetection,
  defocusDetection,
  focusDetection,
  // SnackBar
  closeSnackBar,
  // Modal
  showDonateModal,
  hideDonateModal,
  showInfoModal,
  hideInfoModal,
  showContactModal,
  hideContactModal,
};
