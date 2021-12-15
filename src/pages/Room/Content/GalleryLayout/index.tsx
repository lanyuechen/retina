import React, { useRef, useState, useMemo } from 'react';
import { Row, Col, Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import VideoCard from '@/components/VideoCard';

import type { GalleryLayoutProps } from './typings';

import style from './style.less';

export default (props: GalleryLayoutProps) => {
  const { peers } = props;

  const [ page, setPage ] = useState(0);
  const carousel = useRef<any>();

  const next = () => {
    carousel.current.next();
  };

  const prev = () => {
    carousel.current.prev();
  };

  const pagination = useMemo((): any[][] => {
    const res = [];
    const page = Math.ceil(peers.length / 9);
    for (let i = 1; i <= page; i++) {
      res.push(peers.slice((i - 1) * 9, i * 9));
    }
    return res;
  }, [peers]);

  return (
    <div className={style.pagination}>
      <Carousel ref={carousel} dots={false} afterChange={setPage}>
        {pagination.map((peers, i: number) => {
          const cols = Math.ceil(Math.sqrt(peers.length));
          return (
            <div key={i} className={style.container}>
              <Row gutter={8} justify="center">
                {peers.map((d: any, i: number) => (
                  <Col key={i} flex={`0 0 ${(1 / cols) * 100}%`}>
                    <VideoCard peer={d} />
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </Carousel>
      {peers.length > 9 && (
        <>
          <Button
            className={style.prev}
            icon={<LeftOutlined />}
            shape="circle"
            disabled={page <= 0}
            onClick={prev}
          />
          <Button
            className={style.next}
            icon={<RightOutlined />}
            shape="circle"
            disabled={page >= peers.length / 9 - 1}
            onClick={next}
          />
        </>
      )}
    </div>
  );
};
