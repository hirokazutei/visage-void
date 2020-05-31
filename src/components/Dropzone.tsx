import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageInfo } from "./MainPage";

type Props = {
  onImageUploaded: (ImageInfo) => void;
};

const Dropzone = ({ onImageUploaded }: Props) => {
  const onDrop = useCallback((images) => {
    images.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = (entry) => {
        // Do whatever you want with the file contents
        var image = new Image();
        //@ts-ignore
        image.src = entry.target.result;
        image.onload = () => {
          const { width, height } = image;
          onImageUploaded({ src: URL.createObjectURL(file), height, width });
        };
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        border: "dashed grey 4px",
        backgroundColor: "rgba(255,255,255,.8)",
        padding: 24,
        maxWidth: 200,
        maxHeight: 100,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} accept=".jpg, .jpeg, .png" type="file" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
