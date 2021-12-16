import React from 'react';

import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2320911_div6s31if17.js',
});

export default (props: any) => {
  return (
    <Icon {...props} />
  );
}