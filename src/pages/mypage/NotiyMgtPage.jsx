import React from 'react';
import { Pagenation } from '@components/common';

const NotiyMgtPage = () => {
  return (
    <>
        <article>
          <div className='mypageBox'>
            <div className='listTit'>
              <h3>알림 설정</h3>
            </div>
            <div className='notiySetting'>
              <ul>
                <li>
                    <dl>
                      <dt>
                        알림 종류 명
                      </dt>
                      <dd>
                        알림에 대한 상세 설명
                      </dd>
                    </dl>
                    <span className="toggleSet">
                        <input type="checkbox" id="push" />
                    </span>
                </li>
                <li>
                    <dl>
                      <dt>
                        알림 종류 명
                      </dt>
                      <dd>
                        알림에 대한 상세 설명
                      </dd>
                    </dl>
                    <span className="toggleSet">
                        <input type="checkbox" id="push2" defaultChecked />
                    </span>
                </li>
                <li>
                    <dl>
                      <dt>
                        알림 종류 명
                      </dt>
                      <dd>
                        알림에 대한 상세 설명
                      </dd>
                    </dl>
                    <span className="toggleSet">
                        <input type="checkbox" id="push3" defaultChecked />
                    </span>
                </li>
                <li>
                    <dl>
                      <dt>
                        알림 종류 명
                      </dt>
                      <dd>
                        알림에 대한 상세 설명
                      </dd>
                    </dl>
                    <span className="toggleSet">
                        <input type="checkbox" id="push4" defaultChecked />
                    </span>
                </li>
                <li>
                    <dl>
                      <dt>
                        알림 종류 명
                      </dt>
                      <dd>
                        알림에 대한 상세 설명
                      </dd>
                    </dl>
                    <span className="toggleSet">
                        <input type="checkbox" id="push5" defaultChecked />
                    </span>
                </li>
                <li>
                    <dl>
                      <dt>
                        알림 종류 명
                      </dt>
                      <dd>
                        알림에 대한 상세 설명
                      </dd>
                    </dl>
                    <span className="toggleSet">
                        <input type="checkbox" id="push6" />
                    </span>
                </li>
              </ul>
            </div>
          </div>
        </article>
    </>
  );
};

export default NotiyMgtPage;
