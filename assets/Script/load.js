
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

        cc.loader.loadRes('systemSound/btn', this.initBtnAudio.bind(this));
        cc.loader.loadRes('systemSound/drag', this.initDragAudio.bind(this));
        cc.loader.loadRes('systemSound/false', this.initFalseAudio.bind(this));
        cc.loader.loadRes('systemSound/place', this.initPlaceAudio.bind(this));
        cc.loader.loadRes('systemSound/success', this.initSuccessAudio.bind(this));
        cc.loader.loadRes('systemSound/true', this.initTrueAudio.bind(this));
        cc.loader.loadRes('systemSound/BGM-1', cc.AudioClip, this.initBgmAudio.bind(this));

        this.loadNum = 0;
    },

    start() {
        window.level = 1;
        this.loadNum++;
        this.check();
    },

    initBtnAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.btnAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    initDragAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.dragAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    initFalseAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.falseAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    initPlaceAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.placeAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    initSuccessAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.successAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    initTrueAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.trueAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    initBgmAudio: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        window.bgmAudio = object;
        if (object.loaded) {
            this.loadNum++;
            this.check();
        }
    },

    check: function () {
        var start = function () {
            this.node.active = false;
            cc.find('Canvas/mainGround').active = true;
            window.bgmId = cc.audioEngine.play(window.bgmAudio, true, 1);

        }
        if (this.loadNum == 1) {
            this.scheduleOnce(start, 0.1);
        }
    },

    update(dt) {
        this.node.getChildByName('ProgressBar').getComponent(cc.ProgressBar).progress = this.loadNum / 8;
    },
});
