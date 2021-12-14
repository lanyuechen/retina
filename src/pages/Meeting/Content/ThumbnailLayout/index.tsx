import React, { useRef, useEffect, useState, useContext, useMemo } from 'react';
import { Carousel, Row, Col, Button } from 'antd';
import { ParticipantType } from '@/pages/Meeting/data';
import VideoCard from '../VideoCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { MeetingContext } from '@/pages/Meeting';
import muteVideo from '../muteVideo';
import style from './style.module.scss';

export default () => {
  const { participants } = useContext(MeetingContext);
  const carousel = useRef<any>();
  const navbar = useRef<HTMLDivElement>();
  const [ size, setSize ] = useState(1);
  const [ page, setPage ] = useState(0);

  const NAV_HEIGHT = 220;
  const NAV_MARGIN = 100;

  const mainParticipant = participants.find(d => d.pinned) ||
    participants.find(d => d.share) ||
    participants.find(d => d.active) ||
    participants[0];

  useEffect(() => {
    const width = navbar.current.clientWidth - NAV_MARGIN;
    setSize(Math.floor(width / NAV_HEIGHT));
  }, []);

  useEffect(() => {
    if (size > 1) {
      console.log("[ThumbnailLayout] muteVideo")
      muteVideo(page, size, participants, mainParticipant.peerId);
    }
  }, [page, size, participants.length]);

  const next = () => {
    carousel.current.next();
  };

  const prev = () => {
    carousel.current.prev();
  };

  const pagination = useMemo(() => {
    const res = [];
    for (let i = 1; i <= Math.ceil(participants.length / size); i++) {
      res.push(participants.slice((i - 1) * size, i * size));
    }
    return res;
  }, [size, participants]);

  return (
    <div>
      <div className={style.navbar} ref={navbar}>
        <Carousel ref={carousel} dots={false} afterChange={setPage}>
          {pagination.map((peers, i: number) => (
            <div key={i}>
              <Row gutter={8} justify="center">
                {peers.map(d => (
                  <Col key={d.peerId} flex={`0 0 ${NAV_HEIGHT}px`} >
                    <VideoCard participant={d} />
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
          disabled={page >= participants.length / size - 1}
          onClick={next}
        />
      </div>
      <div className={style.main}>
        <VideoCard participant={mainParticipant} cover />
      </div>
    </div>
  )
}
