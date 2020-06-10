import React, { useCallback, CSSProperties, useContext } from "react";
import { useDropzone } from "react-dropzone";
import symbol from "../../symbol";
import Context from "../../context";
import { Caption } from "../atom/Text";

type StyleKey = "textContainer" | "dropzone" | "button" | "dropTextContainer";

const styles: Record<StyleKey, CSSProperties> = {
  textContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  dropzone: {
    border: `dashed ${symbol.COLOR.text} 3px`,
    backgroundColor: symbol.COLOR.cards,
    borderRadius: 8,
    width: 400,
    height: 80,
  },
  button: {
    backgroundColor: symbol.COLOR.button,
    margin: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 72,
    width: 160,
    borderRadius: "0px 8px 8px 0px",
  },
  dropTextContainer: {
    marginLeft: symbol.SPACE.huge,
    marginRight: symbol.SPACE.huge,
  },
};

const Dropzone = () => {
  const { context, setContext } = useContext(Context);
  const onDrop = useCallback(
    (images) => {
      images.forEach((file: any) => {
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
            const maxRatio = (() => {
              const windowWidth = window.innerWidth;
              const windowHeight = window.innerHeight;
              let maxRatio = 1;
              while (
                height / maxRatio > windowHeight &&
                width / maxRatio > windowWidth
              ) {
                maxRatio++;
              }
              return maxRatio;
            })();
            setContext({
              ...context,
              detections: undefined,
              imageInfo: {
                src: URL.createObjectURL(file),
                height,
                width,
                maxRatio,
                currentRatio: maxRatio,
              },
              editCount: context.editCount + 1,
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
      <input
        {...getInputProps()}
        accept=".jpg, .jpeg, .png, .tiff, .bmp, .gif, .rawx"
        type="file"
      />
      <div style={styles.textContainer}>
        <div style={styles.dropTextContainer}>
          <Caption>
            {isDragActive ? "DROP IT HERE!" : "DROP IMAGE HERE..."}
          </Caption>
        </div>
        <div style={styles.button}>
          <Caption>OR CLICK HERE</Caption>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
