import React, { useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import symbol from "../../../symbol";
import { Caption } from "../../atom/Text";
import { useStore } from "../../../store";
import Button from "@material-ui/core/Button";
import { BrowserView, MobileView } from "react-device-detect";

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
  const { actions } = useStore();

  const onDrop = useCallback(
    (images) => {
      images.forEach((file: any) => {
        const reader = new FileReader();

        reader.onabort = () => alert("file reading was aborted");
        reader.onerror = () => alert("file reading has failed");
        reader.onload = (entry) => {
          // Do whatever you want with the file contents
          const image = new Image();
          image.src = entry?.target?.result as string;
          image.onload = () => {
            const { width, height } = image;
            const maxRatio = (() => {
              const windowWidth = window.innerWidth;
              const windowHeight = window.innerHeight;
              let maxRatio = 1;
              while (height / maxRatio > windowHeight && width / maxRatio > windowWidth) {
                maxRatio++;
              }
              return maxRatio;
            })();
            const src = URL.createObjectURL(file);
            actions.setImageInfo({ src, height, width, maxRatio });
            actions.refreshCanvas();
          };
        };
        reader.readAsDataURL(file);
      });
    },
    [actions],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <MobileView>
        <>
          <div className="col-10" {...getRootProps()}>
            <input {...getInputProps()} accept=".jpg, .jpeg, .png, .tiff, .bmp, .gif, .rawx" type="file" />
            <Button variant="contained" color="primary">
              <Caption>CLICK HERE TO UPLOAD</Caption>
            </Button>
          </div>
        </>
      </MobileView>
      <BrowserView>
        <>
          <div style={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} accept=".jpg, .jpeg, .png, .tiff, .bmp, .gif, .rawx" type="file" />
            <div style={styles.textContainer}>
              <div style={styles.dropTextContainer}>
                <Caption>{isDragActive ? "DROP IT HERE!" : "DROP IMAGE HERE..."}</Caption>
              </div>
              <div style={styles.button}>
                <Caption>OR CLICK HERE</Caption>
              </div>
            </div>
          </div>
        </>
      </BrowserView>
    </div>
  );
};

export default Dropzone;
