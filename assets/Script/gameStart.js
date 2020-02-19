
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {


        this.node.getChildByName('backGround').getChildByName('btn_start').runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(1, 1.025),
            cc.scaleTo(1, 0.975)
        )));
        this.bookInit();
    },

    onClickStart: function () {
        this.node.active = false;
        //cc.audioEngine.play(window.btnAudio);
        cc.find('Canvas/gameGround').opacity = 255;
        window.changeSize = true;
        window.changeCol = true;
    },

    onClickGet: function () {
        //cc.audioEngine.play(window.btnAudio);
    },

    onClickBook: function () {
        this.wordBookUpdate();
        //cc.audioEngine.play(window.btnAudio);
    },

    onClickVip: function () {
        //cc.audioEngine.play(window.btnAudio);
        cc.find('vipWindow').active = true;
    },

    onClickJoin: function () {
        //cc.audioEngine.play(window.btnAudio);
        cc.find('vipWindow').active = false;
        cc.find('warnWindow').stopAllActions();
        //cc.find('warnWindow').getChildByName('warnLabel').getComponent(cc.Label).string = '加入VIP成功。'
        cc.find('warnWindow').getChildByName('warnLabel').getComponent(cc.Label).string = '获得七天体验VIP';
        window.isVip = true;
        cc.find('warnWindow').opacity = 255;
        cc.find('warnWindow').runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(1)));
    },

    onClickCancleBook: function () {
        //cc.audioEngine.play(window.btnAudio);
        this.node.getChildByName('wordBook').active = false;
    },

    onClickWarn: function () {
        //cc.audioEngine.play(window.btnAudio);
        cc.find('warnWindow').stopAllActions();
        cc.find('warnWindow').getChildByName('warnLabel').getComponent(cc.Label).string = '该功能尚未开放。'
        cc.find('warnWindow').opacity = 255;
        cc.find('warnWindow').runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(1)));
    },

    onClickMean: function (event, data) {
        //cc.audioEngine.play(window.btnAudio);
        cc.find('Canvas/meanGround').active = true;
        var book = cc.find('Canvas/meanGround');
        for (let i = 0; i < window.wordMsg.length; i++) {
            if (window.wordMsg[i].word == event.target.name) {
                if (window.wordMsg[i].type == 1) {
                    var picN = 'pic' + window.wordMsg[i].coordinateX + (Number(window.wordMsg[i].coordinateY) - 1) + window.wordMsg[i].stage;
                    var pic = cc.find('Canvas/gameGround/game/' + picN);
                    book.getChildByName('wordPic').getComponent(cc.Sprite).spriteFrame = pic.getComponent(cc.Sprite).spriteFrame;
                    if (pic.width > pic.height) {
                        var scale = 300 / pic.width;
                        book.getChildByName('wordPic').width = scale * pic.width;
                        book.getChildByName('wordPic').height = scale * pic.height;
                    } else {
                        var scale = 300 / pic.height
                        book.getChildByName('wordPic').width = scale * pic.width;
                        book.getChildByName('wordPic').height = scale * pic.height;
                    }
                    book.getChildByName('trueLabel').active = true;
                    book.getChildByName('falseLabel').active = false;
                    book.getChildByName('trueLabel').getComponent(cc.Label).string = window.wordMsg[i].word;
                    book.getChildByName('interpreterL').getComponent(cc.Label).string = window.wordMsg[i].definition;
                    book.getChildByName('phonetic').getChildByName('phoneticL').getComponent(cc.Label).string = window.wordMsg[i].PA;
                } else {
                    var picN = 'pic' + (Number(window.wordMsg[i].coordinateX) - 1) + window.wordMsg[i].coordinateY + window.wordMsg[i].stage;
                    var pic = cc.find('Canvas/gameGround/game/' + picN);
                    book.getChildByName('wordPic').getComponent(cc.Sprite).spriteFrame = pic.getComponent(cc.Sprite).spriteFrame;
                    if (pic.width > pic.height) {
                        var scale = 300 / pic.width;
                        book.getChildByName('wordPic').width = scale * pic.width;
                        book.getChildByName('wordPic').height = scale * pic.height;
                    } else {
                        var scale = 300 / pic.height
                        book.getChildByName('wordPic').width = scale * pic.width;
                        book.getChildByName('wordPic').height = scale * pic.height;
                    }
                    book.getChildByName('trueLabel').active = true;
                    book.getChildByName('falseLabel').active = false;
                    book.getChildByName('trueLabel').getComponent(cc.Label).string = window.wordMsg[i].word;
                    book.getChildByName('interpreterL').getComponent(cc.Label).string = window.wordMsg[i].definition;
                    book.getChildByName('phonetic').getChildByName('phoneticL').getComponent(cc.Label).string = window.wordMsg[i].PA;
                }
                var alIn = false;
                for (let j = 0; j < window.word.length; j++) {
                    if (event.target.name == window.word[j]) {
                        alIn = true;
                    }
                }
                if (alIn) {
                    cc.find('Canvas/meanGround/btn_join').active = false;
                    cc.find('Canvas/meanGround/btn_remove').active = true;
                } else {
                    cc.find('Canvas/meanGround/btn_join').active = true;
                    cc.find('Canvas/meanGround/btn_remove').active = false;
                }
            }
        }
    },

    bookInit: function () {
        var num = 1;
        for (let i = 0; i < 26; i++) {
            var content = cc.find('Canvas/mainGround/wordBook/wordView/view/content')
            var a = cc.instantiate(cc.find('ground'));
            a.getComponent(cc.Label).string = String.fromCharCode(i + 65);
            content.addChild(a, num, String.fromCharCode(i + 65) + 'a');
            a.x = 0;
            a.active = false;
            num++;
            var b = cc.instantiate(cc.find('cfrule'));
            content.addChild(b, num, String.fromCharCode(i + 65) + 'b');
            b.x = 0;
            b.active = false;
            num++;
            var c = cc.instantiate(cc.find('wordGround'));
            content.addChild(c, num, String.fromCharCode(i + 65));
            c.x = 0;
            c.active = false;
        }
    },

    wordBookUpdate: function () {
        this.wordBookAdd();
        this.wordBookRemove();
        if (window.word.length == 0) {
            cc.find('Canvas/mainGround/wordBook/warnLabel').active = true;
            cc.find('Canvas/mainGround/wordBook/warnLabel').getComponent(cc.Label).string = '您还没有添加任何单词哦';
            cc.find('Canvas/mainGround/wordBook/warnL').active = true;
            cc.find('Canvas/mainGround/wordBook/warnL').getComponent(cc.Label).string = '可在关卡中或关卡完成后\n点击单词添加至生词本中'
        } else {
            cc.find('Canvas/mainGround/wordBook/warnLabel').active = false;
            cc.find('Canvas/mainGround/wordBook/warnL').active = false;
        }
    },

    wordBookAdd: function () {
        for (let i = 0; i < window.word.length; i++) {
            if (!cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + window.word[i][0].toUpperCase()).children.length == 0) {
                var ground = cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + window.word[i][0].toUpperCase());
                if (ground.getChildByName(window.word[i])) {
                } else {
                    var word = cc.instantiate(cc.find('wordBlock'));
                    cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + window.word[i][0].toUpperCase()).addChild(word, i, window.word[i]);
                    word.getChildByName('wordLabel').getComponent(cc.Label).string = window.word[i];
                }
            } else {
                var a = window.word[i][0].toUpperCase() + 'a';
                var b = window.word[i][0].toUpperCase() + 'b';
                var c = window.word[i][0].toUpperCase();
                cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + a).active = true;
                cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + b).active = true;
                cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + c).active = true;
                var word = cc.instantiate(cc.find('wordBlock'));
                cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + c).addChild(word, i, window.word[i]);
                word.getChildByName('wordLabel').getComponent(cc.Label).string = window.word[i];
            }
        }
        this.addF = true;
    },

    wordBookRemove: function () {
        for (let k = 0; k < 26; k++) {
            if (cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + String.fromCharCode(k + 64))) {
                var ground = cc.find('Canvas/mainGround/wordBook/wordView/view/content/' + String.fromCharCode(k + 64));
                for (let i = 0; i < ground.children.length; i++) {
                    var bool = false;
                    for (let j = 0; j < window.word.length; j++) {
                        if (window.word[j][0].toUpperCase() == String.fromCharCode(k + 64)) {
                            if (ground.children[i]._name == window.word[j]) {
                                bool = true;
                                break;
                            }
                        }
                    }
                    if (!bool) {
                        ground.children[i].destroy();
                        ground.children[i].removeFromParent();
                    }
                }
                if (ground.children.length == 0) {
                    var content = cc.find('Canvas/mainGround/wordBook/wordView/view/content');
                    var a = ground._name + 'a';
                    var b = ground._name + 'b';
                    content.getChildByName(a).active = false;
                    content.getChildByName(b).active = false;
                    ground.active = false;
                }
            }
        }
        this.removeF = true;
    },

    update(dt) {
        if (this.addF && this.removeF) {
            this.node.getChildByName('wordBook').active = true;
            this.addF = false;
            this.removeF = false;
        }
    },
});
