import React, { Component, CSSProperties } from "react";
import CanvasWrapper from "./CanvasWrapper";
import { loadModels, getFullFaceDescription } from "../../face-api/face";
import { ContextType } from "../../types";
import { GridLoader } from "react-spinners";
import symbol from "../../symbol";
import { Paper } from "../atom/Paper";
import { Caption } from "../atom/Text";

type State = {
  detections: any;
  fullDescription: any;
  modelsLoaded: boolean;
};

type Props = ContextType;

const styles: {
  loader: CSSProperties;
  textWrapper: CSSProperties;
} = {
  loader: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    margin: 48,
  },
  textWrapper: {
    marginBottom: 12,
  },
};

const INITITAL_STATE: State = {
  detections: null,
  fullDescription: null,
  modelsLoaded: false,
};

class ImageDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { ...INITITAL_STATE };
  }

  componentDidUpdate = async (prevProps) => {
    const { src } = this.props.context.imageInfo;
    const { modelsLoaded } = this.state;
    if (!modelsLoaded) {
      await loadModels();
      this.setState({ ...this.state, modelsLoaded: true });
    }
    if (src && src !== prevProps.context.imageInfo.src) {
      await this.handleImage(src);
    }
  };

  handleImage = async (image) => {
    await getFullFaceDescription(image).then((fullDescription) => {
      if (!!fullDescription) {
        this.props.setContext({
          ...this.props.context,
          detections: fullDescription.map((fd) => fd.detection),
        });
      }
    });
  };

  render() {
    const { detections, imageInfo } = this.props.context;

    if (!imageInfo.src) {
      return null;
    }

    return (
      <Paper>
        {imageInfo.src && detections && <CanvasWrapper />}
        {imageInfo.src && !detections && (
          <div style={styles.loader}>
            <div style={styles.textWrapper}>
              <Caption>DETECTING FACES</Caption>
            </div>
            <GridLoader color={symbol.COLOR.text} size={20} margin={4} />
          </div>
        )}
      </Paper>
    );
  }
}

export default ImageDisplay;
