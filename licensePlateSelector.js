
/**
 * 基于jquery 移动端H5 车牌选择器
 * author: pxsgdsb
 * gitee: 
 * github: 
 */

; (function ($) {
    function LicensePlateSelector() {
        // 输入框元素
        this.input_dom = `<ul class="plate_input_box">
            <li class="territory_key" data-type="territory_key"></li>
            <li style="margin-right:.8rem;"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li data-end="end"></li>
            <li data-cls="new_energy" data-end="end" class="new_energy">
                <span>新能源</span>
            </li>
        </ul>`
        // 键盘元素
        this.keyboard_dom = `
        <!--地域键盘 -->
        <div class="territory_keyboard">
            <div class="top">
                <span>关闭</span>
            </div>
            <ul class="keys">
                <li>京</li>
                <li>津</li>
                <li>沪</li>
                <li>渝</li>
                <li>蒙</li>
                <li>新</li>
                <li>藏</li>
                <li>宁</li>
                <li>桂</li>
                <li>黑</li>
                <li>吉</li>
                <li>辽</li>
                <li>晋</li>
                <li>冀</li>
                <li>青</li>
                <li>鲁</li>
                <li>豫</li>
                <li>苏</li>
                <li>皖</li>
                <li>浙</li>
                <li>闽</li>
                <li>赣</li>
                <li>湘</li>
                <li>鄂</li>
                <li>粤</li>
                <li>琼</li>
                <li>甘</li>
                <li>陕</li>
                <li>贵</li>
                <li>云</li>
                <li>川</li>
            </ul>
        </div>
        <!--字母键盘 -->
        <div class="alphabet_keyboard">
            <div class="top">
                <span>关闭</span>
            </div>
            <ul class="keys">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>0</li>
                <li>Q</li>
                <li>W</li>
                <li>E</li>
                <li>R</li>
                <li>T</li>
                <li>Y</li>
                <li>U</li>
                <li>P</li>
                <li>A</li>
                <li>S</li>
                <li>D</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>Z</li>
                <li>X</li>
                <li>C</li>
                <li>V</li>
                <li>B</li>
                <li>N</li>
                <li>M</li>
                <li>警</li>
                <li>港</li>
                <li>澳</li>
                <li>学</li>
                <li class="del">删除</li>
            </ul>
        </div>`
        this.elemDom;
    }

    /**
     * 初始化 车牌选择器
     * @param {string} config.elem  元素
     * @param {string} config.value  默认填充车牌
     * @param {number} config.activeIndex   默认选中下标 (从0开始)
     * @param {function} inputCallBack  输入事件回调
     * @param {function} deleteCallBack  键盘删除事件回调
     * @param {function} closeKeyCallBack  关闭键盘事件回调
     */
    LicensePlateSelector.prototype.init = function (config) {
        config = {
            elem: config.elem,
            value: config.value || "",
            activeIndex: config.activeIndex || false,
            inputCallBack: config.inputCallBack || false,
            deleteCallBack: config.deleteCallBack || false,
            closeKeyCallBack: config.closeKeyCallBack || false,
        }
        this.elemDom = $(config.elem);
        this.elemDom.append(this.input_dom);
        this.elemDom.append(this.keyboard_dom);
        this.watchKeyboardEvents(function(val){
            // 键盘输入回调
            if(config.inputCallBack){
                config.inputCallBack(val);
            }
        },function(){
            // 键盘删除事件回调
            if(config.deleteCallBack){
                config.deleteCallBack();
            }
        },function(){
            // 关闭键盘事件回调
            if(config.closeKeyCallBack){
                config.closeKeyCallBack();
            }
        }) // 监听键盘事件
        // 输入默认车牌
        if (config.value) {
            this.elemDom.find(".plate_input_box li").each(function (index) {
                if (config.value[index]) {
                    $(this).text(config.value[index])
                }
            })
        }
        // 选中默认下标
        if(config.activeIndex){
            this.elemDom.find(".plate_input_box li").eq(config.activeIndex).click();
        }
    };


    /**
     * 获取车牌
     */
    LicensePlateSelector.prototype.getValue = function () {
        let plate_number = ""
        this.elemDom.find(".plate_input_box li").each(function () {
            if ($(this).find("span").length == 0) {
                plate_number += $(this).text()
            }
        })
        return plate_number;
    }

    /**
     * 设置车牌
     */
    LicensePlateSelector.prototype.setValue = function (plate_number) {
        this.elemDom.find(".plate_input_box li").each(function (index) {
            if (index == 7) {
                if(plate_number[index]){
                    $(this).removeClass("new_energy").attr("data-cls","")
                    $(this).html(plate_number[index])
                }
            }else{
                $(this).text(plate_number[index] || '')
            }
        })
    }

    /**
     * 清空车牌
     */
    LicensePlateSelector.prototype.clearValue = function () {
        this.elemDom.find(".plate_input_box li").each(function (index) {
            if(index==7){
                $(this).html("<span>新能源</span>").attr("data-cls","new_energy").attr("class","new_energy")
            }else{
                $(this).text("")
            }
        })
    }

    /**
     * 监听键盘输入
     * @param {function} inputCallBack  输入事件回调
     * @param {function} deleteCallBack  键盘删除事件回调
     * @param {function} closeKeyCallBack  关闭键盘事件回调
     */
    LicensePlateSelector.prototype.watchKeyboardEvents = function(inputCallBack,deleteCallBack,closeKeyCallBack) {
        let _this = this
        // 输入框点击
        _this.elemDom.find(".plate_input_box li").click(function (event) {
            // 显示边框
            $(".plate_input_this").removeClass("plate_input_this");
            $(this).addClass("plate_input_this")
            // 弹出键盘
            // 关闭别的键盘
            $(".territory_keyboard").css("display","none")
            $(".alphabet_keyboard").css("display","none")
            if ($(this).attr("data-type") && $(this).attr("data-type") == "territory_key") {
                if (_this.elemDom.find(".territory_keyboard").css("display") == "none") {
                    _this.elemDom.find(".alphabet_keyboard").animate({ bottom: "-50rem" }).hide()
                    _this.elemDom.find(".territory_keyboard").show().animate({ bottom: 0 })
                }
            } else {
                if (_this.elemDom.find(".alphabet_keyboard").css("display") == "none") {
                    _this.elemDom.find(".territory_keyboard").animate({ bottom: "-50rem" }).hide()
                    _this.elemDom.find(".alphabet_keyboard").show().animate({ bottom: 0 })
                }
            }
            // 点击新能源
            if ($(this).attr("data-cls") == "new_energy") {
                $(this).empty().removeClass("new_energy").attr("data-cls", "")
            }
            event.stopPropagation();    //  阻止事件冒泡
        })

        // 地域键盘输入事件
        _this.elemDom.find(".territory_keyboard .keys li").click(function (event) {
            let val = $(this).text()
            _this.elemDom.find(".plate_input_this").text(val)
            _this.elemDom.find(".plate_input_this").next().click()
            if(inputCallBack){
                inputCallBack(val)
            }
            event.stopPropagation();    //  阻止事件冒泡
        })
        // 关闭地域键盘
        _this.elemDom.find(".territory_keyboard .top span").click(function () {
            _this.elemDom.find(".territory_keyboard").animate({ bottom: "-50rem" }).hide()
            if(closeKeyCallBack){
                closeKeyCallBack()
            }
        })

        // 字母键盘输入事件
        _this.elemDom.find(".alphabet_keyboard .keys li").click(function (event) {
            // 点击删除
            if ($(this).attr("class") == "del") {
                let plate_input_this = _this.elemDom.find(".plate_input_this")
                if(plate_input_this.text()){
                    _this.elemDom.find(".plate_input_this").text("")
                }else{
                    _this.elemDom.find(".plate_input_this").prev().text("").click()
                }
                let new_energy = _this.elemDom.find(".plate_input_box li").eq(7);
                if(!new_energy.hasClass("plate_input_this") && !new_energy.attr("data-cls")){
                    new_energy.attr("data-cls","new_energy").addClass("new_energy").append("<span>新能源</span>")
                }
                if(deleteCallBack){
                    deleteCallBack()
                }
                event.stopPropagation();    //  阻止事件冒泡
                return
            }
            // 输入
            let val = $(this).text()
            _this.elemDom.find(".plate_input_this").text(val)
            if (_this.elemDom.find(".plate_input_this").attr("data-end") == "end") {
                _this.elemDom.find(".alphabet_keyboard").animate({ bottom: "-50rem" }).hide()
                if(closeKeyCallBack){
                    closeKeyCallBack()
                }
            } else {
                _this.elemDom.find(".plate_input_this").next().click()
            }
            if(inputCallBack){
                inputCallBack(val)
            }
            event.stopPropagation();    //  阻止事件冒泡
        })
        // 关闭字母键盘
        _this.elemDom.find(".alphabet_keyboard .top span").click(function () {
            _this.elemDom.find(".alphabet_keyboard").animate({ bottom: "-50rem" }).hide()
            if(closeKeyCallBack){
                closeKeyCallBack()
            }
        })

        $("body").click(function () {
            _this.elemDom.find(".territory_keyboard").animate({ bottom: "-50rem" }).hide()
            _this.elemDom.find(".alphabet_keyboard").animate({ bottom: "-50rem" }).hide()
            if(closeKeyCallBack){
                closeKeyCallBack()
            }
        })

        _this.elemDom.find(".territory_keyboard").click(function (event) {
            event.stopPropagation();
        })
        _this.elemDom.find(".alphabet_keyboard").click(function (event) {
            event.stopPropagation();
        })
        
    }

    if (!window.LicensePlateSelector) {
        window.LicensePlateSelector = LicensePlateSelector;
    }
})(jQuery);