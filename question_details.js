$(function () {
    var tagUrl = window.location.search
    /*获取请求参数*/
    var type = new Utils().getQueryString(tagUrl, 'type')
    var id = new Utils().getQueryString(tagUrl, 'id')
    //类型 1为分享，2为回答，3为资讯 ，4为问题
    switch (parseInt(type)) {
        case 1:
            document.title = "分享详情";
            break
        case 2:
            document.title = "回答详情";
            break
        case 3:
            document.title = "资讯详情";
            break
        case 4:
            document.title = "问题详情";
            break
    }
    var time = new Utils().MyTimeFromat(new Date().getTime(), 'yyyy-MM-dd HH:mm')
    var vm = new Vue({
        el: '#app',
        data: {
            title: "淘宝生意怎么做？",
            nick: "安晓美",
            headerUrl: "http://tse2.mm.bing.net/th?id=OIP.y91Dn5xlrCnzgMGWsXCypAEsEs&w=199&h=199&c=7&qlt=90&o=4&dpr=2&pid=1.7",
            job: "掌柜",
            time: time,
            view: 300,
            collect: 13,
            praise: 32,
            contents: [],
        },
        methods: {
            downLoad: function () {  // 下载apk
                // 当前窗口打开
                // window.location.href = 'http://www.zhangguishuo.net/home/index/getapk?uuid=-1'
                //  新开窗口打开
                // window.open('http://www.zhangguishuo.net/home/index/getapk?uuid=-1', '_blank');
                alert('test startApp')
                startApp()
            },
            getTime: function (timeline) {
                return "";
            },
            getWidth: function () {
                var width = $('container_content_img').width();
                console.log(width)
                return 10;
            },
            replaceAll: function (str, s1, s2) {
                return str.replace(new RegExp(s1, "gm"), s2);
            },
            getContentText: function (text) {
                var text = this.replaceAll(text, '\n', '<br>');
                var fdStart = text.indexOf('<br>');
                if (fdStart == 0) {
                    //去掉头部的 br 换行
                    text = text.replace('<br>', '');
                }
                return text;
            },
            reLoad: function () {
                console.log("加载")
                // 重新加载
                $('.load').css({display: 'block'});
                $('.loading').css({display: 'block'});
                $('.loadFaild').css({display: 'none'});
                console.log(id + "," + type)
                this.$http.post(
                    new Urls().question_details,
                    {id: id, type: type},
                    {emulateJSON: true}
                ).then(function (response) {
                    $('.load').css({display: 'none'});
                    var data = response.data;
                    if (data.errcode == 0) {
                        this.title = data.data.title;
                        this.nick = data.data.nick;
                        this.headerUrl = data.data.icon;
                        this.job = data.data.identity;
                        this.praise = data.data.praise;
                        this.view = data.data.view;
                        this.collect = data.data.collect;
                        this.time = new Utils().MyTimeFromat(data.data.time * 1000, 'yyyy-MM-dd HH:mm')
                        var texts = data.data.content;
                        this.contents = JSON.parse(texts);
                    } else {
                        this.loadFaild();
                    }
                }, function (response) {
                    console.log("加载失败")
                    //请求失败
                    this.loadFaild();
                });
            },
            loadFaild: function () {
                $('.load').css({display: 'block'});
                $('.loadFaild').css({display: 'block'});
                $('.loading').css({display: 'none'});
            }
        },
        mounted: function () {
            // 加载数据
            this.reLoad()
            console.log("开始加载")
            //
        },
    });
});
