import { useMousePosition } from '@/hooks/useMousePosition';

const TrackCursor = () => {
  const position = useMousePosition();

  return (
    <>
      Last Tracked Position - x: {position.x}, y: {position.y}
    </>
  );
};

export default TrackCursor;
