
cc.Class({
    extends: cc.Component,

    properties: {

        tag: cc.Node,

    },

    onLoad() { },

    start() {

    },

    update(dt) {
        if (window.changeSize) {
            this.node.width = this.tag.width;
            this.node.herght = this.tag.height;
            this.node.x = this.tag.x;
            this.node.y = this.tag.y;
            window.changeSize = false;
        }

    },
});
