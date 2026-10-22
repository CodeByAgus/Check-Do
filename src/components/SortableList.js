import { useRef, useState } from 'react';
import { Animated, PanResponder, View } from 'react-native';

// Vertical list whose items can be dragged to a new position.
// The item decides where the "grip" is: renderItem receives `handleProps`, and only
// the element that gets those props starts a drag (here, the card's left edge).
//
//   data         array of items
//   keyExtractor (item) => unique id
//   renderItem   (item, { handleProps, isDragging }) => element
//   onReorder    (fromIndex, toIndex) called once, when the finger is released
//   onDragChange (isDragging) lets the parent pause scrolling while dragging
//   enabled      false = plain list, no grips
export default function SortableList({ data, keyExtractor, renderItem, onReorder, onDragChange, enabled = true }) {
  const heights = useRef({}); // item id -> measured height (margins included)
  const dragY = useRef(new Animated.Value(0)).current; // finger offset of the dragged item
  const [drag, setDrag] = useState(null); // { from, over } while dragging
  const dragRef = useRef(null); // same value, readable from gesture callbacks
  const latest = useRef({}); // newest props, so callbacks never use stale ones
  latest.current = { data, keyExtractor, onReorder, onDragChange };

  const sizeOf = (item) => heights.current[latest.current.keyExtractor(item)] ?? 0;

  // Which slot the dragged item's center is over after moving `dy` pixels.
  const slotAt = (from, dy) => {
    const items = latest.current.data;
    const top = items.slice(0, from).reduce((sum, item) => sum + sizeOf(item), 0) + dy;
    const center = top + sizeOf(items[from]) / 2;
    let edge = 0;
    for (let i = 0; i < items.length; i++) {
      edge += sizeOf(items[i]);
      if (center < edge) return i;
    }
    return items.length - 1;
  };

  // Stable gesture callbacks shared by every row.
  const ctrl = useRef({
    start(from) {
      dragRef.current = { from, over: from };
      setDrag(dragRef.current);
      dragY.setValue(0);
      latest.current.onDragChange?.(true);
    },
    move(dy) {
      const current = dragRef.current;
      if (!current) return;
      dragY.setValue(dy);
      const over = slotAt(current.from, dy);
      if (over !== current.over) {
        dragRef.current = { from: current.from, over };
        setDrag(dragRef.current);
      }
    },
    end() {
      const current = dragRef.current;
      dragRef.current = null;
      setDrag(null);
      dragY.setValue(0);
      latest.current.onDragChange?.(false);
      if (current) latest.current.onReorder(current.from, current.over);
    },
  }).current;

  return (
    <View>
      {data.map((item, index) => {
        const id = keyExtractor(item);
        const isDragging = drag?.from === index;

        // Items between the original and the target slot slide out of the way.
        let shift = 0;
        if (drag && !isDragging) {
          const size = sizeOf(data[drag.from]);
          if (drag.over > drag.from && index > drag.from && index <= drag.over) shift = -size;
          if (drag.over < drag.from && index >= drag.over && index < drag.from) shift = size;
        }

        return (
          <Row
            key={id}
            index={index}
            ctrl={ctrl}
            enabled={enabled}
            isDragging={isDragging}
            translateY={isDragging ? dragY : shift}
            onLayout={(e) => {
              heights.current[id] = e.nativeEvent.layout.height;
            }}
          >
            {(handleProps) => renderItem(item, { handleProps, isDragging })}
          </Row>
        );
      })}
    </View>
  );
}

function Row({ index, ctrl, enabled, isDragging, translateY, onLayout, children }) {
  const indexRef = useRef(index);
  indexRef.current = index;

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false, // keep the drag even if a scroll view wants it
      onPanResponderGrant: () => ctrl.start(indexRef.current),
      onPanResponderMove: (_, gesture) => ctrl.move(gesture.dy),
      onPanResponderRelease: () => ctrl.end(),
      onPanResponderTerminate: () => ctrl.end(),
    })
  ).current;

  return (
    <Animated.View
      onLayout={onLayout}
      style={{
        zIndex: isDragging ? 10 : 0,
        transform: [{ translateY }, { scale: isDragging ? 1.03 : 1 }],
        opacity: isDragging ? 0.95 : 1,
      }}
    >
      {children(enabled ? responder.panHandlers : undefined)}
    </Animated.View>
  );
}
