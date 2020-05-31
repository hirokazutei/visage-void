import React, { Component } from "react";
import CanvasWrapper from "./CanvasWrapper";
import { loadModels, getFullFaceDescription } from "../face-api/face";
import { ImageInfo } from "./MainPage";

type State = {
  detections: any;
  fullDescription: any;
  modelsLoaded: boolean;
};

type Props = { imageInfo: ImageInfo };

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
    const { width, height } = imageInfo;

    return (
      <div style={{ position: "relative" }}>
        {!!width && !!height && (
          <CanvasWrapper imageInfo={imageInfo} detections={detections} />
        )}
      </div>
    );
  }
}

export default ImageDisplay;
