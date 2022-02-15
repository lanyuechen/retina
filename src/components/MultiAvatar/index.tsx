import { useState } from 'react';

import Avatar from './Avatar';

const rand = () => Math.floor(Math.random() * 48) + '';

const genSeed = () => rand() + rand() + rand() + rand() + rand();

export default (props: any) => {
  const { size, onChange } = props;
  const [seed, setSeed] = useState(genSeed());

  const updateSeed = () => {
    const newSeed = genSeed();
    onChange?.(newSeed);
    setSeed(newSeed); 
  }

  return (
    <Avatar
      size={size}
      seed={seed}
      onClick={updateSeed}
    />
  );
}