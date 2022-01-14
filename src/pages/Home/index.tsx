import { Link } from 'react-router-dom';
import Icon from '@/components/Icon';

import style from './style.module.less';

export default () => {

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="retina" />
          &nbsp;Retina
        </h1>
        <h2>Retina is a simple but powerful tool for video conference.</h2>
        <a href="https://github.com/lanyuechen/retina" className={style.btn}>
          <Icon type="github" />&nbsp;&nbsp;Github
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/join" className={style.btn}>
          <Icon type="plus-square" />&nbsp;&nbsp;加入会议
        </Link>
      </div>
    </div>
  );
}