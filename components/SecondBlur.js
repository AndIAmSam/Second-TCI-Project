import React, { useContext } from "react";
import {
  Canvas,
  Rect,
  SweepGradient,
  vec,
  Fill,
  BackdropFilter,
  Blur,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function SecondBlur() {

  const { theme } = useContext(ThemeContext);

  const rectWidth = width / 2.5;
  const rectHeight = height / 1.5;
  const rectX = (width - rectWidth) / 2;
  const rectY = (height - rectHeight) / 2;
  const centerX = rectX + rectWidth / 2;
  const centerY = rectY + rectHeight / 2;

  return (
    <Canvas style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Fill color={theme.blurBackground} />
      <Rect x={rectX} y={rectY} width={rectWidth} height={rectHeight}>
        <SweepGradient
          c={vec(centerX, centerY)}
          colors={["magenta", "pink", "cyan", "magenta"]}
        />
      </Rect>
      <BackdropFilter filter={<Blur blur={50} />}>
        <Fill color={"#DFE3E610"} />
      </BackdropFilter>
    </Canvas>
  );
}
