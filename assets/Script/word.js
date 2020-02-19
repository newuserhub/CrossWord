cc.Class({
    extends: cc.Component,

    properties: {

        canvas: cc.Node,

        word: cc.String,
        isIn: cc.Boolean,
        isCanMove: cc.Boolean,
        isTrue: cc.Boolean,

        childNum: cc.String,

        isLockH: cc.Boolean,
        isLockV: cc.Boolean,

        isFailedH: cc.Boolean,
        isFailedV: cc.Boolean,
    },

    onLoad() {

        this.posx = null;
        this.posy = null;
        this.end = null;
        this.moveS = false;
        this.isSet = true;
        this.isCanMove = true;
        this.oName = null;

        this.backP = false;
        this.moveB = true;
        this.touchend = false;

        this.node.on('touchmove', this.touchMove, this);
        this.node.on('touchend', this.touchEnd, this);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;

    },

    setPos: function () {
        this.prex = this.node.x;
        this.prey = this.node.y;

        this.end = false;
    },

    onDestroy() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        manager.enabledDebugDraw = false;
    },

    touchMove: function (event) {
        if (this.node.isCanMove) {
            if (this.isSet) {
                this.setPos();
                this.node.stopAllActions();
                cc.audioEngine.play(window.dragAudio);
                if (this.node.parent == cc.find('Canvas/gameGround/game')) {
                    this.node.scale = 1.2;
                } else {
                    var pos = event.getLocation();
                    this.node.setPosition(cc.find('Canvas/gameGround/gameC').convertToNodeSpaceAR(pos));
                    //if (!this.node.width == 120) {
                    this.node.width = 120;
                    this.node.height = 120;
                    var s = cc.find('Canvas/gameGround/game').scale + 0.2;
                    this.node.scale = s;
                    // if (this.node.width * s < 160 * 0.9) {
                    //     this.node.width = 160;
                    //     this.node.height = 160;
                    //     this.node.scale = 0.9;
                    // }
                    // } else {
                    //     var s = cc.find('Canvas/gameGround/game').scale + 0.2;
                    //     this.node.scale = s;
                    //     if (this.node.width * s < 160 * 0.9) {
                    //         this.node.width = 120;
                    //         this.node.height = 120;
                    //         this.node.scale = 0.9;
                    //     }
                    // }
                }
                this.isSet = false;
                this.node.isFailedH = false;
                this.node.isFailedV = false;

            }
            var scale = this.node.parent.scaleX;
            if (this.node.parent == cc.find('Canvas/gameGround/gameW')) {
                this.node.setParent(cc.find('Canvas/gameGround/gameC'));
            }

            this.posx = event.getDeltaX() / scale;
            this.posy = event.getDeltaY() / scale;

            this.node.x += this.posx;
            this.node.y += this.posy;
            this.end = false;
        }
    },

    touchEnd: function (event) {
        if (this.node.isCanMove) {
            this.touchend = false;
            this.end = true;
            this.node.scale = 1;
            this.node.width = window.wordSize;
            this.node.height = window.wordSize;
            this.isSet = true;

            this.moveB = true;
            var test = function () {
                if (this.moveB) {
                    this.moveS = false;
                    this.end = false;
                    this.moveB = false;
                    this.isMoveSuccess();
                }
            }

            this.scheduleOnce(test, 0.1);
        }


        // var x = event.getLocationX();
        // var y = event.getLocationY();

        // var game = cc.find('Canvas/gameGround/game');
        // for (let i = 0; i < window.tag.length; i++) {
        //     var name = window.tag[i].x + 'big' + window.tag[i].y;
        //     if (cc.Intersection.pointInPolygon(cc.v2(x, y), game.getChildByName(name).getComponent(cc.BoxCollider).world.points)) {
        //         if(!game.getChildByName(name).isIn){
        //             game.getChildByName(name).isIn = true;
        //             this.node.setParent(game);
        //             this.node.setPosition(game.getChildByName(name).x, game.getChildByName(name).y);
        //             break;
        //         }
        //     } else {
        //         this.node.setParent(cc.find('Canvas/gameGround/gameW'))
        //         this.node.y = 0;
        //     }
        // }
    },

    isMoveSuccess: function () {
        if (this.moveS == false) {
            this.node.x = this.prex;
            this.node.y = this.prey;
            this.setPos();
            this.end = true;

            // if (this.node.parent == cc.find('Canvas/gameGround/game')) {
            //     this.node.width = 120;
            //     this.node.height = 120;
            // }

            // if (this.node.parent == cc.find('Canvas/gameGround/gameC')) {
            //     this.setParent();
            // }
            this.setParent();
        }
        this.moveS = true;
        this.end = false;
    },

    setParent: function () {
        this.node.setParent(cc.find('Canvas/gameGround/gameW'));
        this.node.x = 0
        this.node.y = 0

    },

    onCollisionEnter(other, self) {
        if (this.isCanMove) {
            self = this
            if (other.node.opacity == 0) {
                return;
            } else {
                if (other.tag == 0) {
                    this.e = other.node.name;
                } else {
                    this.e = other.node.name;
                }
                if (other.node.isIn) {
                    return;
                } else {
                    //self.node.isIn = true;
                }
            }
        }
    },

    onCollisionStay: function (other, self) {
        if (this.isCanMove) {
            if (other.tag == 1) {

                if (this.end) {
                    this.s = other.node.name;
                    if (this.e == this.s) {
                        if (other.node.opacity > 0) {
                            if (other.node.isIn == false) {
                                this.oName = other.node.name;
                                this.node.setParent(other.node.parent);
                                if (self.node.parent == cc.find('Canvas/gameGround/game')) {
                                    self.node.width = 120;
                                    self.node.height = 120;
                                } else if (self.node.parent == cc.find('Canvas/gameGround/gameW')) {
                                    self.node.width = window.wordSize;
                                    self.node.height = window.wordSize;
                                }
                                this.node.setPosition(other.node.x, other.node.y);
                                other.node.isIn = true;
                                //other.node.getChildByName('or').getComponent(cc.Label).string = 'true';
                                self.node.isIn = true;
                                //self.node.getChildByName('or').getComponent(cc.Label).string = 'true';
                                this.moveS = true;
                                this.setPos();
                                this.end = false;
                                this.moveB = false;
                                if (other.node._objFlags == this.node.getChildByName('wordL').getComponent(cc.Label).string) {
                                    window.t += 1;
                                    other.node.isTrue = true;
                                    other.node.getChildByName('or').getComponent(cc.Label).string = 'true';
                                    if (self.node.isCanMove) {
                                        cc.audioEngine.play(window.placeAudio);
                                    }
                                }
                                window.isSuccess = true;
                            } else {
                                this.moveS = false;
                                this.end = false;
                                this.moveB = false;
                                this.isMoveSuccess();
                            }
                        } else {
                            this.moveS = false;
                            this.end = false;
                            this.moveB = false;
                            this.isMoveSuccess();
                        }
                    } else {
                        this.moveS = false;
                        this.end = false;
                        this.moveB = false;
                        this.isMoveSuccess();
                    }
                    //}
                }
            }
            if (other.tag == 2) {
                if (this.end) {
                    this.node.setParent(other.node);
                    if (self.node.parent == cc.find('Canvas/gameGround/game')) {
                        self.node.width = 120;
                        self.node.height = 120;
                    } else if (self.node.parent == cc.find('Canvas/gameGround/gameW')) {
                        self.node.width = window.wordSize;
                        self.node.height = window.wordSize;
                    }
                    self.node.isIn = true;
                    self.node.y = 0;
                    //self.node.getChildByName('or').getComponent(cc.Label).string = 'true';
                    this.end = false;
                    this.moveB = false;
                    this.setParent();
                }
            }
            if (other.tag == 3) {
                if (this.end) {
                    this.moveS = false;
                    this.end = false;
                    this.moveB = false;
                    this.isMoveSuccess();
                }
            }
        }
    },

    onCollisionExit: function (other, self) {
        if (this.isCanMove) {
            if (other.node.opacity == 0) {
                return;
            } else {
                if (other.node.isIn) {
                    if (self.node.isIn) {
                        if (!other.node.isTrue) {
                            other.node.isIn = false;
                            other.node.getChildByName('or').getComponent(cc.Label).string = 'false';
                            self.node.isIn = false;
                            self.node.getChildByName('or').getComponent(cc.Label).string = 'false';
                            if (other.node._objFlags == this.node.getChildByName('wordL').getComponent(cc.Label).string) {
                                window.t -= 1;
                                window.isSuccess = true;
                                other.node.isTure = false;
                                other.node.getChildByName('or').getComponent(cc.Label).string = 'false';
                            }
                            self.node.isTrue = true;
                            self.node.isFailedV = false;
                            self.node.isFailedH = false;
                            this.updataFalse();
                        }
                    }
                }
            }
        }
    },

    updataFalse: function () {
        let self = this;
        if (self.isTrue) {
            self.node.getChildByName('wordL').color = new cc.color(255, 255, 255);
            self.node.getChildByName('false').active = false;
        }
    },
});
