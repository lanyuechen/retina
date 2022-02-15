import { useMemo } from 'react';
import multiavatar from '@multiavatar/multiavatar';

export default (props: any) => {
  const { seed, size, ...others } = props;

  const html = useMemo(() => multiavatar(seed), [seed]);

  return (
    <div
      style={{width: size, height: size, cursor: 'pointer'}}
      dangerouslySetInnerHTML={{__html: html}}
      {...others}
    />
  );
}