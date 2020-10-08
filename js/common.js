var MAINPAGEMOTION = MAINPAGEMOTION || {};

// userAgent Manager
MAINPAGEMOTION.USERAGENTMANAGER = {
  PC: 'pc',
  SP: 'sp',

  init: function () {
    var ua = navigator.userAgent.toLowerCase();
    var parametar = {};
    if (ua.indexOf('iphone') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
      parametar.device = this.SP;
    } else {
      parametar.device = this.PC;
    }
    return parametar;
  }
};

// KVフェードアウトカルーセル
MAINPAGEMOTION.KVCAROUSEL = {
  FADE_INTERVAL: 5000,

  init: function () {
    this.setParameters();
    this.fadeCarousel();
  },
  setParameters: function () {
    this.$carouselList = $('.jscTopMainCarouselList');
    this.$carouselItem = this.$carouselList.find('li');
    this.contentsNum = this.$carouselItem.length;
    this.lastIndex = this.contentsNum - 1; // 最後のIndexの番号
    this.currentIndex = 0;              // 初期位置は0番目
  },
  fadeCarousel: function () {
    setInterval($.proxy(function () {
      if (this.lastIndex <= this.currentIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      this.$carouselItem.removeClass('current').eq(this.currentIndex).addClass('current');
    }, this), this.FADE_INTERVAL);
  }
};

// PC_TOPページ_ヘッダー, ウェルカムメッセージ固定
MAINPAGEMOTION.PC_TOPPAGE_FIXED = {
  init: function () {
    this.setParameters();
    this.scrollAction();
    this.bindEvent();
  },
  setParameters: function () {
    this.topPosition = 296;
    this.bottomPosition = 240;
    this.footerPositionFunc = 350;
    this.$window = $(window);
    this.$headerArea = $('.jscHeaderArea');
    // js描画までのレイアウト崩れ解消
    this.$headerArea.css('display', 'block');
    this.headerHeight = this.$headerArea.height();
    this.$mV = $('.jscMvArea');
    this.$mV.css({
      'height': 'calc(100vh - ' + this.headerHeight + 'px',
      'margin-bottom': this.headerHeight
    });
    this.mVHeight = this.$mV.outerHeight();
    this.changePosition = this.mVHeight + this.headerHeight;
    this.$topNavContents = $('.jscTopNavContents');
    this.$welcomeMessage = $('.jscWelcomeMessage');
    this.$footerArea = $('.jscFooterArea');
    this.footerPosition = this.$footerArea.offset().top;
  },
  bindEvent: function () {
    this.$window.on('scroll load resize', $.proxy(this.scrollAction, this));
  },
  scrollAction: function () {
    var scrollTop = this.$window.scrollTop();
    if (scrollTop > this.changePosition) {
      this.$headerArea.css({
        'position': 'fixed',
        'top': 0
      });
      this.$topNavContents.css({
        'visibility': 'visible'
      });
      this.$welcomeMessage.css({
        'position': 'fixed',
        'top': this.topPosition,
        'bottom': 'auto'
      });
      // footerから任意の切り替えポジション指定
      if (scrollTop > this.footerPosition - this.footerPositionFunc) {
        this.$welcomeMessage.css({
          'position': 'absolute',
          'top': 'auto',
          'bottom': this.bottomPosition
        });
      }
    } else {
      this.$headerArea.css({
        'position': 'absolute',
        'top': this.mVHeight
      });
      this.$topNavContents.css({
        'visibility': 'hidden'
      });
      this.$welcomeMessage.css({
        'position': 'absolute',
        'top': this.topPosition,
        'bottom': 'auto'
      });
    }
  }
};

// PC_下層ページ, SP_全ページ_ウェルカムメッセージ固定
MAINPAGEMOTION.SUBPAGE_FIXED = {
  init: function () {
    this.setParameters();
    this.scrollAction();
    this.bindEvent();
  },
  setParameters: function () {
    if (MAINPAGEMOTION.UA.device === 'pc') {
      this.topPosition = 296;
      this.bottomPosition = 20;
      this.footerPositionFunc = 600;
    } else {
      this.topPosition = 240;
      this.bottomPosition = -30;
      this.footerPositionFunc = 400;
      if (PAGE_DATA.page === 'top') {
        this.bottomPosition = 160;
      }
    }
    this.$window = $(window);
    this.$headerArea = $('.jscHeaderArea');
    // js描画までのレイアウト崩れ解消
    this.$headerArea.css('display', 'block');
    this.headerHeight = this.$headerArea.height();
    this.$mV = $('.jscMvArea');
    if (MAINPAGEMOTION.UA.device === 'pc') {
      this.$mV.css("margin-top", this.headerHeight);
    }
    this.$welcomeMessage = $('.jscWelcomeMessage');
    this.$footerArea = $('.jscFooterArea');
    this.footerPosition = this.$footerArea.offset().top;
  },
  bindEvent: function () {
    this.$window.on('scroll load resize', $.proxy(this.scrollAction, this));
  },
  scrollAction: function () {
    var scrollTop = this.$window.scrollTop();
    var changePosition = this.$mV.outerHeight();
    if (scrollTop > changePosition && PAGE_DATA.page === 'top' || scrollTop > changePosition + this.headerHeight && PAGE_DATA.page === 'sub') {
      this.$welcomeMessage.css({
        'position': 'fixed',
        'top': this.topPosition,
        'bottom': 'auto'
      });
      // footerから任意の切り替えポジション指定
      if (scrollTop > this.footerPosition - this.footerPositionFunc) {
        this.$welcomeMessage.css({
          'position': 'absolute',
          'top': 'auto',
          'bottom': this.bottomPosition
        });
      }
    } else {
      this.$welcomeMessage.css({
        'position': 'absolute',
        'top': this.topPosition,
        'bottom': 'auto'
      });
    }
  }
};

// SP_レンタルカテゴリー固定
MAINPAGEMOTION.RENTALCATEGPRY_FIXED = {
  SWITCH_ANIMATION_TIME: 400,
  ACTIVE_CLASS: 'isActive',
  init: function () {
    this.setParameters();
    this.scrollAction();
    this.bindEvent();
  },
  setParameters: function () {
    this.$window = $(window);
    this.$tabs = $('.jscRentalCategoryTabsWrap');
    this.tabsPosition = this.$tabs.offset().top;
    this.$pullDownBtn = $('.jscPullDownBtn');
    this.$pullDownTabs = $('.jscPullDownTabs');
  },
  bindEvent: function () {
    this.$window.on('scroll load resize', $.proxy(this.scrollAction, this));
    this.$pullDownBtn.on('click', $.proxy(this.categoryTabOpen, this));
  },
  scrollAction: function () {
    var scrollTop = this.$window.scrollTop();
    var changePosition = this.tabsPosition;
    if (scrollTop > changePosition) {
      this.$tabs.addClass('tabFixed');
      this.$pullDownBtn.addClass('fixedLayout');
    } else {
      this.$tabs.removeClass('tabFixed');
      this.$pullDownBtn.removeClass('fixedLayout');
    }
  },
  categoryTabOpen: function() {
    if (this.$pullDownTabs.is(':visible')) {
      this.$pullDownTabs.removeClass(this.ACTIVE_CLASS);
      this.$pullDownTabs.fadeOut(this.SWITCH_ANIMATION_TIME);
    } else {
      this.$pullDownTabs.addClass(this.ACTIVE_CLASS);
      this.$pullDownTabs.fadeIn(this.SWITCH_ANIMATION_TIME);
    }
  }
};

// ナビゲーション_スムーススクロール
MAINPAGEMOTION.SMOOTHSCROLL = {
  SCROLL_SPEED: 500,
  init: function () {
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$window = $(window);
    this.$body = $('html, body');
    this.$navLinks = $('.jscNavList > li > a');
    this.headerHeight = $('.jscHeaderArea').outerHeight();
  },
  bindEvent: function () {
    var _self = this;
    this.$window.on('load', this.initScrollTo.bind(this));
    this.$navLinks.on('click', function (e) {
      var destinationUrlHash = $(this).attr('href').split('#')[1],
        $destination = $('#' + destinationUrlHash);
      if (destinationUrlHash && $destination.length) { // クリックしたリンクが#○○でページ内に#○○があるとき（現在地がHOMEのとき）
        e.preventDefault();
        _self.scrollTo($destination);
      }
    });
  },
  scrollTo: function ($destination) {
    var position = $destination.offset().top;
    this.smoothScroll(position, this.headerHeight);
  },
  smoothScroll: function (position, headerHeight) {
    this.$body.animate({scrollTop: position - headerHeight}, this.SCROLL_SPEED, 'swing');
  },
  initScrollTo: function () { // 下層ページからHOMEへ移るときsessionStrageに保存してある#○○へスクロールする
    var destination = window.sessionStorage.getItem('target');
    window.sessionStorage.removeItem('target');
    if (destination) this.scrollTo($('#' + destination));
  }
};

// ハンバーガーメニュー
MAINPAGEMOTION.SWITCH_SHOW_NAV_MENU = {
  SWITCH_ANIMATION_TIME: 400,
  ACTIVE_CLASS: 'isActive',
  init: function () {
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$body = $('body');
    this.$navWrap = $('.jscNavPage');
    this.$navMenuBtn = $('.jscNavBtn');
    this.$navPageItem = $('.jscNavList > li > a');
  },
  bindEvent: function () {
    this.$navMenuBtn.on('click', $.proxy(this.controlNavMenu, this));
    this.$navPageItem.on('click', $.proxy(this.hideNavWrap, this));
  },
  controlNavMenu: function () {
    if (this.$navWrap.is(':animated')) {
      return;
    }
    if (this.$navWrap.is(':visible')) {
      this.hideNavWrap();
    } else {
      this.showNavWrap();
    }
  },
  showNavWrap: function () {
    this.$navMenuBtn.addClass(this.ACTIVE_CLASS);
    this.$navWrap.fadeIn(this.SWITCH_ANIMATION_TIME);
    this.$body.css({'overflow': 'hidden'});
  },
  hideNavWrap: function () {
    this.$navMenuBtn.removeClass(this.ACTIVE_CLASS);
    this.$navWrap.fadeOut(this.SWITCH_ANIMATION_TIME);
    this.$body.css({'overflow': 'auto'});
  }
};

// パララックス
MAINPAGEMOTION.PARALLAX = function ($parallaxItem) {
  this.$parallaxItem = $parallaxItem;
  this.init();
};
MAINPAGEMOTION.PARALLAX.prototype = {
  POSITION_ADJUST: 180,

  init: function () {
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$window = $(window);
  },
  bindEvent: function () {
    this.$window.on('scroll', $.proxy(this.translatePosition, this));
  },
  translatePosition: function () {
    var itemPosition = this.$parallaxItem.offset().top;
    var scrollTop = this.$window.scrollTop();
    var scrollBottom = scrollTop + this.$window.innerHeight();

    if (scrollBottom > itemPosition && scrollTop < itemPosition) {
      var changePosition = scrollTop / 10 * -1 + this.POSITION_ADJUST;
      this.$parallaxItem.css({'transform': 'translateY(' + changePosition + 'px)'});
    }
  }
};

// レイジーロード
MAINPAGEMOTION.LAZYLOAD = function ($lazySection) {
  this.$lazySection = $lazySection;
  this.init();
};
MAINPAGEMOTION.LAZYLOAD.prototype = {
  init: function () {
    this.$window = $(window);
    this.addAnimation();
    this.bindEvent();
  },
  bindEvent: function () {
    this.$window.on('scroll', $.proxy(this.addAnimation, this));
  },
  addAnimation: function () {
    var scrollTop = this.$window.scrollTop();
    var scrollBottom = scrollTop + this.$window.innerHeight();
    var targetPosition = this.$lazySection.offset().top;
    if (this.$lazySection.is(':animated')) {
      return;
    }
    if (scrollBottom >= targetPosition) {
      this.$lazySection.addClass('isActive');
    }
  }
};

// Instagram_PC_アイテム高さ調整
MAINPAGEMOTION.INSTAGRAMLAYOUT = {
  init: function () {
    this.setParameter();
    this.bindEvent();
  },
  setParameter: function () {
    this.$item = $('.jscContCarouselItem > li');
  },
  bindEvent: function () {
    $(window).on('load resize', $.proxy(this.pcItemStyle, this));
  },
  pcItemStyle: function () {
    var itemWidth = this.$item.eq(0).width();
    this.$item.height(itemWidth);
  }
};

// Instagram_SP_カルーセルレイアウト
MAINPAGEMOTION.CONTENTSCAROUSEL = {
  AUTO_SLIDE_INTERVAL: 5000,
  init: function () {
    this.setParameter();
    this.createCarousel();
    this.bindEvent();
  },
  setParameter: function () {
    this.$itemsWrap = $('.jscContCarouselItem');
    this.$item = $('.jscContCarouselItem > li');
    this.$prevTrg = $('.jscContCarouselPrevTrigger');
    this.$nextTrg = $('.jscContCarouselNextTrigger');
    this.$swipeTarget = $('.jscSwipeTarget');

    this.lastIndex = this.$item.length - 1;
    this.indexMap = [];
    this.timerIds = [];
  },
  setModalSwipeTargetStyle: function (distinationX, duration) {
    this.$itemsWrap.css({
      'transform': 'translateX(' + distinationX + 'px)',
      'transition': duration + 's ease-out'
    });
  },
  createCarousel: function () {
    var itemWidth = this.$item.eq(0).width();
    var itemLength = this.$item.length;
    cloneFirstItem2Tail.bind(this)();
    setPositionIndexMap.bind(this)();
    this.catchedChangeIndex(0);
    this.setTimer();

    function cloneFirstItem2Tail() {
      this.$item.parent().append(this.$item.first().clone());
      this.$itemsWrap.width(itemWidth * (this.$item.length + 1));
    }

    function setPositionIndexMap() {
      for (var i = 0; i <= itemLength; i++) {
        this.indexMap.push(-itemWidth * i);
      }
    }
  },
  bindEvent: function () {
    this.$prevTrg.on('click', this.movePrev.bind(this));
    this.$nextTrg.on('click', this.moveNext.bind(this, true));
    this.$swipeTarget.on('touchstart', $.proxy(this.modalSwipeTouchStartFunc, this));
    this.$swipeTarget.on('touchmove', $.proxy(this.modalSwipeTouchMoveFunc, this));
    this.$swipeTarget.on('touchend', $.proxy(this.modalSwipeTouchEndFunc, this));
  },
  modalSwipeTouchStartFunc: function (e) {
    this.modalSwipeX = e.originalEvent.changedTouches[0].clientX;
    this.modalSwipeY = e.originalEvent.changedTouches[0].clientY;
    this.swipeHorizontal = false;
    this.touched = false;
  },
  modalSwipeTouchMoveFunc: function (e) {
    var swipeDestinationX = e.originalEvent.changedTouches[0].clientX - this.modalSwipeX;
    var swipeDestinationY = e.originalEvent.changedTouches[0].clientY - this.modalSwipeY;

    if (!this.touched) {
      if (Math.abs(swipeDestinationX) > Math.abs(swipeDestinationY)) {
        this.swipeHorizontal = true;
      }
      this.touched = true;
    }
    if (this.swipeHorizontal === true) {
      this.setModalSwipeTargetStyle(swipeDestinationX + 'px', 0);
    }
  },
  modalSwipeTouchEndFunc: function (e) {
    var swipeDestinationX = e.originalEvent.changedTouches[0].clientX - this.modalSwipeX;
    if (this.swipeHorizontal === true) {
      if (swipeDestinationX > (window.innerWidth / 6)) { // prev
        this.movePrev();
        return;
      } else if (swipeDestinationX < -(window.innerWidth / 6)) { // next
        this.moveNext();
        return;
      }
    }
  },
  movePrev: function () {
    this.catchedChangeIndex(this.currentIndex - 1);
  },
  moveNext: function () {
    this.catchedChangeIndex(this.currentIndex + 1);
  },
  catchedChangeIndex: function (i) {
    var changeCarousel = changeCarousel.bind(this);
    var delayChangeCarousel = delayChangeCarousel.bind(this);
    var lastIndex = this.lastIndex;
    var cloneIndex = lastIndex + 1;
    var SLIDE_SPEED = 0.3;

    this.resetTimer();
    if (i > lastIndex) {
      i = 0;
      changeCarousel(cloneIndex, SLIDE_SPEED);
      delayChangeCarousel(i, 0, 0, SLIDE_SPEED);
    } else if (i < 0) {
      i = lastIndex;
      changeCarousel(cloneIndex, 0);
      delayChangeCarousel(i, lastIndex, SLIDE_SPEED, 0);
    } else {
      changeCarousel(i, SLIDE_SPEED);
    }
    this.currentIndex = i;

    function changeCarousel(to, sec) {
      this.$itemsWrap.css({
        'transform': 'translateX(' + this.indexMap[to] + 'px)',
        'transition': sec + 's ease'
      });
    }

    function delayChangeCarousel(from, to, sec, delay) {
      setTimeout(function () {
        if (this.currentIndex === from) changeCarousel(to, sec); // ディレイの待機時間中に何度もボタンが押されたとき対策
      }.bind(this), delay * 1000);
    }
  },
  setTimer: function () {
    this.timerIds.push(setTimeout(function () {
      this.moveNext(false);
      this.setTimer();
    }.bind(this), this.AUTO_SLIDE_INTERVAL));
  },
  resetTimer: function () {
    while (this.timerIds.length > 0) {
      clearInterval(this.timerIds.pop());
    }
  }
};

// // Instagram API
// MAINPAGEMOTION.INSTAGRAM_API = function () {
//   var html = '';
//   var $container = $('#instagramList');
//
//   $.ajax({
//     url: "php/instagram.php",
//     type: "POST",
//     dataType: "json"
//   }).done(function (data) {
//     //通信成功時の処理
//     $.each(data.data, function (i, item) {
//       var imgUrl = item.images.standard_resolution.url; //低解像度の画像のURLを取得
//       var link = item.link; //リンクを取得
//       html += '<li><a href="' + link + '" target="_blank"><img src="' + imgUrl + '"></a></li>';
//     });
//   }).fail(function () {
//     //通信失敗時の処理
//     html = "<li>画像を取得できません。</li>";
//   }).always(function () {
//     //通信完了時の処理
//     $container.html(html);
//     if (MAINPAGEMOTION.UA.device === 'sp') {
//       MAINPAGEMOTION.CONTENTSCAROUSEL.init();
//     } else {
//       MAINPAGEMOTION.INSTAGRAMLAYOUT.init();
//     }
//   });
// };

// Instagram API
MAINPAGEMOTION.INSTAGRAM_API = function () {
  $.getJSON("php/instagram.php", function(instagram_data){

    var gallery_data = instagram_data.media.data;
    var photos = "";
    var photo_length = 8;

    for(var i = 0; i < photo_length; i++){
      photos += '' + '<li><a href="' + gallery_data[i].permalink + '" target="_blank"><img src="' + gallery_data[i].media_url + '"></a></li>';
    }

    $('#instagramList').append(photos);

    if (MAINPAGEMOTION.UA.device === 'sp') {
      MAINPAGEMOTION.CONTENTSCAROUSEL.init();
    } else {
      MAINPAGEMOTION.INSTAGRAMLAYOUT.init();
    }
  });
};

var readyFunc = function () {
  MAINPAGEMOTION.UA = MAINPAGEMOTION.USERAGENTMANAGER.init();

  MAINPAGEMOTION.INSTAGRAM_API();

  MAINPAGEMOTION.KVCAROUSEL.init();

  if (MAINPAGEMOTION.UA.device === 'pc' && PAGE_DATA.page === 'top') {
    MAINPAGEMOTION.PC_TOPPAGE_FIXED.init();
  }

  if (MAINPAGEMOTION.UA.device === 'sp' || MAINPAGEMOTION.UA.device === 'pc' && PAGE_DATA.page === 'sub') {
    MAINPAGEMOTION.SUBPAGE_FIXED.init();
  }

  if (MAINPAGEMOTION.UA.device === 'sp' && PAGENAME_DATA.pageName === 'rental') {
    MAINPAGEMOTION.RENTALCATEGPRY_FIXED.init();
  }

  MAINPAGEMOTION.SWITCH_SHOW_NAV_MENU.init();

  $('.jscParallaxItem').each(function () {
    new MAINPAGEMOTION.PARALLAX($(this));
  });

  $('.jscLazySection').each(function () {
    new MAINPAGEMOTION.LAZYLOAD($(this));
  });

  MAINPAGEMOTION.SMOOTHSCROLL.init();

  // この関数は一回だけ実行可能
  readyFunc = function () {
    return false;
  };
};

var loadedFunc = function () {
  if (MAINPAGEMOTION.UA.device === 'sp') {
    MAINPAGEMOTION.CONTENTSCAROUSEL.init();
  } else {
    MAINPAGEMOTION.INSTAGRAMLAYOUT.init();
  }
  // この関数は一回だけ実行可能
  loadedFunc = function () {
    return false;
  };
};
window.addEventListener('DOMContentLoaded', readyFunc, false);
window.addEventListener('load', loadedFunc, false);