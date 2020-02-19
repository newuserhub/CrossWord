cc.Class({
    extends: cc.Component,

    properties: {

        word: cc.Node,
        big: cc.Node,
        pic: cc.Node,

        game: cc.Node,
        gameW: cc.Node,

    },

    onLoad() {

        this.JSON = new Array();

        this.n = 4;

        this.spriteNum = 0;
        this.wordNum = 0;

        this.spriteNextNum = 0;
        this.spriteLastNum = 0;
        this.spriteNextNNum = 0;
        this.spriteLastLNum = 0;

        this.nextSpriteF = new Array();
        this.lastSpriteF = new Array();
        this.nextNSptiteF = new Array();
        this.lastLSpriteF = new Array();

        this.id = new Array();
        this.posX = new Array();
        this.posY = new Array();
        this.type = new Array();
        this.default = new Array();
        this.wordB = new Array();
        this.pa = new Array();
        this.definition = new Array();

        this.wordXY = new Array();
        this.trueNum = new Array();
        this.nameW = new Array();

        this.letterN = new Array();
        this.letter = new Array();

        this.audio = new Array();

        this.isBtnOn = false;
        this.isNext = true;
        this.isLast = true;

        this.max = 100;
        this.min = 1;

        cc.loader.loadRes('json/stage.json', this.initJson.bind(this));

    },

    start() {
        this.initBlock();
    },


    initBlock: function () {
        if (window.isInitBlock == false) {
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 15; j++) {
                    var name = i + 'big' + j;
                    this.game.addChild(cc.instantiate(this.big), this.n, name);
                    this.game.getChildByName(name).setPosition(60 + i * 112, -180 - j * 112);
                    this.game.getChildByName(name).isIn = false;
                    this.game.getChildByName(name).opacity = 0;
                    this.n++;
                }
            }
        }
        window.isInitBlock = true;
    },

    initSprite: function () {
        for (let i = 0; i < this.JSON.length; i++) {
            if (this.JSON[i].stage == window.level) {
                cc.loader.loadRes('texture/' + this.JSON[i].word, cc.SpriteFrame, this.initS.bind(this));
                this.wordNum++;
            }
        }
        cc.log("sp")
    },

    initNextSprite: function () {
        for (let i = 0; i < this.JSON.length; i++) {
            if (this.JSON[i].stage == window.level + 1) {
                cc.loader.loadRes('texture/' + this.JSON[i].word, cc.SpriteFrame, this.initNextS.bind(this));
                //this.wordNextNum++;
            }
            if (this.JSON[i].stage == window.level - 1) {
                cc.loader.loadRes('texture/' + this.JSON[i].word, cc.SpriteFrame, this.initLastS.bind(this));
            }
        }
    },

    initS: function (err, object) {
        if (err) {
            console.log(err);
        }
        window.spriteF[this.spriteNum] = object;
        this.spriteNum++;
        if (this.spriteNum == this.wordNum) {
            this.initPic();
        }
    },

    initNextS: function (err, object) {
        if (err) {
            console.log(err);
        }
        this.nextSpriteF[this.spriteNextNum] = object;
        this.isNext = true;
        this.spriteNextNum++;
    },



    initLastS: function (err, object) {
        if (err) {
            console.log(err);
        }
        this.lastSpriteF[this.spriteLastNum] = object;
        this.isLast = true;
        this.spriteLastNum++;
    },

    initJson: function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        this.JSON = object.json
        console.log(this.JSON);
        this.initData();
        this.initLevel();
        this.initSprite();
    },

    initLevel: function () {
        cc.log("levle");
        cc.find('Canvas/gameGround/level/num').getComponent(cc.Label).string = window.level;
        cc.find('Canvas/gameGround/btn_tips/tip/tipNum').getComponent(cc.Label).string = window.tip;
    },

    initData: function () {
        var id = 0;
        cc.log(1);
        for (let i = 0; i < this.JSON.length; i++) {
            window.wordMsg[i] = this.JSON[i];
            if (this.JSON[i].stage == window.level) {
                this.id[id] = id;
                this.posX[id] = this.JSON[i].coordinateX;
                this.posY[id] = this.JSON[i].coordinateY;
                this.type[id] = this.JSON[i].type;
                this.default[id] = this.JSON[i].default;
                this.wordB[id] = this.JSON[i].word;
                this.definition[id] = this.JSON[i].definition;
                this.pa[id] = this.JSON[i].PA;
                id++;
            }
            if (this.JSON[i].stage > Number(this.max)) {
                this.max = this.JSON[i].stage;
            } else if (this.JSON[i].stage < this.min) {
                this.min = this.JSON[i].stage;
            }

        }
        this.loadAudio();
        this.initChapter();
        this.isBtnUseable();
    },

    isBtnUseable: function () {

        if (window.level == this.min) {
            cc.find('Canvas/gameGround/level/btn_back').opacity = 75;
            cc.find('Canvas/gameGround/level/btn_back').getComponent(cc.Button).interactable = false;
        } else {
            cc.find('Canvas/gameGround/level/btn_back').opacity = 255;
            cc.find('Canvas/gameGround/level/btn_back').getComponent(cc.Button).interactable = true;
        }

        if (window.level == this.max) {
            cc.find('Canvas/gameGround/level/btn_next').opacity = 75;
            cc.find('Canvas/gameGround/level/btn_next').getComponent(cc.Button).interactable = false;
        } else {
            cc.find('Canvas/gameGround/level/btn_next').opacity = 255;
            cc.find('Canvas/gameGround/level/btn_next').getComponent(cc.Button).interactable = true;
        }

    },

    loadAudio: function () {
        for (let i = 0; i < this.wordB.length; i++) {
            cc.loader.loadRes('audio/' + this.wordB[i], function (err, object) {
                if (err) {
                    console.log(err);
                }
                window.audio[i] = object;
            })
        }
    },

    initChapter: function () {
        var k = 0;
        for (let i = 0; i < this.id.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            if (this.type[i] == 1) {

                //初始化已有单词
                var arr = new Array();
                var arrN = new Array();
                for (let j = 0; j < this.default[i].length; j++) {
                    if (/[a-z]/i.test(this.default[i][j])) {
                        arr.push(this.default[i][j].toLowerCase());
                        arrN.push(j);
                    }
                }

                for (let j = 0; j < this.default[i].length; j++) {
                    if (/[-]/.test(this.default[i][j])) {
                        this.letter.push(this.wordB[i][j].toLowerCase());
                        this.letterN.push(cc.v2(Number(this.posX[i]), (Number(this.posY[i]) + Number(j))));
                    }
                }

                for (let j = 0; j < this.wordB[i].length; j++) {
                    var name1 = x + 'big' + (Number(y) + Number(j));
                    this.wordXY[k] = cc.v2(Number(x), Number(y) + Number(j));
                    k++;
                    this.game.getChildByName(name1)._objFlags = this.wordB[i][j].toLowerCase();
                    this.game.getChildByName(name1).getChildByName('wordL').color = new cc.color(241, 135, 2);
                    this.game.getChildByName(name1).opacity = 255;
                }

                for (let l = 0; l < arr.length; l++) {
                    var name2 = x + 'big' + (Number(y) + Number(arrN[l]));
                    this.game.getChildByName(name2).getChildByName('wordL').active = true;
                    this.game.getChildByName(name2).getChildByName('wordL').getComponent(cc.Label).string = arr[l];
                    this.game.getChildByName(name2).isIn = true;
                    this.game.getChildByName(name2).getChildByName('or').getComponent(cc.Label).string = 'true'
                    this.game.getChildByName(name2).getChildByName('isIn').active = true;
                    this.game.getChildByName(name2).isTrue = true;
                }
            } else {

                //初始化已有单词
                var arr = new Array();
                var arrN = new Array();
                for (let j = 0; j < this.default[i].length; j++) {
                    if (/[a-z]/i.test(this.default[i][j])) {
                        arr.push(this.default[i][j].toLowerCase());
                        arrN.push(j);
                    }
                }

                for (let j = 0; j < this.default[i].length; j++) {
                    if (/[-]/.test(this.default[i][j])) {
                        this.letter.push(this.wordB[i][j].toLowerCase());
                        this.letterN.push(cc.v2((Number(this.posX[i]) + Number(j)), Number(this.posY[i])));
                    }
                }

                for (let j = 0; j < this.wordB[i].length; j++) {
                    var name1 = (Number(x) + Number(j)) + 'big' + y;
                    this.wordXY[k] = cc.v2(Number(x) + Number(j), Number(y));
                    k++;
                    this.game.getChildByName(name1)._objFlags = this.wordB[i][j].toLowerCase();
                    this.game.getChildByName(name1).getChildByName('wordL').color = new cc.color(241, 135, 2);
                    this.game.getChildByName(name1).opacity = 255;
                }

                for (let l = 0; l < arr.length; l++) {
                    var name2 = (Number(x) + Number(arrN[l])) + 'big' + y;
                    this.game.getChildByName(name2).getChildByName('wordL').active = true;
                    this.game.getChildByName(name2).getChildByName('wordL').getComponent(cc.Label).string = arr[l];
                    this.game.getChildByName(name2).isIn = true;
                    this.game.getChildByName(name2).getChildByName('or').getComponent(cc.Label).string = 'true';
                    this.game.getChildByName(name2).getChildByName('isIn').active = true;
                    this.game.getChildByName(name2).isTrue = true;
                }
            }
        }

        //消除重复
        for (let i = 0; i < this.wordXY.length; i++) {
            for (let j = i + 1; j < this.wordXY.length; j++) {
                if (this.wordXY[i].x == this.wordXY[j].x && this.wordXY[i].y == this.wordXY[j].y) {
                    this.wordXY.splice(j, 1);
                }
            }
        }

        for (let i = 0; i < this.letterN.length; i++) {
            for (let j = i + 1; j < this.letterN.length; j++) {
                if (this.letterN[i].x == this.letterN[j].x && this.letterN[i].y == this.letterN[j].y) {
                    this.letterN.splice(j, 1);
                    this.letter.splice(j, 1);
                }
            }
        }

        this.letter.sort();
        this.initWord();

        //缩放
        var maxX = 0;
        var maxY = 0;
        var min;
        for (let i = 0; i < this.wordXY.length; i++) {
            if (this.wordXY[i].x > maxX) {
                maxX = this.wordXY[i].x;
            }
            if (this.wordXY[i].y > maxY) {
                maxY = this.wordXY[i].y;
            }
        }
        if (1080 / (maxX + 2) < 1300 / (maxY + 2)) {
            min = 1080 / (maxX + 2) / 116;
        } else {
            min = 1300 / (maxY + 2) / 116;
        }
        var moveX = (1080 - (116 * (maxX + 1) * min)) / 2;
        var moveY = (1300 - (115 * (maxY + 1) * min)) / 2;
        this.game.y = -moveY;
        this.game.x = moveX;
        this.game.scaleX = min;
        this.game.scaleY = min;

        // var out = cc.find('Canvas/gameGround/gameOut').getComponent(cc.PolygonCollider);
    },

    initPic: function () {
        var id = 0;
        for (let i = 0; i < this.JSON.length; i++) {
            if (this.JSON[i].stage == window.level) {
                if (this.type[id] == 1) {
                    var name = Number(this.posX[id]) + 'big' + (Number(this.posY[id]) - 1);
                    var name2 = 'pic' + Number(this.posX[id]) + (Number(this.posY[id]) - 1) + window.level;
                    if (!cc.find('Canvas/gameGround/game/' + name2)) {
                        this.game.addChild(cc.instantiate(this.pic), this.n, name2);
                        this.n++;
                    }
                    this.game.getChildByName(name2).active = true;
                    var pos = cc.v2(this.game.getChildByName(name).x, this.game.getChildByName(name).y);
                    this.game.getChildByName(name2).setPosition(pos.x, pos.y);
                    this.game.getChildByName(name2).isIs = false;
                    this.game.getChildByName(name2).json = this.JSON[i];
                    for (let j = 0; j < window.spriteF.length; j++) {
                        if (window.spriteF[j]) {
                            if (this.game.getChildByName(name2).json.word == window.spriteF[j]._name) {
                                this.game.getChildByName(name2).getComponent(cc.Sprite).spriteFrame = window.spriteF[j];

                                if (window.spriteF[j]._originalSize.width > window.spriteF[j]._originalSize.height) {
                                    var scale = 100 / window.spriteF[j]._originalSize.width;
                                    this.game.getChildByName(name2).width = scale * window.spriteF[j]._originalSize.width;
                                    this.game.getChildByName(name2).height = scale * window.spriteF[j]._originalSize.height;
                                } else {
                                    var scale = 100 / window.spriteF[j]._originalSize.height;
                                    this.game.getChildByName(name2).width = scale * window.spriteF[j]._originalSize.width;
                                    this.game.getChildByName(name2).height = scale * window.spriteF[j]._originalSize.height;
                                }
                            }

                        }
                    }
                    id++;
                } else {
                    var name = (Number(this.posX[id]) - 1) + 'big' + Number(this.posY[id]);
                    var name2 = 'pic' + (Number(this.posX[id]) - 1) + Number(this.posY[id]) + window.level;
                    if (!cc.find('Canvas/gameGround/game/' + name2)) {
                        this.game.addChild(cc.instantiate(this.pic), this.n, name2);
                        this.n++;
                    }
                    this.game.getChildByName(name2).active = true;
                    var pos = cc.v2(this.game.getChildByName(name).x, this.game.getChildByName(name).y);
                    this.game.getChildByName(name2).setPosition(pos.x, pos.y);
                    this.game.getChildByName(name2).isIs = false;
                    this.game.getChildByName(name2).json = this.JSON[i];
                    for (let j = 0; j < window.spriteF.length; j++) {
                        if (window.spriteF[j]) {
                            if (this.game.getChildByName(name2).json.word == window.spriteF[j]._name) {
                                this.game.getChildByName(name2).getComponent(cc.Sprite).spriteFrame = window.spriteF[j];

                                if (window.spriteF[j]._originalSize.width > window.spriteF[j]._originalSize.height) {
                                    var scale = 100 / window.spriteF[j]._originalSize.width;
                                    this.game.getChildByName(name2).width = scale * window.spriteF[j]._originalSize.width;
                                    this.game.getChildByName(name2).height = scale * window.spriteF[j]._originalSize.height;
                                } else {
                                    var scale = 100 / window.spriteF[j]._originalSize.height;
                                    this.game.getChildByName(name2).width = scale * window.spriteF[j]._originalSize.width;
                                    this.game.getChildByName(name2).height = scale * window.spriteF[j]._originalSize.height;
                                }
                            }
                        }
                    }
                    id++;
                }
            }
        }
        this.initNextSprite();
    },

    initWord: function () {
        var k = 0
        for (let i = 0; i < this.letter.length; i++) {
            this.nameW[k] = this.letter[i];
            k++;
        }

        if (this.nameW.length < 6) {
            this.gameW.getComponent(cc.Layout).type = 1;
            this.gameW.getComponent(cc.Layout).paddingLeft = 35;
            this.gameW.getComponent(cc.Layout).paddingRight = 35;
            this.gameW.getComponent(cc.Layout).spacingX = 10;
            this.gameW.getComponent(cc.Layout).spacingy = 10;
        } else if (this.nameW.length < 12) {
            this.gameW.getComponent(cc.Layout).type = 3;
            this.gameW.width = 1080;
            this.gameW.getComponent(cc.Layout).paddingLeft = 35;
            this.gameW.getComponent(cc.Layout).paddingRight = 35;
            this.gameW.getComponent(cc.Layout).spacingX = 10;
            this.gameW.getComponent(cc.Layout).spacingy = 10;
        } else {
            this.gameW.getComponent(cc.Layout).type = 3;
            this.gameW.width = 1080;
            this.gameW.getComponent(cc.Layout).paddingLeft = 80;
            this.gameW.getComponent(cc.Layout).spacingX = 15;
            this.gameW.getComponent(cc.Layout).spacingy = 15;
        }

        for (let i = 0; i < this.nameW.length; i++) {
            var name = String(this.nameW[i] + i + window.level);
            this.gameW.addChild(cc.instantiate(this.word), this.n, name);
            if (this.nameW.length < 12) {
                this.gameW.getChildByName(name).width = 160;
                this.gameW.getChildByName(name).height = 160;
                window.wordSize = 160;
            } else {
                this.gameW.getChildByName(name).width = 120;
                this.gameW.getChildByName(name).height = 120;
                window.wordSize = 120;
            }
            this.gameW.getChildByName(name).y = 0;
            this.gameW.getChildByName(name).active = true;
            this.gameW.getChildByName(name).isCanMove = true;
            this.gameW.getChildByName(name).isLockH = false;
            this.gameW.getChildByName(name).isLockV = false;
            this.gameW.getChildByName(name).isTrue = true;
            this.gameW.getChildByName(name).isFailedH = false;
            this.gameW.getChildByName(name).isFailedV = false;
            this.gameW.getChildByName(name).getChildByName('wordL').active = true;
            this.gameW.getChildByName(name).getChildByName('wordL').getComponent(cc.Label).string = this.nameW[i];
        }
        window.tag = this.letterN;
        this.n++;
    },

    destroyPic: function () {
        for (let i = 0; i < this.id.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            if (this.type[i] == 1) {
                var name2 = 'pic' + Number(this.posX[i]) + (Number(this.posY[i]) - 1) + window.level;
                this.game.getChildByName(name2).active = false;
            } else {
                var name2 = 'pic' + (Number(this.posX[i]) - 1) + Number(this.posY[i]) + window.level;
                this.game.getChildByName(name2).active = false;
            }
        }
    },

    destroyAll: function () {
        for (let i = 0; i < this.id.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            if (this.type[i] == 1) {
                for (let j = 0; j < this.wordB[i].length; j++) {
                    var name1 = x + 'big' + (Number(y) + Number(j));
                    this.game.getChildByName(name1)._objFlags = null;
                    this.game.getChildByName(name1).opacity = 0;
                    this.game.getChildByName(name1).isIn = false;
                    this.game.getChildByName(name1).isTrue = false;
                    this.game.getChildByName(name1).getChildByName('true').active = false;
                    if (this.game.getChildByName(name1).getChildByName('isIn').active == true) {
                        this.game.getChildByName(name1).getChildByName('wordL').active = false;
                        this.game.getChildByName(name1).getChildByName('isIn').active = false;
                    }
                }
            } else {
                for (let j = 0; j < this.wordB[i].length; j++) {
                    var name1 = (Number(x) + Number(j)) + 'big' + y;
                    this.game.getChildByName(name1)._objFlags = null;
                    this.game.getChildByName(name1).opacity = 0;
                    this.game.getChildByName(name1).isIn = false;
                    this.game.getChildByName(name1).isTrue = false;
                    this.game.getChildByName(name1).getChildByName('true').active = false;
                    if (this.game.getChildByName(name1).getChildByName('isIn').active == true) {
                        this.game.getChildByName(name1).getChildByName('wordL').active = false;
                        this.game.getChildByName(name1).getChildByName('isIn').active = false;
                    }
                }
            }
        }

        for (let i = 0; i < this.nameW.length; i++) {
            var name = this.nameW[i] + i + window.level;
            if (cc.find('Canvas/gameGround/game/' + name)) {
                cc.find('Canvas/gameGround/game/' + name).active = false;
            } else {
                this.gameW.getChildByName(name).removeFromParent(this.gameW);
            }
        }
    },

    setLock: function (id) {
        var x = this.posX[id];
        var y = this.posY[id];
        if (this.type[id] == 1) {
            for (let j = 0; j < this.wordB[id].length; j++) {
                var name1 = x + 'big' + (Number(y) + Number(j));
                var nameP = 'pic' + x + (Number(y) - 1) + window.level;
                if (cc.find('Canvas/gameGround/game/' + nameP)) {
                    cc.find('Canvas/gameGround/game/' + nameP).isIs = true;
                }
                for (let i = 0; i < this.nameW.length; i++) {
                    var name = this.nameW[i] + i + window.level;
                    if (cc.find('Canvas/gameGround/game/' + name)) {
                        var name2 = cc.find('Canvas/gameGround/game/' + name);
                        if (Math.abs(name2.x - this.game.getChildByName(name1).x) < 10 && Math.abs(name2.y - this.game.getChildByName(name1).y) < 10) {
                            if (!name2.isLockH) {
                                //cc.audioEngine.play(window.trueAudio);
                                name2.isLockH = true;
                                name2.isCanMove = false;
                                name2.getChildByName('true').active = true;
                                name2.getChildByName('false').active = false;
                                name2.getChildByName('wordL').color = new cc.color(59, 193, 40);
                                name2.runAction(cc.sequence(
                                    cc.scaleTo(0.2, 0.9),
                                    cc.scaleTo(0.2, 1),
                                ));
                                for (let k = 0; k < this.wordB[id].length; k++) {
                                    var name3 = x + 'big' + (Number(y) + Number(k));
                                    this.game.getChildByName(name3).isIn = true;
                                    this.game.getChildByName(name3).getChildByName('true').active = true;
                                    this.game.getChildByName(name3).getChildByName('wordL').color = new cc.color(59, 193, 40);
                                    this.game.getChildByName(name3).runAction(cc.sequence(
                                        cc.scaleTo(0.2, 0.9),
                                        cc.scaleTo(0.2, 1),
                                    ));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (let j = 0; j < this.wordB[id].length; j++) {
                var name1 = (Number(x) + Number(j)) + 'big' + y;
                var nameP = 'pic' + (Number(x) - 1) + y + window.level;
                if (cc.find('Canvas/gameGround/game/' + nameP)) {
                    cc.find('Canvas/gameGround/game/' + nameP).isIs = true;
                }
                for (let i = 0; i < this.nameW.length; i++) {
                    var name = this.nameW[i] + i + window.level;
                    if (cc.find('Canvas/gameGround/game/' + name)) {
                        var name2 = cc.find('Canvas/gameGround/game/' + name)
                        if (Math.abs(name2.x - this.game.getChildByName(name1).x) < 10 && Math.abs(name2.y - this.game.getChildByName(name1).y) < 10) {
                            if (!name2.isLockV) {
                                //cc.audioEngine.play(window.trueAudio);
                                name2.isLockV = true;
                                name2.isCanMove = false;
                                name2.getChildByName('true').active = true;
                                name2.getChildByName('false').active = false;
                                name2.getChildByName('wordL').color = new cc.color(59, 193, 40);
                                name2.runAction(cc.sequence(
                                    cc.scaleTo(0.2, 0.9),
                                    cc.scaleTo(0.2, 1),
                                ));
                                for (let k = 0; k < this.wordB[id].length; k++) {
                                    var name3 = (Number(x) + Number(k)) + 'big' + y;
                                    this.game.getChildByName(name3).isIn = true;
                                    this.game.getChildByName(name3).getChildByName('true').active = true;
                                    this.game.getChildByName(name3).getChildByName('wordL').color = new cc.color(59, 193, 40);
                                    this.game.getChildByName(name3).runAction(cc.sequence(
                                        cc.scaleTo(0.2, 0.9),
                                        cc.scaleTo(0.2, 1),
                                    ));
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    cancleLock: function () {
        for (let i = 0; i < this.wordXY.length; i++) {
            var x = this.wordXY[i].x;
            var y = this.wordXY[i].y;
            var name = x + 'big' + y;
            for (let i = 0; i < this.nameW.length; i++) {
                var name1 = this.nameW[i] + i + window.level;
                if (cc.find('Canvas/gameGround/game/' + name1)) {
                    var name2 = cc.find('Canvas/gameGround/game/' + name1);
                    if (Math.abs(name2.x - this.game.getChildByName(name).x) < 10 && Math.abs(name2.y - this.game.getChildByName(name).y) < 10) {
                        name2.isCanMove = true;
                        name2.isLockH = false;
                        name2.isLockV = false;
                    }
                }
            }
        }
    },

    setFailed: function (id) {
        var x = this.posX[id];
        var y = this.posY[id];
        if (this.type[id] == 1) {
            for (let j = 0; j < this.wordB[id].length; j++) {
                var name1 = x + 'big' + (Number(y) + Number(j));
                for (let i = 0; i < this.nameW.length; i++) {
                    var name = this.nameW[i] + i + window.level;
                    if (cc.find('Canvas/gameGround/game/' + name)) {
                        var name2 = cc.find('Canvas/gameGround/game/' + name);
                        if (!name2.isFailedH) {
                            if (name2.isCanMove) {
                                if (name2.x == this.game.getChildByName(name1).x && name2.y == this.game.getChildByName(name1).y) {
                                    var x = name2.x;
                                    var y = name2.y;
                                    name2.isTrue = false;
                                    name2.isFailedH = true;
                                    name2.getChildByName('false').active = true;
                                    name2.getChildByName('wordL').color = new cc.color(255, 32, 32);
                                    //cc.audioEngine.play(window.falseAudio);
                                    name2.runAction(cc.repeat(cc.sequence(
                                        cc.moveBy(0.025, 5, 0),
                                        cc.moveBy(0.025, -5, 0),
                                        cc.moveBy(0.025, -5, 0),
                                        cc.moveBy(0.025, 5, 0),
                                    ), 3));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (let j = 0; j < this.wordB[id].length; j++) {
                var name1 = (Number(x) + Number(j)) + 'big' + y;
                for (let i = 0; i < this.nameW.length; i++) {
                    var name = this.nameW[i] + i + window.level;
                    if (cc.find('Canvas/gameGround/game/' + name)) {
                        var name2 = cc.find('Canvas/gameGround/game/' + name);
                        if (!name2.isFailedV) {
                            if (name2.isCanMove) {
                                if (name2.x == this.game.getChildByName(name1).x && name2.y == this.game.getChildByName(name1).y) {
                                    name2.isTrue = false;
                                    name2.isFailedV = true;
                                    name2.getChildByName('false').active = true;
                                    name2.getChildByName('wordL').color = new cc.color(255, 32, 32);
                                    //cc.audioEngine.play(window.falseAudio);
                                    name2.runAction(cc.repeat(cc.sequence(
                                        cc.moveBy(0.025, 5, 0),
                                        cc.moveBy(0.025, -5, 0),
                                        cc.moveBy(0.025, -5, 0),
                                        cc.moveBy(0.025, 5, 0),
                                    ), 3));
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    isVerticalTrue: function () {
        for (let i = 0; i < this.id.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            if (this.type[i] == 1) {
                for (let j = 0; j < this.wordB[i].length; j++) {
                    var name1 = x + 'big' + (Number(y) + Number(j)); //判断一组单词

                    if (this.game.getChildByName(name1).isIn) {
                        if (j == this.wordB[i].length - 1) { //判断一组单词是否填满
                            for (let k = 0; k < this.wordB[i].length; k++) {
                                var name2 = x + 'big' + (Number(y) + Number(k));
                                if (this.game.getChildByName(name2).isTrue) {
                                    if (k == this.wordB[i].length - 1) {
                                        this.setLock(i);
                                        break;
                                    }
                                } else {
                                    this.setFailed(i);
                                    break;
                                }
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    },

    isHorizTrue: function () {
        for (let i = 0; i < this.id.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            if (this.type[i] == 0) {
                for (let j = 0; j < this.wordB[i].length; j++) {
                    var name1 = (Number(x) + Number(j)) + 'big' + y;
                    if (this.game.getChildByName(name1).isIn) {
                        if (j == this.wordB[i].length - 1) {
                            for (let k = 0; k < this.wordB[i].length; k++) {
                                var name2 = (Number(x) + Number(k)) + 'big' + y;
                                if (this.game.getChildByName(name2).isTrue) {
                                    if (k == this.wordB[i].length - 1) {
                                        this.setLock(i);
                                    }
                                } else {
                                    this.setFailed(i)
                                    break;
                                }
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    },

    passWordUpdate: function () {
        var ground = cc.find('Canvas/successGround/word');
        ground.removeAllChildren();
        var size = new Array();
        for (let i = 0; i < this.id.length; i++) {
            var pass = cc.instantiate(cc.find('endWord'));
            ground.addChild(pass, Number(i) + 1, 'end' + i)
            pass.x = -150;
            pass.getChildByName('passGround').getChildByName('passWord').getComponent(cc.Label).string = this.wordB[i];
            pass.getChildByName('btn_audio').opacity = 0;
        }
        // var times = 0;
        // this.delayPlay = function () {
        //     this.audioPlay(times);
        // }
        // this.scheduleOnce(this.delayPlay, 1);
    },

    // audioPlay: function (times) {

    //     if (times < this.id.length) {
    //         var name = 'end' + Number(times);
    //         var ground = cc.find('Canvas/successGround/word/' + name);
    //         cc.audioEngine.play(window.audio[times]);
    //         ground.getChildByName('btn_audio').runAction(cc.sequence(
    //             cc.fadeIn(0.5),
    //             cc.fadeOut(0.5)
    //         ));
    //     } else {
    //         return;
    //     }
    //     times++;
    //     this.again = function () {
    //         this.audioPlay(times);
    //     };
    //     if (times == 0) {
    //         this.audioPlay(times);
    //     } else {
    //         this.scheduleOnce(this.again, 1.25);
    //     }
    // },

    onClickAudio: function (event, data) {

        //cc.audioEngine.play(window.btnAudio);

        cc.find('Canvas/meanGround').active = true;
        var book = cc.find('Canvas/meanGround');
        var word = cc.find('Canvas/successGround/word/' + event.target.name).getChildByName('passGround').getChildByName('passWord').getComponent(cc.Label).string;
        for (let i = 0; i < this.wordB.length; i++) {
            if (this.wordB[i] == word) {
                if (this.type[i] == 1) {
                    var picN = 'pic' + this.posX[i] + (Number(this.posY[i]) - 1) + window.level;
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
                    book.getChildByName('trueLabel').getComponent(cc.Label).string = this.wordB[i];
                    book.getChildByName('interpreterL').getComponent(cc.Label).string = this.definition[i];
                    book.getChildByName('phonetic').getChildByName('phoneticL').getComponent(cc.Label).string = this.pa[i];
                } else {
                    var picN = 'pic' + (Number(this.posX[i]) - 1) + this.posY[i] + window.level;
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
                    book.getChildByName('trueLabel').getComponent(cc.Label).string = this.wordB[i];
                    book.getChildByName('interpreterL').getComponent(cc.Label).string = this.definition[i];
                    book.getChildByName('phonetic').getChildByName('phoneticL').getComponent(cc.Label).string = this.pa[i];
                }
                var alIn = false;
                for (let j = 0; j < window.word.length; j++) {
                    if (this.wordB[i] == window.word[j]) {
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

    onClickReset: function () {
        //cc.audioEngine.play(window.btnAudio);
        for (let i = 0; i < this.nameW.length; i++) {
            var name = this.nameW[i] + i + window.level;
            if (cc.find('Canvas/gameGround/game/' + name)) {
                if (cc.find('Canvas/gameGround/game/' + name).isCanMove) {
                    cc.find('Canvas/gameGround/game/' + name).isIn = false;
                    var name2 = cc.find('Canvas/gameGround/game/' + name);
                    for (let j = 0; j < this.wordXY.length; j++) {
                        var x = this.wordXY[j].x;
                        var y = this.wordXY[j].y;
                        var name1 = x + 'big' + y;
                        if (Math.abs(name2.x - this.game.getChildByName(name1).x) < 10 && Math.abs(name2.y - this.game.getChildByName(name1).y) < 10) {
                            this.game.getChildByName(name1).isIn = false;
                            this.game.getChildByName(name1).getChildByName('or').getComponent(cc.Label).string = 'false'
                            if (this.game.getChildByName(name1).isTrue) {
                                window.t--
                                window.isSuccess = true;
                            }
                            this.game.getChildByName(name1).isTrue = false;
                        }
                    }
                    name2.stopAllActions();
                    name2.isFailedH = false;
                    name2.isFailedV = false;
                    name2.setParent(this.gameW);
                    name2.width = window.wordSize;
                    name2.height = window.wordSize;
                    this.gameW.getChildByName(name).y = 0;
                    this.gameW.getChildByName(name).getChildByName('false').active = false;
                    this.gameW.getChildByName(name).isTrue = true;
                    this.gameW.getChildByName(name).getChildByName('wordL').color = new cc.color(255, 255, 255);
                }
            }
        }
    },



    onClickTips: function () {
        //cc.audioEngine.play(window.btnAudio);
        if (window.tip > 0) {
            for (let i = 0; i < this.wordXY.length; i++) {
                var x = this.wordXY[i].x;
                var y = this.wordXY[i].y;
                var name1 = x + 'big' + y;
                if (this.game.getChildByName(name1).isIn == false) {
                    if (!this.game.getChildByName(name1).isTrue) {
                        for (let j = 0; j < this.nameW.length; j++) {
                            var name2 = this.nameW[j] + j + window.level;
                            if (cc.find('Canvas/gameGround/gameW/' + name2)) {
                                if (cc.find('Canvas/gameGround/gameW/' + name2).isCanMove) {
                                    if (this.game.getChildByName(name1)._objFlags == this.gameW.getChildByName(name2).getChildByName('wordL').getComponent(cc.Label).string) {
                                        this.gameW.getChildByName(name2).setParent(this.game);
                                        this.game.getChildByName(name2).width = 120;
                                        this.game.getChildByName(name2).height = 120;
                                        this.game.getChildByName(name2).setPosition(this.game.getChildByName(name1).x, this.game.getChildByName(name1).y);
                                        this.game.getChildByName(name1).isIn = true;
                                        this.game.getChildByName(name1).getChildByName('or').getComponent(cc.Label).string = 'true'
                                        this.game.getChildByName(name2).getChildByName('or').getComponent(cc.Label).string = this.game.getChildByName(name2).isTrue;
                                        this.game.getChildByName(name1).isTrue = true;
                                        this.game.getChildByName(name2).isIn = true;
                                        window.isSuccess = true;
                                        window.t++;
                                        var isAgain = function () {
                                            if (this.game.getChildByName(name2).isCanMove) {
                                                this.onClickTips();
                                            } else {
                                                window.tip -= 1;
                                                cc.find('Canvas/gameGround/btn_tips/tip/tipNum').getComponent(cc.Label).string = window.tip;
                                            }
                                        }
                                        this.scheduleOnce(isAgain, 0.1);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (!this.game.getChildByName(name1).isTrue) {
                        for (let j = 0; j < this.nameW.length; j++) {
                            var name2 = this.nameW[j] + j + window.level;
                            if (cc.find('Canvas/gameGround/game/' + name2)) {
                                if (cc.find('Canvas/gameGround/game/' + name2).isCanMove) {
                                    var name3 = cc.find('Canvas/gameGround/game/' + name2);
                                    if (Math.abs(name3.x - this.game.getChildByName(name1).x) < 10 && Math.abs(name3.y - this.game.getChildByName(name1).y) < 10) {
                                        this.game.getChildByName(name1).isIn = false;
                                        this.game.getChildByName(name1).getChildByName('or').getComponent(cc.Label).string = 'false'
                                        if (this.game.getChildByName(name1).isTrue) {
                                            window.t--
                                            window.isSuccess = true;
                                        }
                                        this.game.getChildByName(name1).isTrue = false;
                                        name3.stopAllActions();
                                        name3.setParent(this.gameW);
                                        this.gameW.getChildByName(name2).width = window.wordSize;
                                        this.gameW.getChildByName(name2).height = window.wordSize;
                                        this.gameW.getChildByName(name2).y = 0;
                                        this.gameW.getChildByName(name2).getChildByName('false').active = false;
                                        this.gameW.getChildByName(name2).isTrue = true;
                                        this.gameW.getChildByName(name2).getChildByName('wordL').color = new cc.color(255, 255, 255);
                                        // this.onClickTips();
                                        // return;
                                        i--;
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            return;
        }
    },


    removeData: function () {

        this.letter = new Array();
        this.letterN = new Array();
        window.tag = new Array();
        this.id = new Array();
        this.posX = new Array();
        this.posY = new Array();
        this.type = new Array();
        this.default = new Array();
        this.wordB = new Array();
        this.pa = new Array();
        this.wordXY = new Array();
        this.trueNum = new Array();
        this.nameW = new Array();
        this.spriteNum = 0;
        this.wordNum = 0;
        this.spriteNextNum = 0;
        this.spriteLastNum = 0;

    },

    onClickNext: function () {
        if (!window.isVip) {
            if (window.level > 9) {
                cc.find('vipWindow').active = true;
            } else {
                //cc.audioEngine.play(window.btnAudio);
                var next = function () {
                    this.cancleLock();
                    this.onClickReset();
                    this.destroyAll();
                    this.destroyPic();
                    this.removeData();
                    window.level++;
                    window.t = 0;
                    window.changeSize = true;
                    window.changeCol = true;
                    cc.find('Canvas/gameGround/level/num').getComponent(cc.Label).string = window.level;
                    this.initData();
                    window.spriteF = new Array();
                    window.spriteF = this.nextSpriteF;
                    this.nextSpriteF = new Array();
                    this.lastSpriteF = new Array();
                    this.initPic();
                    this.isBtnUseable();
                }
                if (this.isNext) {
                    this.isNext = false;
                    this.scheduleOnce(next, 0.1);
                }
            }
        } else {
            //cc.audioEngine.play(window.btnAudio);
            var next = function () {
                this.cancleLock();
                this.onClickReset();
                this.destroyAll();
                this.destroyPic();
                this.removeData();
                window.level++;
                window.t = 0;
                window.changeSize = true;
                window.changeCol = true;
                cc.find('Canvas/gameGround/level/num').getComponent(cc.Label).string = window.level;
                this.initData();
                window.spriteF = new Array();
                window.spriteF = this.nextSpriteF;
                this.nextSpriteF = new Array();
                this.lastSpriteF = new Array();
                this.initPic();
                this.isBtnUseable();
            }
            if (this.isNext) {
                this.isNext = false;
                this.scheduleOnce(next, 0.1);
            }
        }
    },

    onClickBack: function () {
        //cc.audioEngine.play(window.btnAudio);
        var last = function () {
            this.cancleLock();
            this.onClickReset();
            this.destroyAll();
            this.destroyPic();
            this.removeData();
            window.level--;
            window.t = 0;
            window.changeSize = true;
            window.changeCol = true;
            cc.find('Canvas/gameGround/level/num').getComponent(cc.Label).string = window.level;
            this.initData();
            window.spriteF = new Array();
            window.spriteF = this.lastSpriteF;
            this.nextSpriteF = new Array();
            this.lastSpriteF = new Array();
            this.initPic();
            this.isBtnUseable();
        }
        if (this.isLast) {
            this.isLast = false;
            this.scheduleOnce(last, 0.1);
        }
    },

    onClickHome: function () {
        //cc.audioEngine.play(window.btnAudio);
        this.cancleLock();
        this.onClickReset();
        this.destroyAll();
        this.destroyPic();
        this.removeData();
        window.t = 0;
        cc.find('warnWindow').stopAllActions();
        cc.find('warnWindow').opacity = 0;
        this.node.getChildByName('mainGround').active = true;
        this.node.getChildByName('gameGround').opacity = 0;

        this.initData();
        this.initPic();
    },

    onClickPass: function () {
        for (let i = 0; i < this.id.length; i++) {
            var name = 'end' + Number(i);
            cc.find('Canvas/successGround/word/' + name).stopAllActions();
        }
        //cc.audioEngine.play(window.btnAudio);
        if (window.level == this.max) {
            this.onClickHome();
            this.node.getChildByName('successGround').active = false;
            this.node.getChildByName('gameGround').opacity = 0;
            cc.find('warnWindow').stopAllActions();
            cc.find('warnWindow').getChildByName('warnLabel').getComponent(cc.Label).string = '后续关卡尚未开放。'
            cc.find('warnWindow').opacity = 255;
            cc.find('warnWindow').runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(1)));
            return;
        }
        if (window.level > 9) {
            if (!window.isVip) {
                this.onClickHome();
                this.node.getChildByName('successGround').active = false;
                this.node.getChildByName('gameGround').opacity = 0;
                cc.find('warnWindow').stopAllActions();
                cc.find('vipWindow').active = true;
            }
        }
        this.cancleLock();
        this.onClickReset();
        this.destroyPic();
        this.destroyAll();
        this.removeData();
        window.level++;
        window.t = 0;
        window.changeSize = true;
        window.changeCol = true;
        this.node.getChildByName('gameGround').opacity = 255;
        this.node.getChildByName('successGround').active = false;
        cc.find('Canvas/gameGround/level/num').getComponent(cc.Label).string = window.level;
        window.tip += 2;
        cc.find('Canvas/gameGround/btn_tips/tip/tipNum').getComponent(cc.Label).string = window.tip;
        this.isBtnUseable();
        this.initData();
        window.spriteF = new Array();
        window.spriteF = this.nextSpriteF;
        this.nextSpriteF = new Array();
        this.lastSpriteF = new Array();
        this.initPic();
    },



    update(dt) {
        if (window.isSuccess) {
            window.isSuccess = false;
            this.isHorizTrue();
            this.isVerticalTrue();
            if (window.t == this.nameW.length) {
                cc.find('Canvas/successGround/level/num').getComponent(cc.Label).string = window.level;
                this.passWordUpdate();
                var jump = function () {
                    this.node.getChildByName('gameGround').opacity = 0;
                    this.node.getChildByName('successGround').active = true;
                    this.node.getChildByName('successGround').scale = 0.9;
                    //cc.audioEngine.play(window.successAudio);
                    this.destroyPic();
                    this.node.getChildByName('successGround').runAction(cc.sequence(
                        cc.scaleTo(0.5, 1.1),
                        cc.scaleTo(0.2, 1),
                    ));

                }
                this.scheduleOnce(jump, 0.5);
            }
        }
    },
});

