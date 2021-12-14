import React, { useState, useEffect, useRef } from 'react';

export default () => {
  const [ time, setTime ] = useState('00:00');
  const store = useRef({
    start: Date.now(),
    end: Date.now(),
    stop: false
  });
  useEffect(() => {
    count();
    return () => {
      store.current.stop = true;
    }
  }, []);

  const count = () => {
    if (store.current.stop) {
      return;
    }

    requestAnimationFrame(() => {
      count();
    });
    
    const res = [];
    if (Date.now() - store.current.end < 1000) {
      return;
    }
    
    store.current.end = Date.now();
    let s = Math.floor((store.current.end - store.current.start) / 1000);
    // 小时
    if (s >= 3600) {
      const h = Math.floor(s / 3600);
      res.push(h > 9 ? h : `0${h}`);
      s = s % 3600;
    }
    // 分钟
    if (s >= 60) {
      const min = Math.floor(s / 60);
      res.push(min > 9 ? min : `0${min}`);
      s = s % 60;
    } else {
      res.push('00');
    }
    // 秒
    res.push(s > 9 ? s : `0${s}`);
    setTime(res.join(':'));
  }

  return (
    <span>{time}</span>
  );
}
