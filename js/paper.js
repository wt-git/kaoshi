$(function () {


    // 弹框-退出考试系统
    $(".icon-shangchuan").click(function () {
        addHtml("确认退出考试系统？");
    });

    // 弹框-交卷表单提交
    $(".nav-r").on('click', function () {
        var $form = $("#qus");
        var form_data = $form.serializeArray();
        var arr_len;

        //获取总题数
        var all_paper = $(".nav-l .r").data("all");


        var _arr = '';
        for (let elem of form_data.values()) {
            _arr += elem.name + ",";
        }
        var new_arr = _arr.substring(0, _arr.length - 1).split(",");
        var _len = [...new Set(new_arr)].length;

        console.log(all_paper);

        if (_len != all_paper) {
            addHtml("您还有题未答完，确认交卷？");
        } else {
            //提交表单
            $form.submit();
        }

    });

    // ----------
    var $catalog = $(".catalog");

    // 开启弹框-考试目录选择
    $(".icon-mulu,.nav-l").click(function () {
        $catalog.stop().animate({
            "right": "0"
        }, 100);
    });


    //弹框关闭隐藏-考试目录选择
    $catalog.find(".item>div").click(function () {
        $catalog.stop().animate({
            "right": "-100%"
        }, 100);
    });

    $catalog.click(function (e) {
        var drag = $(".catalog-content"),
            dragel = $(".catalog-content")[0],
            target = e.target;
        if (dragel !== target && !$.contains(dragel, target)) {
            $catalog.stop().animate({
                "right": "-100%"
            }, 100);
        }
    });

    //---------------------


    // 倒计时
    var timer = 10;

    var timeText = function () {
        var ts = sec_to_time(timer);
        var $t = $(".time");


        //倒计时完毕
        if (timer < 0) {
            clearInterval(timeText);
        } else {
            $t.text(ts.h + ":" + ts.m + ":" + ts.s);
            timer--;
        }
    }
    setInterval(timeText, 1000);

    //-----侧滑效果
    touchPage();

    function next() {
        console.log("左滑");
        // ajax...
    }

    function prev() {
        console.log("右滑");
        // ajax...
    }



    function touchPage(selector = ".study") {
        var $carousels = $(selector);
        var startX, endX;
        var offset = 50;
        var timeoutflag = null;

        $carousels.on('touchstart', function (e) {
            startX = e.originalEvent.touches[0].clientX;
        });

        $carousels.on('touchmove', function (e) {
            endX = e.originalEvent.touches[0].clientX;

            if (timeoutflag != null) {
                clearTimeout(timeoutflag);
            }
            timeoutflag = setTimeout(function () {
                var distance = Math.abs(startX - endX);
                if (distance > offset) {
                    startX > endX ? next() : prev();
                }
            }, 100);

        });

    }






});











function addHtml(text) {
    $("body").append(template(text));

    var $model = $(".model");

    //弹框关闭
    $model.find(".a1").on('click', function () {
        //确定
        $model.remove();
    });
    $model.find(".a2").on('click', function () {
        //取消
        $model.remove();
    });
    $model.on('click', function (e) {
        //点击遮罩
        var drag = $(".content"),
            dragel = $(".content")[0],
            target = e.target;
        if (dragel !== target && !$.contains(dragel, target)) {
            $model.remove();
        }
    });
}

function template(text) {
    return `
            <div class="model">
            <div class="content">

                <div class="title">
                    <i class="iconfont icon-gantan"></i>
                    <span>${text}</span>
                </div>
                <div class="bottom">
                    <a class="a1" href="javascript:;">确定</a>
                    <a class="a2" href="javascript:;">取消</a>
                </div>

            </div>
        </div>
    
    
    `;
}

function sec_to_time(s) {
    var o = {};
    if (s > -1) {
        var day = Math.floor(s / (3600 * 24));
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;

        o.d = formatZero(o.d, day);
        o.h = formatZero(o.h, hour);
        o.m = formatZero(o.m, min);
        o.s = formatZero(o.s, sec);
    } else if (s == 0) {

        o.d = 0;
        o.h = 0;
        o.m = 0;
        o.s = 0;
    }
    return o;
}

function formatZero(obj, times) {
    if (times < 10) {
        obj = '0' + times;
    } else {
        obj = times;
    }

    return obj;
}