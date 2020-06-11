import React, { useCallback, CSSProperties, useContext } from "react";
import { useDropzone } from "react-dropzone";
import symbol from "../../symbol";
import Context from "../../context";
import { Caption, Body } from "../atom/Text";
import Space from "../atom/Space";
import { ContainedButton } from "../atom/Button";
import { getFullFaceDescription } from "../../face-api/face";
import stateChange from "../../functionalty/stateChange";
import { Slider } from "@material-ui/core";

type StyleKey =
  | "textContainer"
  | "dropzone"
  | "button"
  | "dropTextContainer"
  | "rescanButtons";

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
  rescanButtons: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
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

  const rescan = async () => {
    await getFullFaceDescription(context.imageInfo.src, context.inputSize).then(
      (fullDescription) => {
        if (!!fullDescription) {
          stateChange.updateDetections({
            context,
            setContext,
            fullDescription,
          });
        }
      }
    );
  };

  const overlapScan = async () => {
    await getFullFaceDescription(context.imageInfo.src, context.inputSize).then(
      (fullDescription) => {
        if (!!fullDescription) {
          stateChange.appendDetections({
            context,
            setContext,
            fullDescription,
          });
        }
      }
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
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
      <Space.Stack size="huge" />
      <Body>
        If the facial detection is not accurate, you can rescan or overlap with
        previous scans.
      </Body>
      <Space.Stack size="small" />
      <Body>
        The higher the value, the more precise the detections are, but slower.
      </Body>
      <Slider
        value={context.inputSize}
        step={32}
        onChange={(_, newValue) => {
          stateChange.updateInputSize({
            context,
            setContext,
            inputSize: Array.isArray(newValue) ? newValue[0] : newValue,
          });
        }}
        min={32}
        max={2048}
        valueLabelDisplay="auto"
      />
      <Space.Stack size="medium" />
      <div style={styles.rescanButtons}>
        <ContainedButton onClick={rescan}>REDO SCANS</ContainedButton>
        <Space.Queue size="huge" />
        <ContainedButton onClick={overlapScan}>
          OVERLAP NEW SCANS
        </ContainedButton>
      </div>
    </>
  );
};

export default Dropzone;
