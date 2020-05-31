import React, { useState, CSSProperties } from "react";
import Dropzone from "./Dropzone";
import ImageDisplay from "./ImageDisplay";

export type ImageInfo = {
  src?: string;
  width?: number;
  height?: number;
};

const styles: {
  mainContainer: CSSProperties;
  dropzoneContainer: CSSProperties;
  imageDisplayContainer: CSSProperties;
} = {
  mainContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 20,
  },
  dropzoneContainer: {
    margin: 10,
  },
  imageDisplayContainer: {
    margin: 10,
  },
};

const Body = () => {
  const [imageSrc, setImageSrc] = useState<string | undefined>("");
  const [imageWidth, setImageWidth] = useState<number | undefined>(0);
  const [imageHeight, setImageHeight] = useState<number | undefined>(0);
  const onImageUploaded = ({ src, width, height }: ImageInfo) => {
    setImageSrc(src);
    setImageWidth(width);
    setImageHeight(height);
  };
  return (
    <div style={styles.mainContainer}>
      <div style={styles.dropzoneContainer}>
        <Dropzone onImageUploaded={onImageUploaded} />
      </div>
      <div style={styles.imageDisplayContainer}>
        <ImageDisplay
          imageInfo={{ src: imageSrc, width: imageWidth, height: imageHeight }}
        />
      </div>
    </div>
  );
};

export default Body;
