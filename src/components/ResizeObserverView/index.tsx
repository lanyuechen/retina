import { useEffect, useRef } from 'react';

export default (props: any) => {
  const { onResize, children, ...others } = props;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      if (entries[0]) {
        onResize(entries[0].contentRect);
      }
    });
    ro.observe(ref.current!);

    return () => {
      ro.disconnect();
    }
  }, []);

  return (
    <div ref={ref} {...others}>
      {children}
    </div>
  );
}
