import React, { Component, CSSProperties } from "react";
import CanvasWrapper from "./CanvasWrapper";
import { loadModels, getFullFaceDescription } from "../face-api/face";
import { ImageInfo } from "./Body";
import { GridLoader } from "react-spinners";
import symbol from "../symbol";

type State = {
  detections: any;
  fullDescription: any;
  modelsLoaded: boolean;
};

type Props = { imageInfo: ImageInfo };

const styles: {
  loader: CSSProperties;
  text: CSSProperties;
} = {
  loader: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    margin: 48,
  },
  text: {
    color: symbol.COLOR.text,
    marginBottom: 24,
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
    const { src } = this.props.imageInfo;
    const { modelsLoaded } = this.state;
    if (!modelsLoaded) {
      await loadModels();
      this.setState({ ...this.state, modelsLoaded: true });
    }
    if (src && src !== prevProps.imageInfo.src) {
      await this.handleImage(src);
    }
  };

  handleImage = async (image) => {
    await getFullFaceDescription(image).then((fullDescription) => {
      if (!!fullDescription) {
        this.setState({
          fullDescription,
          detections: fullDescription.map((fd) => fd.detection),
        });
      }
    });
  };

  render() {
    const { detections } = this.state;
    const { imageInfo } = this.props;

    if (!imageInfo.src) {
      return null;
    }

    return (
      <div style={symbol.STYLE.card}>
        {imageInfo.src && detections && (
          <CanvasWrapper imageInfo={imageInfo} detections={detections} />
        )}
        {imageInfo.src && !detections && (
          <div style={styles.loader}>
            <p style={styles.text}>DETECTING FACES</p>
            <GridLoader color={symbol.COLOR.text} size={20} margin={4} />
          </div>
        )}
      </div>
    );
  }
}

export default ImageDisplay;
