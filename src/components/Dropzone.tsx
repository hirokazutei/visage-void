import React, { useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import symbol from "../symbol";

type Props = {
  onImageUploaded: (ImageInfo) => void;
};

const styles: {
  textContainer: CSSProperties;
  text: CSSProperties;
  dropzone: CSSProperties;
  button: CSSProperties;
  dropTextContainer: CSSProperties;
} = {
  textContainer: {
    alignItems: "center",
    display: "flex",
    flex: 1,
  },
  text: {
    ...symbol.STYLE.text,
  },
  dropzone: {
    border: `dashed ${symbol.COLOR.text} 3px`,
    backgroundColor: symbol.COLOR.cards,
    borderRadius: 8,
    minWidth: 420,
    height: 80,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    ...symbol.STYLE.button,
    minHeight: 72,
    width: 150,
    borderRadius: "0px 8px 8px 0px",
  },
  dropTextContainer: {
    marginLeft: 24,
    marginRight: 24,
  },
};

const Dropzone = ({ onImageUploaded }: Props) => {
  const onDrop = useCallback(
    (images) => {
      images.forEach((file: any) => {
        console.log(file);
        const reader = new FileReader();

        reader.onabort = () => alert("file reading was aborted");
        reader.onerror = () => alert("file reading has failed");
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
    },
    [onImageUploaded]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept=".jpg, .jpeg, .png" type="file" />
      {isDragActive ? (
        <p style={styles.text}>DROP IMAGE HERE...</p>
      ) : (
        <div style={styles.textContainer}>
          <div style={styles.dropTextContainer}>
            <p style={styles.text}>DRAG & DROP IMAGE HERE</p>
          </div>
          <div style={styles.button}>
            <p style={symbol.STYLE.buttonText}>OR CLICK HERE</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
