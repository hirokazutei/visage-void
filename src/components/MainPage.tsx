import React, { useState } from "react";
import Dropzone from "./Dropzone";
import ImageDisplay from "./ImageDisplay";

export type ImageInfo = {
  src?: string;
  width?: number;
  height?: number;
};

const MainPage = () => {
  const [imageSrc, setImageSrc] = useState<string | undefined>("");
  const [imageWidth, setImageWidth] = useState<number | undefined>(0);
  const [imageHeight, setImageHeight] = useState<number | undefined>(0);
  const onImageUploaded = ({ src, width, height }: ImageInfo) => {
    setImageSrc(src);
    setImageWidth(width);
    setImageHeight(height);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Dropzone onImageUploaded={onImageUploaded} />
      <ImageDisplay
        imageInfo={{ src: imageSrc, width: imageWidth, height: imageHeight }}
      />
    </div>
  );
};

export default MainPage;
