import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { Pagenation, ItemTag, BaseButton, } from '@components/common';
import { Link } from 'react-router-dom';

const NoticePage = () => {
    const [tab , setTab] = useState(1);
    const handleTab = (tab) => {
      setTab(tab);
    }
    const tabRef = useRef();
    
  return (
    <>
      <section>
        <h2>공지사항</h2>
        <article>
            <div className="noticelsBack">
                <div className="noticels">
                    <div className='box'>
                        <dl>
                            <dt>
                                <strong>공지사항</strong> 덴트너는 어떤 서비스 인가요?
                            </dt>
                            <dd>
                                <div>등록된 상세 내용이 노출됩니다</div>
                                <em>2024.08.08</em>
                            </dd>
                        </dl>
                        <dl className='on'>
                            <dt>
                                <strong>공지사항</strong> 덴트너는 어떤 서비스 인가요?
                            </dt>
                            <dd>
                                <div>
                                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                                </div>
                                <em>2024.08.08</em>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>공지사항</strong> 덴트너는 어떤 서비스 인가요?
                            </dt>
                            <dd>
                                <div>등록된 상세 내용이 노출됩니다</div>
                                <em>2024.08.08</em>
                            </dd>
                        </dl>
                    </div>
                </div>
                <Pagenation />
            </div>
        </article>
      </section>
    </>
  );
};

export default NoticePage;
