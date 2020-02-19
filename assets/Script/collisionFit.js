
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.col = this.node.getComponent(cc.Collider);
    },

    start() {

    },

    update(dt) {
        if(window.changeCol){
            this.col.size.width = this.node.width;
            this.col.size.height = this.node.height;
            window.changeCol = false;
        }
    },
});
