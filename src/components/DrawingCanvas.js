import React, { useState, useRef, useEffect } from 'react';
import { View, PanResponder } from 'react-native';
import Svg, { Path, Image as SvgImage } from 'react-native-svg';

export default function DrawingCanvas({ elements = [], onElementAdded, activeColor = '#a7295a', activeWidth = 5 }) {
  const [currentStroke, setCurrentStroke] = useState(null);
  const currentStrokeRef = useRef(null);
  const [localElements, setLocalElements] = useState([]);

  useEffect(() => {
    setLocalElements(elements);
  }, [elements]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newStroke = {
          type: 'stroke',
          path: `M${locationX},${locationY}`,
          color: activeColor,
          width: activeWidth,
          id: Math.random().toString(36).substring(7)
        };
        currentStrokeRef.current = newStroke;
        setCurrentStroke(newStroke);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const prev = currentStrokeRef.current;
        if (!prev) return;
        const updatedStroke = {
          ...prev,
          path: `${prev.path} L${locationX},${locationY}`,
        };
        currentStrokeRef.current = updatedStroke;
        setCurrentStroke(updatedStroke);
      },
      onPanResponderRelease: () => {
        const finalStroke = currentStrokeRef.current;
        currentStrokeRef.current = null;
        setCurrentStroke(null);

        if (finalStroke) {
          setLocalElements(prev => [...prev, finalStroke]);
          if (onElementAdded) onElementAdded(finalStroke);
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }} {...panResponder.panHandlers}>
      <Svg style={{ flex: 1, width: '100%', height: '100%' }}>
        {localElements.map((el, index) => {
          if (el.type === 'stroke') {
            return (
              <Path
                key={el.id || index}
                d={el.path}
                stroke={el.color}
                strokeWidth={el.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            );
          }
          if (el.type === 'image') {
            return (
              <SvgImage 
                key={el.id || index}
                href={{ uri: el.uri }}
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                preserveAspectRatio="xMidYMid slice"
              />
            );
          }
          return null;
        })}

        {currentStroke && (
          <Path
            d={currentStroke.path}
            stroke={currentStroke.color}
            strokeWidth={currentStroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}
