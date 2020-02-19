cc.Class({
    extends: cc.Component,

    properties: {

        word: cc.Node,
        big: cc.Node,

        game: cc.Node,

    },

    onLoad() {

        this.JSON = [
            //第一关
            { 'level': 1, 'x': 2, 'y': 2, 'name': 'A', 'group': 1 },
            { 'level': 1, 'x': 2, 'y': 3, 'name': 'P', 'group': 1 },
            { 'level': 1, 'x': 2, 'y': 4, 'name': 'P', 'group': 1 },
            { 'level': 1, 'x': 2, 'y': 5, 'name': 'L', 'group': 1 },
            { 'level': 1, 'x': 2, 'y': 6, 'name': 'E', 'group': 1 },
            { 'level': 1, 'x': 3, 'y': 3, 'name': 'L', 'group': 2 },
            { 'level': 1, 'x': 3, 'y': 5, 'name': 'E', 'group': 3 },
            { 'level': 1, 'x': 4, 'y': 3, 'name': 'A', 'group': 2 },
            { 'level': 1, 'x': 4, 'y': 5, 'name': 'G', 'group': 3 },
            { 'level': 1, 'x': 5, 'y': 3, 'name': 'N', 'group': 2 },
            { 'level': 1, 'x': 6, 'y': 3, 'name': 'E', 'group': 2 },
            //第二关
            { 'level': 2, 'x': 2, 'y': 2, 'name': 'A', 'group': 1 },
            { 'level': 2, 'x': 2, 'y': 3, 'name': 'P', 'group': 1 },
            { 'level': 2, 'x': 2, 'y': 4, 'name': 'P', 'group': 1 },
            { 'level': 2, 'x': 2, 'y': 5, 'name': 'L', 'group': 1 },
            { 'level': 2, 'x': 2, 'y': 6, 'name': 'E', 'group': 1 },
            { 'level': 2, 'x': 3, 'y': 3, 'name': 'E', 'group': 2 },
            { 'level': 2, 'x': 4, 'y': 3, 'name': 'N', 'group': 2 },
        ]

        this.JSON2 = [
            //第一关
            { 'level': 1, 'name': 'A' }, { 'level': 1, 'name': 'A' }, { 'level': 1, 'name': 'E' }, { 'level': 1, 'name': 'E' },
            { 'level': 1, 'name': 'E' }, { 'level': 1, 'name': 'G' }, { 'level': 1, 'name': 'L' }, { 'level': 1, 'name': 'L' },
            { 'level': 1, 'name': 'N' }, { 'level': 1, 'name': 'P' }, { 'level': 1, 'name': 'P' },
            //第二关
            { 'level': 2, 'name': 'A' }, { 'level': 2, 'name': 'E' }, { 'level': 2, 'name': 'E' }, { 'level': 2, 'name': 'L' },
            { 'level': 2, 'name': 'N' }, { 'level': 2, 'name': 'P' }, { 'level': 2, 'name': 'P' },
        ]

        this.w = 4;
        this.x = 3

        this.posX = new Array();
        this.posY = new Array();
        this.nameB = new Array();
        this.group = new Array();
        this.max = 0;

        this.nameW = new Array();
    },

    start() {

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 12; j++) {
                var name = 'big' + i + j;
                this.game.addChild(cc.instantiate(this.big), this.x, name);
                this.game.getChildByName(name).setPosition(60 + i * 120, -60 - j * 120);
                this.game.getChildByName(name).isIn = false;
                this.game.getChildByName(name).opacity = 0;
                this.w++
                this.x++
            }
        }


        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 3; j++) {
                var name = 'word' + i + j;
                this.node.addChild(cc.instantiate(this.big), this.x, name);
                this.node.getChildByName(name).setPosition(-480 + i * 120, -660 - j * 120);
                this.node.getChildByName(name).isIn = false;
                this.node.getChildByName(name).opacity = 0.1;
                this.x++;
                this.w++;
            }
        }

        this.initChapter();
        this.initWord();
    },

    initChapter: function () {
        var j = 0;
        for (let i = 0; i < this.JSON.length; i++) {
            if (this.JSON[i].level == window.level) {
                this.posX[j] = this.JSON[i].x;
                this.posY[j] = this.JSON[i].y;
                this.nameB[j] = this.JSON[i].name;
                this.group[j] = this.JSON[i].group;
                j++;
            }
        }

        for (let i = 0; i < this.posX.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            var name = 'big' + x + y;
            this.game.getChildByName(name)._objFlags = this.nameB[i];
            this.game.getChildByName(name).opacity = 255;
        }

    },

    initWord: function () {
        var k = 0
        for (let i = 0; i < this.JSON2.length; i++) {
            if (this.JSON2[i].level == window.level) {
                this.nameW[k] = this.JSON2[i].name;
                k++;
            }
        }

        for (let i = 0; i < this.nameW.length; i++) {
            var name = this.nameW[i] + i + window.level;
            this.node.addChild(cc.instantiate(this.word), this.w, name);
            this.node.getChildByName(name).active = true;
            this.node.getChildByName(name).getChildByName('wordL').active = true;
            this.node.getChildByName(name).getChildByName('wordL').getComponent(cc.Label).string = this.nameW[i];
            if (i < 9) {
                this.node.getChildByName(name).setPosition(-480 + i * 120, -660);
            } else {
                this.node.getChildByName(name).setPosition(-480 + (i - 9) * 120, -780);
            }
        }
        this.w++;
    },

    destroyAll: function () {
        for (let i = 0; i < this.posX.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            var name = 'big' + x + y;
            this.game.getChildByName(name)._objFlags = null;
            this.game.getChildByName(name).opacity = 0;
        }

        for (let i = 0; i < this.nameW.length; i++) {
            var name = this.nameW[i] + i + window.level;
            if (cc.find('Canvas/gameGround/' + name)) {
                cc.find('Canvas/gameGround/' + name).active = false;
            } else {
                this.node.getChildByName(name).removeFromParent(this.node);
            }
        }
    },

    onClickReset: function () {
        for (let i = 0; i < this.nameW.length; i++) {
            var name = this.nameW[i] + i + window.level;
            if (cc.find('Canvas/gameGround/' + name)) {
                cc.find('Canvas/gameGround/' + name).setParent(this.node);
                if (i < 9) {
                    this.node.getChildByName(name).setPosition(-480 + i * 120, -660);
                } else {
                    this.node.getChildByName(name).setPosition(-480 + (i - 9) * 120, -780);
                    this.node.getChildByName(name).isIn = false;
                }
                for (let i = 0; i < this.posX.length; i++) {
                    var x = this.posX[i];
                    var y = this.posY[i];
                    var name1 = 'big' + x + y;
                    this.game.getChildByName(name1).isIn = false;
                }
            }
        }
        window.t = 0;
    },

    onClickTips: function () {
        for (let i = 0; i < this.posX.length; i++) {
            var x = this.posX[i];
            var y = this.posY[i];
            var name1 = 'big' + x + y;
            if (this.game.getChildByName(name1).isIn == false) {
                for (let j = 0; j < this.nameW.length; j++) {
                    var name2 = this.nameW[j] + j + window.level;
                    if (cc.find('Canvas/' + name2)) {
                        if (this.nameB[i] == this.node.getChildByName(name2).getChildByName('wordL').getComponent(cc.Label).string) {
                            this.game.getChildByName(name1).isIn = true;
                            this.node.getChildByName(name2).isIn = true;
                            this.node.getChildByName(name2).setParent(this.game);
                            this.game.getChildByName(name2).setPosition(this.game.getChildByName(name1).x, this.game.getChildByName(name1).y);
                            window.isSuccess = true;
                            window.t++;
                            return;
                        }
                    }
                }
            }
        }
    },

    onClickNext: function () {
        this.onClickReset();
        this.destroyAll();
        window.level++;
        this.posX = new Array();
        this.posY = new Array();
        this.nameB = new Array();
        this.nameW = new Array();
        this.initChapter();
        this.initWord();
    },

    onClickBack: function () {
        this.onClickReset();
        this.destroyAll();
        window.level--;
        this.posX = new Array();
        this.posY = new Array();
        this.nameB = new Array();
        this.nameW = new Array();
        this.initChapter();
        this.initWord();
    },




    update(dt) {
        if (window.isSuccess) {
            if (window.t == this.nameW.length) {
                cc.log('success');
            }
            window.isSuccess = false;
        }

        // for (let i = 0; i < this.group.length; i++) {
        //     if (this.group[i] > this.max) {
        //         this.max = this.group[i]
        //     }
        // }

        // for (let i = 0; i < this.max; i++) {
        //     for (let i = 0; i < this.posX.length; i++) {
        //         var x = this.posX[i];
        //         var y = this.posY[i];
        //         var name = 'big' + x + y;
        //         if (i == this.group[i]) {
        //             if (this.game.getChildByName(name).isTrue == true) {

        //             } else {
        //                 return;
        //             }
        //         }
        //         cc.log('success');
        //     }
        // }
    },
});
