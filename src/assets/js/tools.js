
var avatar;

export default {

    /**
     * 图片转base64
     */
    imageUrlToBase64: function()
    {
        let image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = require("@/assets/img/avatar/avatar-1.jpg");
        image.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            var quality = 0.8;
            //这里的dataurl就是base64类型
            //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
            avatar = canvas.toDataURL("image/jpeg", quality);
        }
    },

    getAvatar: function()
    {
        return avatar;
    }
}