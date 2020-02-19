cc.Class({
    extends: cc.Component,

    properties: {


    },

    onLoad() {

    },



    onClickCancle: function () {
        //cc.find('Canvas/gameGround').active = true;
        this.node.active = false;
    },

    onClickAddWord: function () {
        //cc.audioEngine.play(window.btnAudio);
        var word = this.node.getChildByName('trueLabel').getComponent(cc.Label).string;
        window.word[window.wordNum] = word;
        for (let i = 0; i < window.audio.length; i++) {
            if (window.audio[i]._name == word) {
                window.bookAudio[window.wordNum] = window.audio[i];
            }
        }
        window.wordNum++;
        cc.find('Canvas/mainGround').getComponent('gameStart').wordBookUpdate();
        cc.find('Canvas/mainGround').getComponent('gameStart').addF = false;
        cc.find('Canvas/mainGround').getComponent('gameStart').removeF = false;
        cc.find('Canvas/meanGround/btn_join').active = false;
        cc.find('Canvas/meanGround/btn_remove').active = true;
    },

    onClickRemoveWord: function () {
       //cc.audioEngine.play(window.btnAudio);
        var word = this.node.getChildByName('trueLabel').getComponent(cc.Label).string;
        for (let i = 0; i < window.word.length; i++) {
            if (window.word[i] == word) {
                window.bookAudio.splice(i, 1);
                window.word.splice(i, 1);
                window.wordNum--;
            }
        }
        cc.find('Canvas/mainGround').getComponent('gameStart').wordBookUpdate();
        cc.find('Canvas/mainGround').getComponent('gameStart').addF = false;
        cc.find('Canvas/mainGround').getComponent('gameStart').removeF = false;
        cc.find('Canvas/meanGround/btn_join').active = true;
        cc.find('Canvas/meanGround/btn_remove').active = false;
    },

    onClickPlayAudio: function () {
        //cc.audioEngine.play(window.btnAudio);
        var name = cc.find('Canvas/meanGround/trueLabel').getComponent(cc.Label).string;
        for (let i = 0; i < window.audio.length; i++) {
            if (window.audio[i]._name == name) {
                cc.log(window.audio[i]._name)
                //cc.audioEngine.setVolume(window.bgmId, 0.5);
                //cc.audioEngine.play(window.audio[i]);
                //cc.audioEngine.setFinishCallback(window.audio[i], this.setVoice());
                return;
            }
        }
        for (let j = 0; j < window.bookAudio.length; j++) {
            if (window.bookAudio[j]._name == name) {
                //cc.audioEngine.setVolume(window.bgmId, 0.5);
                //cc.audioEngine.play(window.bookAudio[j]);
                //cc.audioEngine.setFinishCallback(window.bookAudio[j], this.setVoice());
                return;
            }
        }
    },

    setVoice: function () {
        var setVoice = function () {
            //cc.audioEngine.setVolume(window.bgmId, 1);
        }
        this.scheduleOnce(setVoice, 0.5);
    },


    // update (dt) {},
});
