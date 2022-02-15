import { useMemo } from 'react';
import multiavatar from '@multiavatar/multiavatar';

export default (props: any) => {
  const { seed, size = '100%', ...others } = props;

  const html = useMemo(() => multiavatar(seed), [seed]);

  return (
    <div
      style={{width: size, height: size, cursor: 'pointer', userSelect: 'none'}}
      dangerouslySetInnerHTML={{__html: html}}
      {...others}
    />
  );
}