import React from 'react';

const Sample = React.lazy(() => import('@pages/sample_page/SamplePage'));
const ComponentPage = React.lazy(() => import('@pages/sample_page/ComponentPage'));

// 로그인 회원가입
const LoginPage = React.lazy(() => import('@pages/login/LoginPage'));
const Login = React.lazy(() => import('@pages/login/Login'));
const Join = React.lazy(() => import('@pages/login/Join'));
const Client = React.lazy(() => import('@pages/login/Client'));
const Center = React.lazy(() => import('@pages/login/Center')); //치과기공소 회원가입
const Designer = React.lazy(() => import('@pages/login/Designer')); //치과기공소 회원가입
const JoinEnd = React.lazy(() => import('@pages/login/JoinEnd'));
const FindId = React.lazy(() => import('@pages/login/FindId'));
const FindPw = React.lazy(() => import('@pages/login/FindPw'));
////////////

const HelpPage = React.lazy(() => import('@pages/help/HelpPage'));
const Faqs = React.lazy(() => import('@pages/help/Faqs'));
const Notices = React.lazy(() => import('@pages/help/Notices'));

const RequestFormPage = React.lazy(() => import('@pages/request/RequestFormPage'));
const RequestEasyForm = React.lazy(() => import('@pages/request/RequestEasyForm')); //의뢰서간편모드
const RequestEasyView = React.lazy(() => import('@pages/request/RequestEasyView')); //의뢰서간편모드
const RequestWriteTip = React.lazy(() => import('@pages/request/RequestWriteTip'));
const RequestTemporary = React.lazy(() => import('@pages/request/RequestTemporary'));
const RequestOftenDt = React.lazy(() => import('@pages/request/RequestOftenDt'));
const RequestNumValue = React.lazy(() => import('@pages/request/RequestNumValue'));
const RequestDesignerChoice = React.lazy(() => import('@pages/request/RequestDesignerChoice'));
const RequestItemType = React.lazy(() => import('@pages/request/RequestItemType'));
const RequestAdd = React.lazy(() => import('@pages/request/RequestAdd'));
const RequestDetailForm = React.lazy(() => import('@pages/request/RequestDetailForm')); //의뢰서상세모드
const RequestDetailView = React.lazy(() => import('@pages/request/RequestDetailView')); //의뢰서상세모드
const RequestFormEndPage = React.lazy(() => import('@pages/request/RequestFormEndPage')); //의뢰서간편모드
const PublicRequestWritePage = React.lazy(() => import('@pages/request/PublicRequestWritePage'));
const TargetRequestWritePage = React.lazy(() => import('@pages/request/TargetRequestWritePage'));
const RequestViewPage = React.lazy(() => import('@pages/request/RequestViewPage')); // 요청서상세
const RequestGroupDocViewPage = React.lazy(() => import('@pages/request/RequestGroupDocViewPage')); // 내의뢰서목록
const RequestMyInfoPage = React.lazy(() => import('@pages/request/RequestMyInfoPage')); // 의뢰서상세

const RequestEstimatedPage = React.lazy(() => import('@pages/request/RequestEstimatedPage'));
const RequestMyEstimatePage = React.lazy(() => import('@pages/request/RequestMyEstimatePage'));

const RequestBasket = React.lazy(() => import('@pages/basket/RequestBasket'));

const MyPage = React.lazy(() => import('@pages/mypage/MyPage'));
const MyPageInfo = React.lazy(() => import('@pages/mypage/MyPageInfo'));
const MyPageClient = React.lazy(() => import('@pages/mypage/MyPageClient'));
const MyPageCenter = React.lazy(() => import('@pages/mypage/MyPageCenter'));
const MyPageDesigner = React.lazy(() => import('@pages/mypage/MyPageDesigner'));
const MyPagePayment = React.lazy(() => import('@pages/mypage/MyPagePayment'));
const MyPageReview = React.lazy(() => import('@pages/mypage/MyPageReview'));
const MyPageNoti = React.lazy(() => import('@pages/mypage/MyPageNoti'));

///////////
const MyPageCenterPub = React.lazy(() => import('@pages/mypage/pub/MyPageCenterPage')); // 퍼블 : 마이페이지 - 치과기공소
const MyPageDesignerPub = React.lazy(() => import('@pages/mypage/pub/MyPageDesignerPage')); // 퍼블 : 마이페이지 - 치자이너
const ProfileDetailPagePub = React.lazy(() => import('@pages/mypage/pub/ProfileDetailPage')); // 퍼블 : 프로필 상세

const LoginTerms = React.lazy(() => import('@pages/login/components/Terms'));
const PubFindIdPage = React.lazy(() => import('@pages/login/pub/FindIdPage'));

const PubFindPwPage = React.lazy(() => import('@pages/login/pub/FindPwPage'));
const JoinPage = React.lazy(() => import('@pages/login/pub/JoinPage'));

const MainPage = React.lazy(() => import('@pages/main/MainPage'));
const MainPage1 = React.lazy(() => import('@pages/main/pub/MainPage'));
const Error = React.lazy(() => import('@pages/error/Error404'));
const Error500 = React.lazy(() => import('@pages/error/Error500'));

// const RequestPage = React.lazy(() => import('@pages/request/pub/RequestPage'));
const RequestPage = React.lazy(() => import('@pages/request/RequestPage'));

const CenterPage = React.lazy(() => import('@pages/center/CenterPage'));
const CenterViewPage = React.lazy(() => import('@pages/center/CenterViewPage'));
const DesignerPage = React.lazy(() => import('@pages/designer/DesignerPage'));
const DesignerViewPage = React.lazy(() => import('@pages/designer/DesignerViewPage'));

const PaymentPage = React.lazy(() => import('@pages/payment/PaymentPage'));
const RequestDesignerPage = React.lazy(() => import('@pages/payment/RequestDesignerPage'));
const RequestOrderPaymentPage = React.lazy(() => import('@pages/payment/RequestOrderPaymentPage')); // 거래내역 - 결제
const RequestAddOrderPaymentPage = React.lazy(() => import('@pages/payment/RequestAddOrderPaymentPage')); // 거래내역 - 추가금결제
const RequestAddOrderPaymentViewPage = React.lazy(() => import('@pages/payment/RequestAddOrderPaymentViewPage')); // 거래내역 - 추가금 요청내역
const ContractRequestPage = React.lazy(() => import('@pages/payment/ContractRequestPage')); // 거래내역 - 계약 요청서
const RequestReceivePage = React.lazy(() => import('@pages/payment/RequestReceivePage')); // 거래내역 - 의뢰서 수령
const CADCommsPage = React.lazy(() => import('@pages/payment/CADCommsPage')); // 거래내역 - 3d 뷰어 소통
const CADUploadPage = React.lazy(() => import('@pages/payment/CADUploadPage')); // 거래내역 - 캐드파일 업로드
const CADViewPage = React.lazy(() => import('@pages/payment/CADViewPage')); // 거래내역 - 캐드파일 수령
const ReviewPage = React.lazy(() => import('@pages/payment/ReviewPage')); // 거래내역 - 리뷰작성
const AdditionalMoneyPage = React.lazy(() => import('@pages/payment/AdditionalMoneyPage')); // 거래내역 - 추가금 수정
const ReworkRequestWritePage = React.lazy(() => import('@pages/payment/ReworkRequestWritePage')); // 거래내역 - 재제작 요청
const ReworkRequestViewPage = React.lazy(() => import('@pages/payment/ReworkRequestViewPage')); // 거래내역 - 재제작 요청 상세

////////////////////

const PaymentPagePub = React.lazy(() => import('@pages/payment/pub/PaymentPage2'));
const PaymentViewPage = React.lazy(() => import('@pages/payment/PaymentViewPage'));

const EstimatePage = React.lazy(() => import('@pages/payment/EstimatePage'));

const MyInquirePage = React.lazy(() => import('@pages/payment/MyInquirePage'));
const ReRequestWritePage = React.lazy(() => import('@pages/payment/ReRequestWritePage'));
const ReRequestViewPage = React.lazy(() => import('@pages/payment/ReRequestViewPage'));
const ReRequesReqAddPub = React.lazy(() => import('@pages/payment/pub/ReRequesReqAddPage')); // 퍼블 : 페이지 in 팝업 20241031

const ReViewPage = React.lazy(() => import('@pages/payment/pub/ReViewPage'));

const MyInquirePage2 = React.lazy(() => import('@pages/payment/pub/MyInquirePage2')); // 퍼블 : 내 의뢰서 정보 - 내 의뢰서 정보

const InquirePage = React.lazy(() => import('@pages/inquire/InquirePage'));
const InquireWritePage = React.lazy(() => import('@pages/inquire/InquireWritePage'));
const InquireDetailWritePage = React.lazy(() => import('@pages/inquire/InquireDetailWritePage'));
// const InquireEndPage = React.lazy(() => import('@pages/inquire/InquireEndPage'));

const MileagePage = React.lazy(() => import('@pages/mileage/MileagePage'));
const MileageOfficePage = React.lazy(() => import('@pages/mileage/MileageOfficePage')); // 퍼블 : 마일리지 - 치과&치자이너
const MileageCharge = React.lazy(() => import('@pages/mileage/MileageCharge')); 
const CardInfo = React.lazy(() => import('@pages/mileage/CardInfo'));

const ChatPage = React.lazy(() => import('@pages/chat/ChatPage'));
const ChatDesignerPage = React.lazy(() => import('@pages/chat/ChatDesignerPage'));
const ChatCenterPage = React.lazy(() => import('@pages/chat/ChatCenterPage'));

const CenterToPage = React.lazy(() => import('@pages/chat/components/CenterToPage'));
const CenterToViewPage = React.lazy(() => import('@pages/chat/components/CenterToViewPage'));

const DesignerToPage = React.lazy(() => import('@pages/chat/components/DesignerToPage'));
const DesignerToViewPage = React.lazy(() => import('@pages/chat/components/DesignerToViewPage'));

const ClientToPage = React.lazy(() => import('@pages/chat/components/ClientToPage'));
const ClientToViewPage = React.lazy(() => import('@pages/chat/components/ClientToViewPage'));

const NotiyPage = React.lazy(() => import('@pages/notiy/NotiyPage'));

const ServicePage = React.lazy(() => import('@pages/service/ServicePage'));
const ServicePage1 = React.lazy(() => import('@pages/service/ServicePage1'));
const ServicePage2 = React.lazy(() => import('@pages/service/ServicePage2'));
const ServicePage3 = React.lazy(() => import('@pages/service/ServicePage3'));
const ServicePage4 = React.lazy(() => import('@pages/service/ServicePage4'));

const FaqPage = React.lazy(() => import('@pages/service/FaqPage'));
const NoticePage = React.lazy(() => import('@pages/service/NoticePage'));

const ProfileModifyPage = React.lazy(() => import('@pages/mypage/ProfileModifyPage'));
const ProfileDetailPage = React.lazy(() => import('@pages/mypage/ProfileDetailPage')); // 프로필 상세

const EmptyLayout = React.lazy(() => import('@components/ui/layout/EmptyLayout'));
const Layout = React.lazy(() => import('@components/ui/layout/Layout'));

const routes = [
  { path: '/component', name: 'Component', component: ComponentPage, layout: Layout, exact: true },

  { path: '/', name: 'Main', component: MainPage, layout: Layout, exact: true },
  //{ path: '/mainOffice', name: 'MainOffice', component: MainOfficePage, layout: Layout, exact: true }, // 퍼블 : 치촤기공소/치차이너용
  //{ path: '/MainPage1', name: 'MainPage1', component: MainPage1, layout: Layout, exact: true }, // 퍼블 : 치촤기공소/치차이너용
  { path: '/faq', name: 'Faq', component: FaqPage, layout: Layout, exact: true },
  {
    path: '/help',
    name: 'Help',
    component: HelpPage,
    layout: Layout,
    exact: true,
    routes: [
      { path: '/help', component: Faqs, exact: true },
      { path: '/help/notice', component: Notices, exact: true },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    layout: Layout,
    exact: true,
    routes: [
      { path: '/login', component: Login, exact: true }, //로그인
      { path: '/login/join', component: Join, exact: true }, //이메일회원가입
      { path: '/login/JoinEnd', component: JoinEnd, exact: true },
      { path: '/login/join/client', component: Client, exact: true }, //의뢰인회원가입
      { path: '/login/join/center', component: Center, exact: true }, //치과기공소회원가입
      { path: '/login/join/designer', component: Designer, exact: true }, //치자이너회원가입
      { path: '/login/idInquiry', component: FindId, exact: true }, //아이디찾기
      { path: '/login/pwInquiry', component: FindPw, exact: true }, //비밀번호찾기
    ],
  },
  {
    path: '/request',
    name: 'Request',
    component: RequestFormPage,
    layout: Layout,
    exact: true,
    routes: [
      { path: '/request', component: RequestPage, exact: true, protected: true },
      { path: '/request/easymode', component: RequestEasyForm, exact: true, protected: true },
      { path: '/request/easyview', component: RequestEasyView, exact: true, protected: true },
      { path: '/request/requestTip', component: RequestWriteTip, exact: true, protected: true },
      { path: '/request/tempSaved', component: RequestTemporary, exact: true, protected: true },
      { path: '/request/oftenDt', component: RequestOftenDt, exact: true, protected: true },
      { path: '/request/designerChoice', component: RequestDesignerChoice, exact: true, protected: true },
      { path: '/request/detailmode', component: RequestDetailForm, exact: true, protected: true },
      { path: '/request/detailview', component: RequestDetailView, exact: true, protected: true },
      { path: '/request/numvalue', component: RequestNumValue, exact: true, protected: true },
      { path: '/request/itemType', component: RequestItemType, exact: true, protected: true },
      { path: '/request/add', component: RequestAdd, exact: true, protected: true },
      { path: '/request/end', component: RequestFormEndPage, exact: true, protected: true },
    ],
  },
  { path: '/request/view/:id', name: 'RequestViewPage', component: RequestViewPage, layout: Layout, exact: true, protected: true }, //요청서상세
  { path: '/request/group/doc/:id', name: 'RequestGroupDocViewPage', component: RequestGroupDocViewPage, layout: Layout, exact: true, protected: true }, //요청서상세
  { path: '/request/view/doc/:id', name: 'RequestMyInfoPage', component: RequestMyInfoPage, layout: Layout, exact: true, protected: true }, //내의뢰서 정보
  { path: '/request/public/write', name: 'PublicRequestWritePage', component: PublicRequestWritePage, layout: Layout, exact: true, protected: true }, //공개요청서
  { path: '/request/target/write', name: 'TargetRequestWritePage', component: TargetRequestWritePage, layout: Layout, exact: true, protected: true }, //지정요청사
  { path: '/request/estimated', name: 'RequestEstimatedPage', component: RequestEstimatedPage, layout: Layout, exact: true, protected: true }, // 견적서작성
  { path: '/request/estimated/view/:id', name: 'RequestMyEstimatePage', component: RequestMyEstimatePage, layout: Layout, exact: true, protected: true }, // 내 견적서 - 치자이너

  { path: '/payment', name: 'PaymentPage', component: PaymentPage, layout: Layout, exact: true, protected: true }, //거래내역
  { path: '/payment/:id/designer', name: 'RequestDesignerPage', component: RequestDesignerPage, layout: Layout, exact: true, protected: true }, // 치자이너 선택
  { path: '/payment/reqeust/:id', name: 'RequestOrderPaymentPage', component: RequestOrderPaymentPage, layout: Layout, exact: true, protected: true }, // 의뢰서 결제
  { path: '/payment/reqeust/charges/:id', name: 'RequestAddOrderPaymentPage', component: RequestAddOrderPaymentPage, layout: Layout, exact: true, protected: true }, // 추가금 결제
  { path: '/payment/reqeust/charges/view/:id', name: 'RequestAddOrderPaymentViewPage', component: RequestAddOrderPaymentViewPage, layout: Layout, exact: true, protected: true }, // 추가금 요청내역
  { path: '/payment/reqeust/rework/:id', name: 'ReworkRequestWritePage', component: ReworkRequestWritePage, layout: Layout, exact: true, protected: true }, // 재제작요청
  { path: '/payment/reqeust/rework/view/:id', name: 'ReworkRequestViewPage', component: ReworkRequestViewPage, layout: Layout, exact: true, protected: true }, // 재제작요청
  { path: '/payment/contract/:id', name: 'ContractRequestPage', component: ContractRequestPage, layout: Layout, exact: true, protected: true }, // 계약 요청서
  { path: '/payment/receive/:id', name: 'RequestReceivePage ', component: RequestReceivePage, layout: Layout, exact: true, protected: true }, // 의뢰서 수령
  { path: '/payment/comms/:id/cad', name: 'CADCommsPage', component: CADCommsPage, layout: Layout, exact: true, protected: true }, // 3d 뷰어 소통
  { path: '/payment/reqeust/:id/cad', name: 'CADUploadPage', component: CADUploadPage, layout: Layout, exact: true, protected: true }, // CAD파일 업로드
  { path: '/payment/cad/:id', name: 'CADViewPage', component: CADViewPage, layout: Layout, exact: true, protected: true }, // CAD파일 수령
  { path: '/payment/charges/:id', name: 'AdditionalMoneyPage', component: AdditionalMoneyPage, layout: Layout, exact: true, protected: true }, // 추가금 수정
  { path: '/payment/review/:id', name: 'ReviewPage', component: ReviewPage, layout: Layout, exact: true, protected: true }, // 리뷰작성
  { path: '/payment/estimate/:id', name: 'Estimate', component: EstimatePage, layout: Layout, exact: true, protected: true }, // 견적서 보기
  { path: '/estimate', name: 'Estimate', component: EstimatePage, layout: Layout, exact: true, protected: true }, // 견적서 보기

  { path: '/paymentPub', name: 'PaymentPagePub', component: PaymentPagePub, layout: Layout, exact: true, protected: true }, //퍼블 샘플 : 거래내역

  { path: '/request/basket', name: 'RequestBasket', component: RequestBasket, layout: Layout, exact: true, protected: true }, //의뢰서바구니

  // { path: '/mypage', name: 'MyPage', component: MyPagePage, layout: Layout, exact: true },

  { path: '/mypage/modify', name: 'ProfileModifyPage', component: ProfileModifyPage, layout: Layout, exact: true }, //프로필 수정
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    layout: Layout,
    protected: true,
    exact: true,
    routes: [
      { path: '/mypage', component: MyPageInfo, exact: true },
      { path: '/mypage/client', component: MyPageClient, exact: true },
      { path: '/mypage/center', component: MyPageCenter, exact: true },
      { path: '/mypage/designer', component: MyPageDesigner, exact: true },
      { path: '/mypage/payment', component: MyPagePayment, exact: true },
      { path: '/mypage/review', component: MyPageReview, exact: true },
      { path: '/mypage/noti', component: MyPageNoti, exact: true },
    ],
  },

  {
    path: '/chat',
    name: 'Chat',
    component: ChatPage,
    layout: Layout,
    protected: true,
    exact: true,
    routes: [
      { path: '/chat', component: ClientToPage, exact: true },
      { path: '/chat/:type', component: ClientToPage, exact: true },
      { path: '/chat/view/:roomId', component: ClientToViewPage, exact: true },
      // { path: '/Chat/center', component: MyPageCenter, exact: true },
    ],
  },
  {
    path: '/designerchat',
    name: 'DesignerChat',
    component: ChatDesignerPage,
    layout: Layout,
    protected: true,
    exact: true,
    routes: [
      { path: '/designerchat', component: DesignerToPage, exact: true },
      { path: '/designerchat/view/:roomId', component: DesignerToViewPage, exact: true },
      // { path: '/chat/view/:roomId', component: ClientToViewPage, exact: true },
      // { path: '/Chat/center', component: MyPageCenter, exact: true },
    ],
  },
  {
    path: '/centerchat',
    name: 'CenterChat',
    component: ChatCenterPage,
    layout: Layout,
    protected: true,
    exact: true,
    routes: [
      { path: '/centerchat', component: CenterToPage, exact: true },
      { path: '/centerchat/view/:roomId', component: CenterToViewPage, exact: true },
    ],
  },

  // { path: '/chat', name: 'Chat', component: ChatPage, layout: Layout, exact: true },
  { path: '/chatCenter', name: 'chatCenter', component: ChatCenterPage, layout: Layout, exact: true }, // 퍼블 : 채팅 - 치과기공소
  { path: '/chatDesigner', name: 'ChatDesigner', component: ChatDesignerPage, layout: Layout, exact: true }, // 퍼블 : 채팅 - 치자이너

  { path: '/myPageCenterPub', name: 'MyPageCenterPub', component: MyPageCenterPub, layout: Layout, exact: true }, // 퍼블 : 마이페이지 - 치과기공소
  { path: '/myPageDesignerPub', name: 'MyPageDesignerPub', component: MyPageDesignerPub, layout: Layout, exact: true }, // 퍼블 : 마이페이지 - 치과기공소
  { path: '/profileDetail', name: 'ProfileDetailPagePub', component: ProfileDetailPagePub, layout: Layout, exact: true }, // 퍼블 : 마이페이지 - 치과기공소
  /**
   *
   *
   *
   */
  { path: '/findId', name: 'FindId', component: PubFindIdPage, layout: Layout, exact: true },
  { path: '/findPw', name: 'FindPw', component: PubFindPwPage, layout: Layout, exact: true },
  { path: '/join', name: 'Join', component: JoinPage, layout: Layout, exact: true },

  /**
   *
   *
   *
   *
   *
   */

  { path: '/request', name: 'Request', component: RequestPage, layout: Layout, exact: true, protected: false },

  { path: '/center', name: 'Center', component: CenterPage, layout: Layout, exact: true, protected: true }, //치기공소 찾기
  { path: '/centerView/:id', name: 'CenterView', component: CenterViewPage, layout: Layout, exact: true, protected: true }, //치기공소 상세
  { path: '/designer', name: 'Designer', component: DesignerPage, layout: Layout, exact: true, protected: true }, //디자이너 찾기
  { path: '/designerView', name: 'DesignerView', component: DesignerViewPage, layout: Layout, exact: true },
  { path: '/designer/view/:id', name: 'DesignerView', component: DesignerViewPage, layout: Layout, exact: true, protected: true },

  { path: '/paymentpub', name: 'Payment', component: PaymentPagePub, layout: Layout, exact: true },
  { path: '/paymentView', name: 'PaymentView', component: PaymentViewPage, layout: Layout, exact: true },

  { path: '/myInquire', name: 'MyInquire', component: MyInquirePage, layout: Layout, exact: true },
  { path: '/reRequestWrite', name: 'ReRequestWrite', component: ReRequestWritePage, layout: Layout, exact: true },
  { path: '/reRequestView', name: 'ReRequestView', component: ReRequestViewPage, layout: Layout, exact: true },
  { path: '/ReRequesReqAdd', name: 'ReRequesReqAdd', component: ReRequesReqAddPub, layout: Layout, exact: true }, // 퍼블 : 페이지 in 팝업 20241031

  { path: '/reView', name: 'CADView', component: ReViewPage, layout: Layout, exact: true },
  { path: '/myInquire2', name: 'MyInquire2', component: MyInquirePage2, layout: Layout, exact: true },

  { path: '/inquire', name: 'Inquire', component: InquirePage, layout: Layout, exact: true },
  { path: '/inquireWrite', name: 'InquireWrite', component: InquireWritePage, layout: Layout, exact: true },
  { path: '/inquireDetailWrite', name: 'InquireDetailWrite', component: InquireDetailWritePage, layout: Layout, exact: true },
  // { path: '/inquireEnd', name: 'InquireEnd', component: InquireEndPage, layout: Layout, exact: true },

  { path: '/mileage', name: 'Mileage', component: MileagePage, layout: Layout, exact: true, protected: true },
  { path: '/mileageOffice', name: 'MileageOffice', component: MileageOfficePage, layout: Layout, exact: true }, // 퍼블 : 마일리지 - 치과&치자이너
  { path: '/mileageCharge', name: 'MileageCharge', component: MileageCharge, layout: Layout, exact: true },
  { path: '/cardInfo', name: 'CardInfo', component: CardInfo, layout: Layout, exact: true },

  { path: '/notiy', name: 'Notiy', component: NotiyPage, layout: Layout, exact: true },

  { path: '/service', name: 'Service', component: ServicePage, layout: Layout, exact: true },
  { path: '/service1', name: 'Service1', component: ServicePage1, layout: EmptyLayout, exact: true },
  { path: '/service2', name: 'Service2', component: ServicePage2, layout: EmptyLayout, exact: true },
  { path: '/service3', name: 'Service3', component: ServicePage3, layout: EmptyLayout, exact: true },
  { path: '/service4', name: 'Service4', component: ServicePage4, layout: EmptyLayout, exact: true },

  { path: '/notice', name: 'Notice', component: NoticePage, layout: Layout, exact: true },

  // { path: '/mypage', name: 'MyPage', component: MyPagePage, layout: Layout, exact: true },

  { path: '/profileModify', name: 'ProfileModify', component: ProfileModifyPage, layout: Layout, exact: true },
  { path: '/profile/view/:id', name: 'ProfileDetail', component: ProfileDetailPage, layout: Layout, exact: true }, // 프로필 상세

  // { path: '/sample', name: 'Sample', component: Sample },
  { path: '/500', name: '500', component: Error500, layout: EmptyLayout },
  { path: '/*', name: '404', component: Error, layout: EmptyLayout },
];

export default routes;
