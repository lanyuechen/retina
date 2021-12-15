import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Carousel, Row, Col, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import VideoCard from '@/components/VideoCard';

import style from './style.less';

export default (props: any) => {
  const { peers } = props;
  const carousel = useRef<any>();
  const navbar = useRef<HTMLDivElement>(null);
  const [ size, setSize ] = useState(1);
  const [ page, setPage ] = useState(0);

  const NAV_HEIGHT = 220;
  const NAV_MARGIN = 100;

  const mainPeer = peers[0];

  useEffect(() => {
    if (navbar.current) {
      const width = navbar.current.clientWidth - NAV_MARGIN;
      setSize(Math.floor(width / NAV_HEIGHT));
    }
  }, []);

  const next = () => {
    carousel.current.next();
  };

  const prev = () => {
    carousel.current.prev();
  };

  const pagination = useMemo(() => {
    const res = [];
    for (let i = 1; i <= Math.ceil(peers.length / size); i++) {
      res.push(peers.slice((i - 1) * size, i * size));
    }
    return res;
  }, [size, peers]);

  return (
    <div>
      <div className={style.navbar} ref={navbar}>
        <Carousel ref={carousel} dots={false} afterChange={setPage}>
          {pagination.map((peers, i: number) => (
            <div key={i}>
              <Row gutter={8} justify="center">
                {peers.map((d: any) => (
                  <Col key={d.peerId} flex={`0 0 ${NAV_HEIGHT}px`} >
                    <VideoCard peer={d} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
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
          disabled={page >= peers.length / size - 1}
          onClick={next}
        />
      </div>
      <div className={style.main}>
        <VideoCard peer={mainPeer} cover />
      </div>
    </div>
  )
}
