import React, { useCallback, CSSProperties, useContext } from "react";
import { useDropzone } from "react-dropzone";
import symbol from "../../symbol";
import Context from "../../context";
import { Caption } from "../atom/Text";

const styles: {
  textContainer: CSSProperties;
  dropzone: CSSProperties;
  button: CSSProperties;
  dropTextContainer: CSSProperties;
} = {
  textContainer: {
    alignItems: "center",
    display: "flex",
  },
  dropzone: {
    border: `dashed ${symbol.COLOR.text} 3px`,
    backgroundColor: symbol.COLOR.cards,
    borderRadius: 8,
    minWidth: 460,
    maxWidth: 460,
    height: 80,
    margin: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    ...symbol.STYLE.button,
    minHeight: 72,
    width: 160,
    borderRadius: "0px 8px 8px 0px",
  },
  dropTextContainer: {
    marginLeft: 24,
    marginRight: 24,
  },
};

const Dropzone = () => {
  const { context, setContext } = useContext(Context);
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
            setContext({
              ...context,
              imageInfo: { src: URL.createObjectURL(file), height, width },
            });
          };
        };
        reader.readAsDataURL(file);
      });
    },
    [context, setContext]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept=".jpg, .jpeg, .png" type="file" />
      {isDragActive ? (
        <Caption>DROP IMAGE HERE...</Caption>
      ) : (
        <div style={styles.textContainer}>
          <div style={styles.dropTextContainer}>
            <Caption>DRAG & DROP IMAGE HERE</Caption>
          </div>
          <div style={styles.button}>
            <Caption>OR CLICK HERE</Caption>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
