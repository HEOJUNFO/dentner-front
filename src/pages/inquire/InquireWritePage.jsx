import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleTooth from '@assets/images/sample_tooth1.png';
import sampleTooth2 from '@assets/images/sample_tooth2.png';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx, BaseSelect } from '@components/common';
import InquireTipModal from '../../components/ui/modal/InquireTipModal';
import TemporaryModal from '../../components/ui/modal/TemporaryModal';
import OftenDTModal from '../../components/ui/modal/OftenDTModal';
import { ModalPresent } from '@components/common';
import { useTranslation } from 'react-i18next';

const InquireWritePage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [numvalue, setNumvalue] = useState(false);
  const [isOn, setOptionView] = useState(true);
  const { t } = useTranslation();

  const toggleHandler = () => {
    setOptionView(!isOn);
  };
  const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
  const [sStep, setSearchTab] = useState(1);
  const handleSearchTab = (sStep) => {
    setSearchTab(sStep);
  };
  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {}, [imgFileList]);
  const cate = [{ name: '카테고리' }, { name: '카테고리' }, { name: '카테고리' }];

  return (
    <>
      <section>
        <div className="titNbtn inqCase">
          <div>
            <h2>
              <strong>간편모드</strong>의뢰서 작성하기
            </h2>
            <span>
              <BaseButton label="임시저장 의뢰서 불러오기" className="btnL ss" onClick={() => setIsModal2(true)} />
            </span>
          </div>
        </div>
        <div className="writeBox">
          <div className="tws">
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
                    보철종류 <sup>필수항목</sup>
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
                                <ol>
                                  <li>
                                    <span>일반 (Hole X)</span>
                                  </li>
                                  <li>
                                    <span>SCRP (Hole O)</span>
                                  </li>
                                  <li className="on">
                                    <span>국소의치 지대치 일반</span>
                                    <ol className="checkCase">
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
                                  </li>
                                  <li>
                                    <span>국소의치 지대치 SCRP</span>
                                  </li>
                                  <li>
                                    <span>국기타(직접입력)</span>
                                  </li>
                                </ol>
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
                          </div>
                          <p>
                            <span className="left">크라운 &gt; Zirconia &gt; 국소의치 지대치 일반 &gt; Distal rest seat / Cingulum rest seat / Lingual ledge / Akers’ clasp (C-clasp)</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                          </p>
                        </div>
                      </div>
                      <div className={`${sStep === 2 ? 'listItem on' : 'listItem'}`}>
                        <strong onClick={() => handleSearchTab(2)}>캡</strong>
                        <div className="itemData">
                          <div>
                            <ul className="checkCase">
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
                          <p className="disabled">
                            <span className="left">캡 &gt; 국소의치 지대치 SCRP</span>
                            <BaseButton label="추가하기 (0/10)" className="btnB ss" disabled />
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
                                <ol className="precCategory">
                                  <li>카테고리를 선택해주세요</li>
                                  {/* <li>
                                                                    <span className='checkSet'>
                                                                        <input type='checkbox' id='checkboxf51' />
                                                                        <label htmlFor='checkboxf51'>1~4 Teeth</label>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span className='checkSet'>
                                                                        <input type='checkbox' id='checkboxf52' defaultChecked />
                                                                        <label htmlFor='checkboxf52'>5~ Teeth</label>
                                                                    </span>
                                                                </li> */}
                                </ol>
                              </li>
                            </ul>
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
                                <ol>
                                  <li className="on">
                                    <span>Partial</span>
                                    <ol className="checkCase">
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
                                  </li>
                                </ol>
                              </li>
                            </ul>
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
                                <ol className="checkCase">
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
                              </li>
                              <li>
                                <span>Mo Hole</span>
                              </li>
                            </ul>
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
                                <ol className="checkCase">
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
                              </li>
                            </ul>
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
                  </dd>
                </dl>
                <dl>
                  <dt>
                    보철종류 별 개수 <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <ul className="dChoosed">
                      <li>
                        <strong>크라운 &gt; Zirconia &gt; 국소의치 지대치 일반 &gt; Distal rest seat / Cingulum rest seat / Lingual ledge / Akers’ clasp (C-clasp)</strong>
                        <span className='edit'>
                          <span className="unit">
                            <input type="text" defaultValue="146" />
                            <em>개</em>
                          </span>
                          <BaseButton label="Del" className="bID ss" />
                        </span>
                      </li>
                    </ul>
                    <div className="guide">
                      <p>
                        보철종류를 선택해야 <strong>보철종류 별 개수 입력이 가능</strong>합니다.
                      </p>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>상세설명</dt>
                  <dd>
                    <div className="detailTxt">
                      <textarea placeholder="상세설명을 입력해 주세요"></textarea>
                      <div>
                        <BaseButton label="자주쓰는 말로 저장하기" disabled={true}  />
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
    </>
  );
};

export default InquireWritePage;
