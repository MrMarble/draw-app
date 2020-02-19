import React, { useRef, useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Canvas } from './components/Canvas';
import { ColorPicker } from './components/ColorPicker';
import { WeightPicker } from './components/WeightPicker';
import { UndoRedo } from './components/UndoRedo';
import { Menu } from './components/Menu';
import Theme from './Theme';

const Container = styled.div`
  width: calc(100% - (${props => props.theme.padding}px * 2));
  margin: auto;
  padding: ${props => props.theme.padding}px;

  @media (min-width: ${props => props.theme.media}) {
    margin: 0;
    justify-content: space-evenly;
    display: flex;
  }
`;
const Main = styled.main`
  & > canvas {
    width: 100%;
    height: calc(100vh - (${props => props.theme.padding}px * 2));
  }
  @media (min-width: ${props => props.theme.media}) {
    width: 75%;
  }
`;

function App() {
  const undoHistory = useRef([]);
  const redoHistory = useRef([]);
  const colorPalette = [
    '#001F3F',
    '#0074D9',
    '#7FDBFF',
    '#39CCCC',
    '#3D9970',
    '#2ECC40',
    '#01FF70',
    '#FFDC00',
    '#FF851B',
    '#FF4136',
    '#85144b',
    '#F012BE',
    '#B10DC9',
    '#111111',
    '#AAAAAA',
    '#DDDDDD',
  ];
  const weightList = [2, 3, 7, 12];

  const [currentColor, setCurrentColor] = useState(colorPalette[0]);
  const [currentWeight, setCurrentWeight] = useState(weightList[0]);
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [isUndoDisabled, disableUndo] = useState(true);
  const [isRedoDisabled, disableRedo] = useState(true);
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState();
  const [canvasHeight, setCanvasHeight] = useState();

  const colorPickerCallback = color => setCurrentColor(color);
  const weightPickerCallback = weight => setCurrentWeight(weight);
  const drawingUpdatedCallback = drawing => {
    undoHistory.current = [...undoHistory.current, drawing];
    redoHistory.current = [];
    disableRedo(true);
    disableUndo(false);
  };
  const undoCallback = () => {
    redoHistory.current.push(undoHistory.current.pop());
    disableRedo(false);
    if (undoHistory.current.length === 0) {
      setCurrentDrawing([]);
      disableUndo(true);
    } else {
      setCurrentDrawing([
        ...undoHistory.current[undoHistory.current.length - 1],
      ]);
    }
  };
  const redoCallback = () => {
    if (redoHistory.current.length > 0) {
      setCurrentDrawing([
        ...redoHistory.current[redoHistory.current.length - 1],
      ]);
      undoHistory.current.push(redoHistory.current.pop());
      disableUndo(false);
    }

    if (redoHistory.current.length === 0) {
      disableRedo(true);
    }
  };

  const canvasRef = useCallback(node => {
    if (node !== null) {
      const resizeObserver = new ResizeObserver(() => {
        setCanvasWidth(node.getBoundingClientRect().width);
        setCanvasHeight(node.getBoundingClientRect().height);
        setCurrentDrawing(undoHistory.current.slice(-1)[0]);
      });
      resizeObserver.observe(node);
    }
  }, []);

  const onMouseDown = () => {
    setIsMenuHidden(true);
  };
  const onMouseUp = () => {
    setIsMenuHidden(false);
  };
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Main onMouseDown={onMouseDown} onMouseUp={onMouseUp} ref={canvasRef}>
          <Canvas
            width={canvasWidth}
            height={canvasHeight}
            color={currentColor}
            lineWeight={currentWeight}
            currentDrawing={currentDrawing}
            drawingUpdatedCallback={drawingUpdatedCallback}
          />
        </Main>
        <Menu hide={isMenuHidden}>
          <UndoRedo
            undoCallback={undoCallback}
            disableUndo={isUndoDisabled}
            disableRedo={isRedoDisabled}
            redoCallback={redoCallback}
          />
          <ColorPicker
            colorList={colorPalette}
            onActiveCallback={colorPickerCallback}
          />
          <WeightPicker
            weightList={weightList}
            onActiveCallback={weightPickerCallback}
          />
        </Menu>
      </Container>
    </ThemeProvider>
  );
}

export default App;
