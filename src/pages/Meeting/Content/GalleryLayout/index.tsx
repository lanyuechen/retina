import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Row, Col, Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { MeetingContext } from '@/pages/Meeting';
import { ParticipantType } from '@/pages/Meeting/data';
import VideoCard from '../VideoCard';
import muteVideo from '../muteVideo';
import style from './style.module.scss';

export default () => {
  const { participants } = useContext(MeetingContext);
  const carousel = useRef<any>();
  const [ page, setPage ] = useState(0);

  useEffect(() => {
    console.log("[GalleryLayout] muteVideo")
    muteVideo(page, 9, participants);
  }, [page, participants.length]);

  const next = () => {
    carousel.current.next();
  };

  const prev = () => {
    carousel.current.prev();
  };

  const pagination = useMemo((): ParticipantType[][] => {
    const res = [];
    for (let i = 1; i <= Math.ceil(participants.length / 9); i++) {
      res.push(participants.slice((i - 1) * 9, i * 9));
    }
    return res;
  }, [participants]);

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
                    <VideoCard participant={d} />
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </Carousel>
      {participants.length > 9 && (
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
            disabled={page >= participants.length / 9 - 1}
            onClick={next}
          />
        </>
      )}
    </div>
  );
};
