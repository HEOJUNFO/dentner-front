import styles from './pay_terms_2_files/terms.module.css';

const Terms1 = () => {
  return (
    <div className={styles['terms_wrap']}>
      <h1>전자금융거래 기본약관</h1>

      <div className={styles.item}>
        <h2>제1조 (목적)</h2>
        <div className={styles.con}>
          이 약관은 전자지급결제대행 서비스를 제공하는 주식회사 인피니소프트(이하 ‘회사’라 합니다)와 이용자 사이의 전자금융거래에 관한 기본적인 사항을 정함을 목적으로 한다.
        </div>
      </div>
      <div className={styles.item}>
        <h2>제2조 (용어의 정의)</h2>
        <div className={styles.con}>이 약관에서 정하는 용어의 정의는 다음과 같습니다.</div>
        <ol>
          <li>
            ‘전자금융거래’라 함은 회사가 전자적 장치를 통하여 전자지급결제대행서비스 및 전자금융 중개서비스(이하 ‘전자금융거래 서비스’라고 합니다)를 제공하고, 이용자가 회사의 종사자와 직접 대면하거나
            의사소통을 하지 아니하고 자동화된 방식으로 이를 이용하는 거래를 말합니다.
          </li>
          <li>
            ‘전자지급결제대행 서비스’라 함은 전자적 방법으로 재화의 구입 또는 용역의 이용에 있어서 지급결제정보를 송신하거나 수신하는 것 또는 그 대가의 정산을 대행하거나 매개하는 서비스를 말합니다.
          </li>
          <li>
            ‘결제대금예치서비스’라 함은 이용자가 재화의 구입 또는 용역의 이용에 있어서 그 대가(이하 ‘결제대금’이라 한다)의 전부 또는 일부를 재화 또는 용역(이하 ‘재화 등’이라 합니다)을 공급받기 전에
            미리 지급하는 경우, 회사가 이용자의 물품수령 또는 서비스 이용 확인 시점까지 결제대금을 예치하는 서비스를 말합니다.
          </li>
          <li>‘이용자’라 함은 이 약관에 동의하고 회사가 제공하는 전자금융거래 서비스를 이용하는 자를 말합니다.</li>
          <li>
            ‘접근매체’라 함은 전자금융거래에 있어서 거래지시를 하거나 이용자 및 거래내용의 진실성과 정확성을 확보하기 위하여 사용되는 수단 또는 정보로서 전자식 카드 및 이에 준하는 전자적
            정보(신용카드번호를 포함한다), ‘전자서명법’상의 인증서, 금융기관 또는 전자금융업자에 등록된 이용자번호, 이용자의 생체정보, 이상의 수단이나 정보를 사용하는데 필요한 비밀번호 등
            전자금융거래법 제2조 제10호에서 정하고 있는 것을 말합니다.
          </li>
          <li>‘거래지시’라 함은 이용자가 전자금융거래계약에 따라 금융기관 또는 전자금융업자에게 전자금융거래의 처리를 지시하는 것을 말합니다.</li>
          <li>‘오류’라 함은 이용자의 고의 또는 과실 없이 전자금융거래가 전자금융거래계약 또는 이용자의 거래지시에 따라 이행되지 아니한 경우를 말합니다.</li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제3조 (약관의 명시 및 변경)</h2>
        <ol>
          <li>회사는 이용자가 전자금융거래 서비스를 이용하기 전에 이 약관을 게시하고 이용자가 이 약관의 중요한 내용을 확인할 수 있도록 합니다.</li>
          <li>회사는 이용자의 요청이 있는 경우 전자문서의 전송방식에 의하여 본 약관의 사본을 이용자에게 교부합니다.</li>
          <li>회사가 약관을 변경하는 때에는 그 시행일 1월 전에 변경되는 약관을 회사가 제공하는 전자금융거래 서비스 이용 초기화면 및 회사의 홈페이지에 게시함으로써 이용자에게 공지합니다.</li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제4조 (접근매체의 관리 등)</h2>
        <ol>
          <li>회사는 전자금융거래 서비스 제공 시 접근매체를 선정하여 이용자의 신원, 권한 및 거래지시의 내용 등을 확인할 수 있습니다.</li>
          <li>이용자는 접근매체를 제3자에게 대여하거나 사용을 위임하거나 양도 또는 담보 목적으로 제공할 수 없습니다.</li>
          <li>이용자는 자신의 접근매체를 제3자에게 누설 또는 노출하거나 방치하여서는 안되며, 접근매체의 도용이나 위조 또는 변조를 방지하기 위하여 충분한 주의를 기울여야 합니다.</li>
          <li>회사는 이용자로부터 접근매체의 분실이나 도난 등의 통지를 받은 때에는 그 때부터 제3자가 그 접근매체를 사용함으로 인하여 이용자에게 발생한 손해를 배상할 책임이 있습니다.</li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제5조 (회사의 책임)</h2>
        <ol>
          <li>
            회사는 접근매체의 위조나 변조로 발생한 사고로 인하여 이용자에게 발생한 손해에 대하여 배상책임이 있습니다. 다만 이용자가 권한 없는 제3자가 이용자의 접근매체를 이용하여 전자금융거래를 할 수
            있음을 알았거나 알 수 있었음에도 불구하고 이용자가 자신의 접근매체를 누설 또는 노출하거나 방치한 경우 그 책임의 전부 또는 일부를 이용자가 부담하게 할 수 있습니다.
          </li>
          <li>
            회사는 계약체결 또는 거래지시의 전자적 전송이나 처리과정에서 발생한 사고로 인하여 이용자에게 손해가 발생한 경우에는 그 손해를 배상할 책임이 있습니다. 다만, 본 조 제1항 단서에 해당하거나 본
            조 제2항에 해당하거나 법인(‘중소기업기본법’ 제2조 제2항에 의한 소기업을 제외한다)인 이용자에게 손해가 발생한 경우로서 회사가 사고를 방지하기 위하여 보안절차를 수립하고 이를 철저히 준수하는
            등 합리적으로 요구되는 충분한 주의의무를 다한 경우 회사는 배상할 책임이 없습니다.
          </li>
          <li>
            회사는 이용자로부터의 거래지시가 있음에도 불구하고 천재지변, 회사의 귀책사유가 없는 정전, 화재, 통신장애 기타의 불가항력적인 사유로 처리 불가능하거나 지연된 경우로서 이용자에게 처리 불가능
            또는 지연사유를 통지한 경우(금융기관 또는 결제수단 발행업체나 통신판매업자가 통지한 경우를 포함합니다)에는 이용자에 대하여 이로 인한 책임을 지지 아니합니다.
          </li>
          <li>
            <span>
              회사는 전자금융거래를 위한 전자적 장치 또는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 제2조 제1항 제1호에 따른 정보통신망에 침입하여 거짓이나 그 밖의 부정한 방법으로 획득한
              접근매체의 이용으로 발생한 사고로 인하여 이용자에게 그 손해가 발생한 경우에는 그 손해를 배상할 책임이 있습니다. 다만, 다음과 같은 경우 회사는 이용자에 대하여 책임을 지지 않습니다.
            </span>
            <ul>
              <li>회사가 접근매체에 따른 확인 외에 보안강화를 위하여 전자금융거래 시 요구하는 추가적인 보안조치를 이용자가 정당한 사유 없이 거부하여 사고가 발생한 경우</li>
              <li>
                이용자가 추가적인 보안조치에서 사용되는 매체, 수단 또는 정보에 대하여 누설, 누출 또는 방치한 행위 또는 제3자에게 대여하거나 그 사용을 위임한 행위 또는 양도나 담보의 목적으로 제공한
                행위
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제6조 (거래내용의 확인)</h2>
        <ol>
          <li>
            회사는 이용자와 미리 약정한 전자적 방법을 통하여 이용자의 거래내용(이용자의 ‘오류정정 요구사실 및 처리결과에 관한 사항’을 포함합니다)을 확인할 수 있도록 하며, 이용자의 요청이 있는 경우에는
            요청을 받은 날로부터 2주 이내에 모사전송 등의 방법으로 거래내용에 관한 서면을 교부합니다.
          </li>
          <li>
            회사가 이용자에게 제공하는 거래내용 중 거래계좌의 명칭 또는 번호, 거래의 종류 및 금액, 거래상대방을 나타내는 정보, 거래일자, 전자적 장치의 종류 및 전자적 장치를 식별할 수 있는 정보와 해당
            전자금융거래와 관련한 전자적 장치의 접속기록은 5년간, 건당 거래금액이 1만원 이하인 소액 전자금융거래에 관한 기록, 전자지급수단 이용시 거래승인에 관한 기록, 이용자의 오류정정 요구사실 및
            처리결과에 관한 사항은 1년간의 기간을 대상으로 하되, 회사가 전자금융거래 서비스 제공의 대가로 수취한 수수료에 관한 사항은 제공하는 거래내용에서 제외합니다.
          </li>
          <li>
            <span>이용자가 제1항에서 정한 서면교부를 요청하고자 할 경우 다음의 주소 및 전화번호로 요청할 수 있습니다.</span>
            <ul>
              <li>주소: 서울시 금천구 가산디지털1로 137, 10층 (가산동, IT캐슬 2차)</li>
              <li>이메일 주소: cs@infinisoft.co.kr</li>
              <li>전화번호: 1688-1250</li>
            </ul>
          </li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제7조 (오류의 정정 등)</h2>
        <ol>
          <li>이용자는 전자금융거래 서비스를 이용함에 있어 오류가 있음을 안 때에는 회사에 대하여 그 정정을 요구할 수 있습니다.</li>
          <li>회사는 전항의 규정에 따른 오류의 정정요구를 받은 때에는 이를 즉시 조사하여 처리한 후 정정요구를 받은 날부터 2주 이내에 그 결과를 이용자에게 알려 드립니다.</li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제8조 (전자금융거래 서비스 이용 기록의 생성 및 보존)</h2>
        <ol>
          <li>회사는 이용자가 전자금융거래의 내용을 추적, 검색하거나 그 내용에 오류가 발생한 경우에 이를 확인하거나 정정할 수 있는 기록을 생성하여 보존합니다.</li>
          <li>전항의 규정에 따라 회사가 보존하여야 하는 기록의 종류 및 보존방법은 제6조 제2항에서 정한 바에 따릅니다.</li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제9조 (거래지시의 철회 제한)</h2>
        <ol>
          <li>이용자는 전자지급거래에 관한 거래지시의 경우 지급의 효력이 발생하기 전까지 거래지시를 철회할 수 있습니다.</li>
          <li>
            전항의 지급의 효력이 발생 시점이란 (i) 전자자금이체의 경우에는 거래 지시된 금액의 정보에 대하여 수취인의 계좌가 개설되어 있는 금융기관의 계좌 원장에 입금기록이 끝난 때 (ii) 그 밖의
            전자지급수단으로 지급하는 경우에는 거래 지시된 금액의 정보가 수취인의 계좌가 개설되어 있는 금융기관의 전자적 장치에 입력이 끝난 때를 말합니다.
          </li>
          <li>
            이용자는 지급의 효력이 발생한 경우에는 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령상 청약의 철회의 방법 또는 본 약관 제5조에서 정한 바에 따라 결제대금을 반환 받을 수 있습니다.
          </li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제10조 (전자금융거래정보의 제공금지)</h2>
        <div className={styles.con}>
          회사는 전자금융거래 서비스를 제공함에 있어서 취득한 이용자의 인적 사항, 이용자의 계좌, 접근매체 및 전자금융거래의 내용과 실적에 관한 정보 또는 자료를 이용자의 동의를 얻지 아니하고 제3자에게
          제공, 누설하거나 업무상 목적 외에 사용하지 아니합니다.
        </div>
      </div>
      <div className={styles.item}>
        <h2>제11조 (분쟁처리 및 분쟁조정)</h2>
        <ol>
          <li>
            이용자는 다음의 분쟁처리 책임자 및 담당자에 대하여 전자금융거래 서비스 이용과 관련한 의견 및 불만의 제기, 손해배상의 청구 등의 분쟁처리를 요구할 수 있습니다.
            <ul>
              <li>전화번호: 1688-1250</li>
              <li>전자우편주소: cs@infinisoft.co.kr</li>
            </ul>
          </li>
          <li>이용자가 회사에 대하여 분쟁처리를 신청한 경우에는 회사는 15일 이내에 이에 대한 조사 또는 처리 결과를 이용자에게 안내합니다.</li>
          <li>
            이용자는 ‘금융감독기구의 설치 등에 관한 법률’ 제51조의 규정에 따른 금융감독원의 금융분쟁조정위원회나 ‘소비자보호법’ 제31조 제1항의 규정에 따른 소비자보호원에 회사의 전자금융거래 서비스의
            이용과 관련한 분쟁조정을 신청할 수 있습니다.
          </li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>제12조 (회사의 안정성 확보 의무)</h2>
        <div className={styles.con}>
          회사는 전자금융거래의 안전성과 신뢰성을 확보할 수 있도록 전자금융거래의 종류별로 전자적 전송이나 처리를 위한 인력, 시설, 전자적 장치 등의 정보기술부문 및 전자금융업무에 관하여
          금융감독위원회가 정하는 기준을 준수합니다.
        </div>
      </div>
      <div className={styles.item}>
        <h2>제13조 (약관 외 준칙 및 관할)</h2>
        <ol>
          <li>
            이 약관에서 정하지 아니한 사항에 대하여는 전자금융거래법, 전자상거래 등에서의 소비자 보호에 관한 법률, 통신판매에 관한 법률, 여신전문금융업법 등 소비자보호 관련 법령에서 정한 바에
            따릅니다.
          </li>
          <li>회사와 이용자간에 발생한 분쟁에 관한 관할은 민사소송법에서 정한 바에 따릅니다.</li>
        </ol>
      </div>
      <div className={styles.item}>
        <h2>부칙</h2>
        <ol>
          <li>본 약관은 2017년 12월 11일부터 적용합니다.</li>
        </ol>
      </div>
    </div>
  );
};

export default Terms1;
