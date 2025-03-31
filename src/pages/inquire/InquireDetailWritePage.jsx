import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleTooth from '@assets/images/sample_tooth1.png';
import sampleTooth2 from '@assets/images/sample_tooth2.png';
import toothU from '@assets/images/tooth_upper.png';
import toothL from '@assets/images/tooth_lower.png';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx, BaseSelect } from '@components/common';
import InquireTipModal from '../../components/ui/modal/InquireTipModal';
import TemporaryModal from '../../components/ui/modal/TemporaryModal';
import OftenDTModal from '../../components/ui/modal/OftenDTModal';
import NumValueModal from '../../components/ui/modal/NumValueModal';
import { ModalPresent } from '@components/common';
import { useTranslation } from 'react-i18next';

const InquireWritePage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setIsModal4] = useState(false);
  const [numvalue, setNumvalue] = useState(false);
  const [isOn, setOptionView] = useState(true);
  const {t} = useTranslation();
  const toggleHandler = () => {
    setOptionView(!isOn);
  };
  const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
  const cate = [{ name: '카테고리' }, { name: '카테고리' }, { name: '카테고리' }];
  const way = [{ name: 'Milling [Zirconia]' }, { name: 'Milling [PMMA]' }, { name: 'Milling [Metal]' }, { name: 'Milling [Soft metal]' }, { name: '3D Printing [Resin]' }, { name: '3D Printing [Metal]' }, { name: '3D Printing [Zirconia]' }, { name: '기타 (직접입력)' }];

  const [sStep, setSearchTab] = useState(1);
  const handleSearchTab = (sStep) => {
    setSearchTab(sStep);
  };
  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {}, [imgFileList]);

  return (
    <>
      <section>
        <div className="titNbtn inqCase">
          <div>
            <h2>
              <strong>상세모드</strong>의뢰서 작성하기
            </h2>
            <span>
              <BaseButton label="임시저장 의뢰서 불러오기" className="btnL ss" onClick={() => setIsModal2(true)} />
            </span>
          </div>
        </div>
        <div className='inquireTab'>
          <nav>
            <ul>
              <li className='on'>
                <span>의뢰서 <em>a</em></span>
              </li>
              <li>
                <span>의뢰서 <em>b</em></span> {/* span 영역을 클릭 시 li on class 추가 */}
                <button className='bTD'>삭제</button>
              </li>
              <li>
                <span>의뢰서 <em>c</em></span>
                <button className='bTD'>삭제</button>
              </li>
              <li>
                <span>의뢰서 <em>d</em></span>
                <button className='bTD'>삭제</button>
              </li>
              <li>
                <span>의뢰서 <em>e</em></span>
                <button className='bTD'>삭제</button>
              </li>
              {/* <li>
                <span>의뢰서 <em>f</em></span>
                <button className='bTD'>삭제</button>
              </li> */}
              <li className='add'> {/* 6개 Full 이면 본 영역 삭제 */}
                <button className='bTA'>추가</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="writeBox inquireBox">
          {/* tws 영역을 tab 별로 적용 */}
          <div className="tws inqDCase">
            <button className='bTDM'>의뢰서 삭제</button> {/* 모바일용 tab 삭제버튼 */}
            <form>
              <div className="detail">
                <BaseButton label="작성 tip" className="btnB ss tip" onClick={() => setIsModal(true)} />
                <dl>
                  <dt>
                    의뢰번호 <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseInput type="text" placeholder="" value={'@8321430183048173057'} />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    보철종류를 선택한 후, 치식을 선택해주세요 <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <div className="prostheticsType">
                      <div className={`${sStep === 1 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(1)}>크라운</strong>
                        <div className="itemData">
                          <div>
                            <ul>
                              <li className="on">
                                <span>Zirconia</span>
                              </li>
                              <li>
                                <span>Resin</span>
                              </li>
                              <li>
                                <span>Metal</span>
                              </li>
                              <li>
                                <span>Wax</span>
                              </li>
                            </ul>
                            <ol>
                              <li>
                                <span>일반 (Hole X)</span>
                              </li>
                              <li>
                                <span>SCRP (Hole O)</span>
                              </li>
                              <li className="on">
                                <span>국소의치 지대치 일반</span>
                              </li>
                              <li>
                                <span>국소의치 지대치 SCRP</span>
                              </li>
                              <li>
                                <span>국기타(직접입력)</span>
                              </li>
                            </ol>
                            <ol className="noDeph">
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf01" />
                                  <label htmlFor="checkboxf01">Mesial rest seat</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf02" defaultChecked />
                                  <label htmlFor="checkboxf02">Distal rest seat</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf03" defaultChecked />
                                  <label htmlFor="checkboxf03">Cingulum rest seat</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf04" />
                                  <label htmlFor="checkboxf04">No rest seat</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf05" defaultChecked />
                                  <label htmlFor="checkboxf05">Lingual ledge</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf06" defaultChecked />
                                  <label htmlFor="checkboxf06">Akers’ clasp (C-clasp)</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf07" />
                                  <label htmlFor="checkboxf07">RPA clasp</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf08" />
                                  <label htmlFor="checkboxf08">RPA clasp</label>
                                </span>
                              </li>
                            </ol>
                          </div>
                          <p>
                            <span className="left">
                              크라운 &gt; <input type="text" placeholder="2차 보철종류를 입력하세요" /> &gt; 국소의치 지대치 일반 &gt; Distal rest seat / Cingulum rest seat / Lingual ledge / Akers’
                              clasp (C-clasp)
                            </span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 2 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(2)}>캡</strong>
                        <div className="itemData">
                          <div>
                            <ul className="noDeph">
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf21" />
                                  <label htmlFor="checkboxf21">일반 (Hole X)</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf22" />
                                  <label htmlFor="checkboxf22">SCRP (Hole O)</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf23" />
                                  <label htmlFor="checkboxf23">국소의치 지대치 일반</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf24" />
                                  <label htmlFor="checkboxf24">국소의치 지대치 SCRP</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf25" />
                                  <label htmlFor="checkboxf25">기타(직접입력)</label>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <p>
                            <span className="left">캡 &gt; 국소의치 지대치 SCRP</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 3 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(3)}>어버트먼트</strong>
                        <div className="itemData">
                          <div></div>
                          <p>
                            <span className="left">어버트먼트</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 4 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(4)}>인레이/온레이</strong>
                        <div className="itemData">
                          <div></div>
                          <p>
                            <span className="left">인레이/온레이</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 5 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(5)}>의치</strong>
                        <div className="itemData">
                          <div>
                            <ul>
                              <li>
                                <span>Full</span>
                              </li>
                              <li>
                                <span>Partial</span>
                              </li>
                              <li className="on">
                                <span>Flipper</span>
                              </li>
                            </ul>
                            <ol className="noDeph">
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf51" />
                                  <label htmlFor="checkboxf51">1~4 Teeth</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf52" defaultChecked />
                                  <label htmlFor="checkboxf52">5~ Teeth</label>
                                </span>
                              </li>
                            </ol>
                          </div>
                          <p>
                            <span className="left">의치 &gt; Flipper &gt; 5~ Teeth &gt;Two body(Base / Teeth)</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 6 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(6)}>스프린트/서지컬가이드</strong>
                        <div className="itemData">
                          <div>
                            <ul>
                              <li>
                                <span>Splint</span>
                              </li>
                              <li className="on">
                                <span>Surgical Guide</span>
                              </li>
                            </ul>
                            <ol>
                              <li className="on">
                                <span>Partial</span>
                              </li>
                            </ol>
                            <ol className="noDeph">
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf61" />
                                  <label htmlFor="checkboxf61">1~3 Holes</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf62" />
                                  <label htmlFor="checkboxf62">4~ Holes</label>
                                </span>
                              </li>
                            </ol>
                          </div>
                          <p>
                            <span className="left">스프린트/서지컬가이드 &gt; Surgical Guide &gt; Partial &gt; 1~3 Holes</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 7 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(7)}>개인트레이</strong>
                        <div className="itemData">
                          <div>
                            <ul>
                              <li className="on">
                                <span>Hole</span>
                              </li>
                              <li>
                                <span>Mo Hole</span>
                              </li>
                            </ul>
                            <ol className="noDeph">
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf71" />
                                  <label htmlFor="checkboxf71">일반</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf71" />
                                  <label htmlFor="checkboxf71">Transfer type</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf71" />
                                  <label htmlFor="checkboxf71">Pick-up type</label>
                                </span>
                              </li>
                            </ol>
                          </div>
                          <p>
                            <span className="left">개인트레이 &gt; Hole &gt; Pick-up type</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 8 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(8)}>프레임</strong>
                        <div className="itemData">
                          <div>
                            <ul>
                              <li>
                                <span>Partial</span>
                              </li>
                              <li className="on">
                                <span>Full</span>
                              </li>
                            </ul>
                            <ol className="noDeph">
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf81" />
                                  <label htmlFor="checkboxf81">Full mesh</label>
                                </span>
                              </li>
                              <li>
                                <span className="checkSet">
                                  <input type="checkbox" id="checkboxf82" />
                                  <label htmlFor="checkboxf82">직접입력</label>
                                </span>
                              </li>
                            </ol>
                          </div>
                          <p>
                            <span className="left">프레임 &gt; Full &gt; 직접입력</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 9 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(9)}>교정</strong>
                        <div className="itemData">
                          <div></div>
                          <p>
                            <span className="left">교정</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 10 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(10)}>기타</strong>
                        <div className="itemData">
                          <div></div>
                          <p>
                            <span className="left">기타</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="prostheticsMType">
                      <BaseSelect items={cate} placeholder={'1차 카테고리 '} onChange={(e) => console.log(e)} />
                      <BaseSelect items={cate} placeholder={'2차 카테고리 '} onChange={(e) => console.log(e)} />
                      <BaseSelect items={cate} placeholder={'3차 카테고리 '} onChange={(e) => console.log(e)} />
                      <BaseSelect items={cate} placeholder={'4차 카테고리 '} onChange={(e) => console.log(e)} />
                    </div>
                    <div className="toothSelectBack">
                      <div className="toothSelect">
                        <div className="tnb left">
                          <BaseButton label="상악" className="btnB ss" disabled />
                          <div className="toothBack upper">
                            <div className="toothNum">
                              <em className='on'>18</em>
                              <em className='on'>17</em>
                              <em className='on'>16</em>
                              <em>15</em>
                              <em>14</em>
                              <em>13</em>
                              <em>12</em>
                              <em className='on'>11</em>
                              <em>21</em>
                              <em>22</em>
                              <em>23</em>
                              <em>24</em>
                              <em>25</em>
                              <em>26</em>
                              <em>27</em>
                              <em>28</em>
                            </div>
                            <div className="toothChoice">
                              <span className='on'>18</span>
                              <span className='on'>17</span>
                              <span className='on'>16</span>
                              <span>15</span>
                              <span>14</span>
                              <span>13</span>
                              <span>12</span>
                              <span className='on'>11</span>
                              <span>21</span>
                              <span>22</span>
                              <span>23</span>
                              <span>24</span>
                              <span>25</span>
                              <span>26</span>
                              <span>27</span>
                              <span>28</span>
                            </div>
                            <div className="toothBridge">
                              <span className='on bridge'>18 ~ 17</span>
                              <span className='on'>17 ~ 16</span>
                              <span>16 ~ 15</span>
                              <span>15 ~ 14</span>
                              <span>14 ~ 13</span>
                              <span>13 ~ 12</span>
                              <span>12 ~ 11</span>
                              <span>11 ~ 21</span>
                              <span>21 ~ 22</span>
                              <span>22 ~ 23</span>
                              <span>23 ~ 24</span>
                              <span>24 ~ 25</span>
                              <span>25 ~ 26</span>
                              <span>26 ~ 27</span>
                              <span>27 ~ 28</span>
                            </div>
                            <div className="toothBase">
                              <img src={toothU} />
                            </div>
                          </div>
                        </div>
                        <div className="tnb right">
                          <BaseButton label="하악" className="btnB ss" />
                          <div className="toothBack lower">
                            <div className="toothNum">
                              <em>48</em>
                              <em>47</em>
                              <em>46</em>
                              <em>45</em>
                              <em>44</em>
                              <em>43</em>
                              <em>42</em>
                              <em>41</em>
                              <em>31</em>
                              <em>32</em>
                              <em>33</em>
                              <em>34</em>
                              <em>35</em>
                              <em>36</em>
                              <em>37</em>
                              <em>38</em>
                            </div>
                            <div className="toothChoice">
                              <span>48</span>
                              <span>47</span>
                              <span>46</span>
                              <span>45</span>
                              <span>44</span>
                              <span>43</span>
                              <span>42</span>
                              <span>41</span>
                              <span>31</span>
                              <span>32</span>
                              <span>33</span>
                              <span>34</span>
                              <span>35</span>
                              <span>36</span>
                              <span>37</span>
                              <span>38</span>
                            </div>
                            <div className="toothBridge">
                              <span>48 ~ 47</span>
                              <span>47 ~ 46</span>
                              <span>46 ~ 45</span>
                              <span>45 ~ 44</span>
                              <span>44 ~ 43</span>
                              <span>43 ~ 42</span>
                              <span>42 ~ 41</span>
                              <span>41 ~ 31</span>
                              <span>31 ~ 32</span>
                              <span>32 ~ 33</span>
                              <span>33 ~ 34</span>
                              <span>34 ~ 35</span>
                              <span>35 ~ 36</span>
                              <span>36 ~ 37</span>
                              <span>37 ~ 38</span>
                            </div>
                            <div className="toothBase">
                              <img src={toothL} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="guide">
                        <div>
                          <p>치식 선택 후, <strong>shift</strong> 누른채로 다른 치식 선택 시, <strong>중간 전체 선택</strong>이 가능합니다.</p>
                          <p>연속된 치식을 선택하면 치식 사이에 점선으로 브릿지 표시가 생기는데 이때 생기는 점선을 클릭하면 <strong>브릿지가 생성</strong>됩니다.</p>
                          <p>생성된 브릿지를 다시 클릭하면 선택한 <strong>브릿지가 취소</strong>됩니다.</p>
                        </div>
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    선택된 치식 <sup>필수항목</sup>
                  </dt>
                  <dd className="dUnitSet">
                    <span className="dUnit">
                      개별 <strong>26</strong> <BaseButton label="Del" className="bID ss" />
                    </span>
                    <span className="dUnit">
                      개별 <strong>33</strong> <BaseButton label="Del" className="bID ss" />
                    </span>
                    <span className="dUnit">
                      브릿지 <strong>33~34</strong> <BaseButton label="Del" className="bID ss" />
                    </span>
                    <span className="dUnit">
                      (상악)묶음 <strong>26,27,28</strong> <BaseButton label="Del" className="bID ss" />
                    </span>
                    <span className="dUnit">
                      (하악)묶음 <strong>26~33</strong> <BaseButton label="Del" className="bID ss" />
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>치식 선택 시, 보철종류 별 개수는 자동 입력됩니다</dt>
                  <dd>
                    <ul className="dChoosed">
                      <li>
                        <strong>크라운 &gt; Zirconia &gt; 국소의치 지대치 일반 &gt; Distal rest seat / Cingulum rest seat / Lingual ledge / Akers’ clasp (C-clasp)</strong>
                        <span className='edit'>
                          <em className="num">
                            <i>146</i>개
                          </em>
                          <BaseButton label="Del" className="bID ss" />
                        </span>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <div>
                  <BaseButton label={`${isOn ? '선택 입력항목 접기' : '선택 입력항목 보기'}`} className={`${isOn ? 'btnOptionMore on' : 'btnOptionMore'}`} onClick={toggleHandler} />
                  <div className="optionArea" style={{ display: `${isOn ? 'block' : 'none'}` }}>
                    <dl>
                      <dt>가공방법</dt>
                      <dd className="itemSelect">
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio1" />
                          <label htmlFor="radio1">Milling [Zirconia]</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio2" />
                          <label htmlFor="radio2">Milling [PMMA]</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio3" />
                          <label htmlFor="radio3">Milling [Metal]</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio4" />
                          <label htmlFor="radio4">Milling [Soft metal]</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio5" />
                          <label htmlFor="radio5">3D Printing [Resin]</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio6" />
                          <label htmlFor="radio6">3D Printing [Metal]</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio1" id="radio7" />
                          <label htmlFor="radio7">3D Printing [Zirconia]</label>
                        </span>
                        <span className="radioSet last">
                          <input type="radio" name="radio1" id="radio8" />
                          <label htmlFor="radio8">기타 (직접입력)</label>
                        </span>
                        <input type="text" placeholder="가공방법을 입력하세요" />
                      </dd>
                      <dd className="itemMSelect">
                        <BaseSelect items={way} placeholder={'Milling [Zirconia]'} onChange={(e) => console.log(e)} />
                        <input type="text" placeholder="가공방법을 입력하세요" />
                      </dd>
                    </dl>
                    <dl>
                      <dt>임플란트 종류 입력</dt>
                      <dd className="maxW">
                        <BaseInput type="text" placeholder="임플란트 종류를 입력하세요" />
                      </dd>
                    </dl>
                    <dl>
                      <dt>수치값</dt>
                      <dd className={!numvalue ? "numvalue" : "numvalue directCase"}>
                        <span className="radioSet">
                          <input type="radio" name="radio00" id="radio007" onChange={() => setNumvalue(!numvalue)} />
                          <label htmlFor="radio007">직접입력</label>
                        </span>
                        <span className="radioSet">
                          <input type="radio" name="radio00" id="radio008" defaultChecked onChange={() => setNumvalue(!numvalue)} />
                          <label htmlFor="radio008">디자이너 수치값 사용</label>
                        </span>
                        <div className="direct" style={{ display: `${numvalue ? 'block' : 'none'}` }}>
                          <span className="ipBtn">
                            <input type="text" placeholder="수치값의 제목을 입력해주세요" />
                            <BaseButton label="수치값 제목 불러오기" onClick={() => setIsModal4(true)} />
                          </span>
                          <span className="checkSet">
                            <input type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1">자주쓰는 수치값 제목으로 저장</label>
                          </span>
                          <ul>
                            <li>
                              <strong>Cement gap</strong>
                              <span className="unit">
                                <input type="text" defaultValue="0.00" />
                                <em>mm</em>
                              </span>
                            </li>
                            <li>
                              <strong>Extra cement gap</strong>
                              <span className="unit">
                                <input type="text" defaultValue="0.00" />
                                <em>mm</em>
                              </span>
                            </li>
                            <li>
                              <strong>Occlusal distance</strong>
                              <span className="unit">
                                <input type="text" defaultValue="0.00" />
                                <em>mm</em>
                              </span>
                            </li>
                            <li>
                              <strong>Approximal distance</strong>
                              <span className="unit">
                                <input type="text" defaultValue="0.00" />
                                <em>mm</em>
                              </span>
                            </li>
                            <li>
                              <strong>Height for minimal gap</strong>
                              <span className="unit">
                                <input type="text" defaultValue="0.00" />
                                <em>mm</em>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </dd>
                    </dl>
                    <dl>
                      <dt>Pontic 디자인</dt>
                      <dd className="pontic">
                        <span className="radioSet d1">
                          <input type="radio" name="radio3" id="radio1" />
                          <label htmlFor="radio1">Saddle pontic</label>
                        </span>
                        <span className="radioSet d2">
                          <input type="radio" name="radio3" id="radio2" />
                          <label htmlFor="radio2">Ridge lap pontic</label>
                        </span>
                        <span className="radioSet d3">
                          <input type="radio" name="radio3" id="radio3" />
                          <label htmlFor="radio3">
                            Modified ridge
                            <br />
                            lap pontic
                          </label>
                        </span>
                        <span className="radioSet d4">
                          <input type="radio" name="radio3" id="radio4" />
                          <label htmlFor="radio4">Ovate pontic</label>
                        </span>
                        <span className="radioSet d5">
                          <input type="radio" name="radio3" id="radio5" />
                          <label htmlFor="radio5">Conical pontic</label>
                        </span>
                        <span className="radioSet d6">
                          <input type="radio" name="radio3" id="radio5" />
                          <label htmlFor="radio5">Spheroidal pontic</label>
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <dl>
                  <dt>상세설명</dt>
                  <dd>
                    <div className="detailTxt">
                      <textarea placeholder="상세설명을 입력해 주세요"></textarea>
                      <div>
                        <BaseButton label="자주쓰는 말로 저장하기" disabled={true} />
                        <BaseButton label="자주쓰는 말 불러오기" onClick={() => setIsModal3(true)} />
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt className="etc">
                    <span>
                      파일첨부
                      <sup>필수항목</sup>
                    </span>
                    <em className="fileNum">
                      (<strong>2</strong>/10)
                    </em>
                  </dt>
                  <dd>
                    <ImageSettingEx imgFileList={imgFileList} setImgFileList={setImgFileList} />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    하단의 필수항목 동의 후 저장이 가능합니다! <sup>필수항목</sup>
                  </dt>
                  <dd className="inqAgree">
                    <div>
                      <span className="checkSet">
                        <input type="checkbox" id="agree1" />
                        <label htmlFor="agree1">내용을 정확히 작성하였고 확인하였습니다.</label>
                      </span>
                    </div>
                    <div>
                      <span className="checkSet">
                        <input type="checkbox" id="agree2" />
                        <label htmlFor="agree2">
                          [의뢰인]은, [환자]의 의료정보, 민감정보 또는 개인정보인 [보철물 의뢰에 필요한 의뢰서, 3D File]을 개인정보 보호법 제17조에 따라 [환자]로부터 제3자인 주식회사 덴트너에 제공하는
                          것에 대하여 명시적이고 구체적인 동의를 받았음을 확인합니다.
                        </label>
                      </span>
                      <BaseButton label="양식 보기" />
                    </div>
                    <div>
                      <em>* 주식회사 덴트너와 개인정보 업무위탁 계약관리를 체결하면, 환자에게 매번 '개인정보 제 3자 제공 동의서'를 받지 않아도 됩니다. </em>
                      <BaseButton label="자세히 보기" />
                    </div>
                  </dd>
                </dl>
              </div>
              <div className="btnArea">
                <BaseButton label={'임시 저장하기'} className={'btnL'} />
                <BaseButton label={'저장하기'} className={'btnB'} />
              </div>
            </form>
          </div>
        </div>
      </section>
      {isModal && (
        <ModalPresent>
          <InquireTipModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal2 && (
        <ModalPresent>
          <TemporaryModal
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal3 && (
        <ModalPresent>
          <OftenDTModal
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal4 && (
        <ModalPresent>
          <NumValueModal
            onClose={() => {
              setIsModal4(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default InquireWritePage;
