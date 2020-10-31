var VCAPTION = VCAPTION || {};

VCAPTION.OPEN_MODAL = {
  init: function () {
    this.setParameters();
    this.openModal();
    this.closeModal();
  },
  setParameters: function () {
    this.$btnOpenModal = $('.jscBtnOpenModal');
    this.$backgroundLayer = $('.jscBackgroundLayer');
  },
  openModal: function () {
    this.$btnOpenModal.on('click', function (e) {
      var _self = $(this);
      var backgroundLayer = _self.nextAll('.jscBackgroundLayer');
      var actionModal = _self.nextAll('.jscActionModal');

      if(_self.hasClass('jscBtnCreateRoom')){
        this.$btnRoomDetail = $('.jscRoomDetail');
        this.$btnRoomDetail.removeClass('open');
      }

      backgroundLayer.removeClass('dn');
      actionModal.removeClass('dn');
    });
  },
  closeModal: function () {
    this.$backgroundLayer.on('click', function (e) {
      var _self = $(this);
      var actionModal = _self.next('.jscActionModal');

      _self.addClass('dn');
      actionModal.addClass('dn');
    });
  }
}


VCAPTION.SHOW_ROOM_DETAIL = {
  init: function () {
    this.setParameters();
    this.openRoomDetail();
    this.closeRoomDetail();
  },
  setParameters: function () {
    this.$btnShowRoomDetail = $('.jscBtnShowRoomDetail');
    this.$btnCloseRoomDetail = $('.jscBtnCloseRoomDetail');
  },
  openRoomDetail: function () {
    this.$btnShowRoomDetail.on('click', function (e) {
      this.$btnRoomDetail = $('.jscRoomDetail');
      var roomDetailWrap = $(this).next('.jscRoomDetail');
      this.$btnRoomDetail.removeClass('open');
      roomDetailWrap.addClass('open');
    });
  },
  closeRoomDetail: function () {
    this.$btnCloseRoomDetail.on('click', function (e) {
      var roomDetailWrap = $(this).parents('.jscRoomDetail');
      roomDetailWrap.removeClass('open');
    });
  }
}

VCAPTION.CANCEL_ACTION = {
  init: function () {
    this.setParameters();
    this.cancelAction();
  },
  setParameters: function () {
    this.$btnCancel = $('.jscBtnCancel');
  },
  cancelAction: function () {
    this.$btnCancel.on('click', function (e) {
      var _self = $(this);
      var actionModal = _self.parents('.jscActionModal');
      var backgroundLayer = _self.parents('.jscModalParent').children('.jscBackgroundLayer');

      actionModal.addClass('dn');
      backgroundLayer.addClass('dn');
    });
  }
}

VCAPTION.EDIT_ROOM_NAME = {
  init: function () {
    this.setParameters();
    this.startEditingRoomName();
    this.saveRoomName();
  },
  setParameters: function () {
    this.$editRoomName = $('.jscEditRoomName');
    this.$btnEditRoomName = $('.jscBtnEditRoomName');
    this.$saveRoomName = $('.jscSaveRoomName');
    this.$btnSaveRoomName = this.$saveRoomName.children('.btnSaveRoomName');
  },
  startEditingRoomName: function () {
    this.$btnEditRoomName.on('click', function (e) {
      var _self = $(this);
      var editRoomName = _self.prev(this.$editRoomName);
      var saveRoomName = _self.next(this.$saveRoomName);

      editRoomName.removeAttr('disabled');
      _self.addClass('dn');
      saveRoomName.removeClass('dn');
    });
  },
  saveRoomName: function () {
    this.$btnSaveRoomName.on('click', function (e) {
      var _self = $(this);
      var saveRoomName = _self.parent(this.$saveRoomName);
      var btnEditRoomName = saveRoomName.prev(this.$btnEditRoomName);
      var editRoomName = btnEditRoomName.prev(this.$editRoomName);
      console.log(editRoomName);

      saveRoomName.addClass('dn');
      btnEditRoomName.removeClass('dn');
      editRoomName.attr('disabled', 'disabled');
    });
  }
}

var readyFunc = function () {

  // この関数は一回だけ実行可能
  readyFunc = function () {
    return false;
  };
};

var loadedFunc = function () {
  VCAPTION.OPEN_MODAL.init();
  VCAPTION.SHOW_ROOM_DETAIL.init();
  VCAPTION.CANCEL_ACTION.init();
  VCAPTION.EDIT_ROOM_NAME.init();

  // この関数は一回だけ実行可能
  loadedFunc = function () {
    return false;
  };
};
window.addEventListener('DOMContentLoaded', readyFunc, false);
window.addEventListener('load', loadedFunc, false);