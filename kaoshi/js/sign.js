$(function(){
    //登录验证
    submitData();


    //弹框关闭隐藏
    var $model = $(".model");
    $model.find(".a1").click(function(){
        $model.removeClass("model-show");
    });
    $model.click(function(e){
        var drag = $(".content"),
            dragel = $(".content")[0],
            target = e.target;
        if (dragel !== target && !$.contains(dragel, target)) {
            $model.removeClass("model-show");
        }
    });
})






//提交时验证表单
function submitData(form_selector="form") {
    $(form_selector).submit(function () {
        var bool = true;

        $(this).find("input[name]").each(function (i, e) {
            if (!validite($(e))) {
                bool = false;
            }
        })
        

        if(bool){
              // ajax ...
        }
        return bool;
    });
}





//传过来一个元素，就对这个元素进行验证
function validite($dom) {
    var flag = true;
    var n = $dom.attr("name");
    var v = $dom.val();
    var $s = $(".model");

    //验证未通过时样式
    var err_style = function () {
        $s.addClass("model-show");
        flag = false;
    }

    //验证通过时样式
    var ok_style = function () {
        $s.removeClass("model-show");
        flag = true;
    }

    //验证
    switch (n) {
        
        case "usename":
            if (v == "") {
                err_style();
              
            } else {
                ok_style();
            }
            break;
        case "password":
            if (v == "") {
                err_style();
            } else {
                ok_style();
            }
            break;

        default:
            break;
    }
    return flag;
}
