class ChannelService {
  constructor() {
    // 이미 초기화되었는지 확인
    if (!window.ChannelIOScriptLoaded) {
      window.ChannelIOScriptLoaded = true;
      this.loadScript();
    }
  }

  loadScript() {
    (function () {
      var w = window;
      if (w.ChannelIO) {
        return; // 에러 메시지 대신 조용히 리턴
      }
      var ch = function () {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        var x = document.getElementsByTagName('script')[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === 'complete') {
        l();
      } else {
        w.addEventListener('DOMContentLoaded', l);
        w.addEventListener('load', l);
      }
    })();
  }

  boot(option, callback) {
    window.ChannelIO('boot', option, callback);
  }

  shutdown() {
    window.ChannelIO('shutdown');
  }

  showMessenger() {
    window.ChannelIO('showMessenger');
  }

  hideMessenger() {
    window.ChannelIO('hideMessenger');
  }

  openChat(chatId, message) {
    window.ChannelIO('openChat', chatId, message);
  }

  track(eventName, eventProperty) {
    window.ChannelIO('track', eventName, eventProperty);
  }

  onShowMessenger(callback) {
    window.ChannelIO('onShowMessenger', callback);
  }

  onHideMessenger(callback) {
    window.ChannelIO('onHideMessenger', callback);
  }

  onBadgeChanged(callback) {
    window.ChannelIO('onBadgeChanged', callback);
  }

  onChatCreated(callback) {
    window.ChannelIO('onChatCreated', callback);
  }

  onFollowUpChanged(callback) {
    window.ChannelIO('onFollowUpChanged', callback);
  }

  onUrlClicked(callback) {
    window.ChannelIO('onUrlClicked', callback);
  }

  clearCallbacks() {
    window.ChannelIO('clearCallbacks');
  }

  updateUser(userInfo, callback) {
    window.ChannelIO('updateUser', userInfo, callback);
  }

  addTags(tags, callback) {
    window.ChannelIO('addTags', tags, callback);
  }

  removeTags(tags, callback) {
    window.ChannelIO('removeTags', tags, callback);
  }

  setPage(page) {
    window.ChannelIO('setPage', page);
  }

  resetPage() {
    window.ChannelIO('resetPage');
  }

  showChannelButton() {
    window.ChannelIO('showChannelButton');
  }

  hideChannelButton() {
    window.ChannelIO('hideChannelButton');
  }

  setAppearance(appearance) {
    window.ChannelIO('setAppearance', appearance);
  }
}

// 싱글톤 인스턴스
let instance = null;

// 싱글톤 패턴 적용
export default (() => {
  if (!instance) {
    instance = new ChannelService();
  }
  return instance;
})();