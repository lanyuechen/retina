import { useState } from 'react';

import Avatar from './Avatar';

const rand = () => Math.floor(Math.random() * 48) + '';

const genSeed = () => rand() + rand() + rand() + rand() + rand();

export default () => {
  const [seed, setSeed] = useState(genSeed());

  const updateSeed = () => {
    setSeed(genSeed()); 
  }

  return (
    <Avatar
      size={100}
      seed={seed}
      onClick={updateSeed}
    />
  );
}