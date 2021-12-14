import React, { useEffect, useRef } from 'react';

export default (props: any) => {
  const { src } = props;
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = src;
    }
  }, [src]);

  return (
    <video ref={ref} autoPlay playsInline />
  );
}