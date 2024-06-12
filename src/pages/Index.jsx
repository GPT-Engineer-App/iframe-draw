import React, { useRef, useEffect, useState } from "react";
import { Box, Button, VStack, HStack } from "@chakra-ui/react";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];

const Index = () => {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;

    const startPosition = (e) => {
      painting = true;
      draw(e);
    };

    const endPosition = () => {
      painting = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!painting) return;
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = currentColor;

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [currentColor]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <VStack position="absolute" top={4} left={4} spacing={2}>
        {colors.map((color) => (
          <Button
            key={color}
            bg={color}
            width="40px"
            height="40px"
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Index;