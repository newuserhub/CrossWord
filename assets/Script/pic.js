
cc.Class({
    extends: cc.Component,

    properties: {
        json: {
            default: {},
        },
        isIs: cc.Boolean,
    },

    onLoad() {
        this.alIn = false;
    },

    onClickOpen: function (event, data) {

        cc.find('Canvas/meanGround').active = true;
        var book = cc.find('Canvas/meanGround');
        var pic = cc.find('Canvas/gameGround/game/' + event.target.name);
        var json = pic.json
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

        if (pic.isIs) {
            book.getChildByName('trueLabel').active = true;
            book.getChildByName('falseLabel').active = false;
        } else {
            book.getChildByName('trueLabel').active = false;
            book.getChildByName('falseLabel').active = true;
        }

        book.getChildByName('falseLabel').getComponent(cc.Label).string = '???';
        book.getChildByName('trueLabel').getComponent(cc.Label).string = json.word;
        book.getChildByName('interpreterL').getComponent(cc.Label).string = json.definition;
        book.getChildByName('phonetic').getChildByName('phoneticL').getComponent(cc.Label).string = json.PA;
        for (let i = 0; i < window.word.length; i++) {
            if (json.word == window.word[i]) {
                this.alIn = true;
            }
        }
        if (this.alIn) {
            cc.find('Canvas/meanGround/btn_join').active = false;
            cc.find('Canvas/meanGround/btn_remove').active = true;
        } else {
            cc.find('Canvas/meanGround/btn_join').active = true;
            cc.find('Canvas/meanGround/btn_remove').active = false;
        }
        this.alIn = false;

    },

});
