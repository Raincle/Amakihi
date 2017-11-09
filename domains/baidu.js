// ==UserScript==
// @name         Amakihi for Baidu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Give You a Purification of Baidu!
// @author       Hong
// @match        https://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    !function (ob) {
        ob.hookAjax = function (funs) {
            window._ahrealxhr = window._ahrealxhr || XMLHttpRequest;
            XMLHttpRequest = function () {
                this.xhr = new window._ahrealxhr;
                for (var attr in this.xhr) {
                    var type = "";
                    try {
                        type = typeof this.xhr[attr];
                    } catch (e) {}
                    if (type === "function") {
                        this[attr] = hookfun(attr);
                    } else {
                        Object.defineProperty(this, attr, {
                            get: getFactory(attr),
                            set: setFactory(attr)
                        });
                    }
                }
            };

            function getFactory(attr) {
                return function () {
                    return this.hasOwnProperty(attr + "_")?this[attr + "_"]:this.xhr[attr];
                };
            }

            function setFactory(attr) {
                return function (f) {
                    var xhr = this.xhr;
                    var that = this;
                    if (attr.indexOf("on") !== 0) {
                        this[attr + "_"] = f;
                        return;
                    }
                    if (funs[attr]) {
                        xhr[attr] = function () {
                            funs[attr](that) || f.apply(xhr, arguments);
                        };
                    } else {
                        xhr[attr] = f;
                    }
                };
            }

            function hookfun(fun) {
                return function () {
                    var args = [].slice.call(arguments);
                    if (funs[fun] && funs[fun].call(this, args, this.xhr)) {
                        return;
                    }
                    return this.xhr[fun].apply(this.xhr, args);
                };
            }
            return window._ahrealxhr;
        };
        ob.unHookAjax = function () {
            if (window._ahrealxhr)  XMLHttpRequest = window._ahrealxhr;
            window._ahrealxhr = undefined;
        };
    }(window);
    
    hookAjax({
        //hook callbacks
        onreadystatechange:function(xhr){
            switch(xhr.readyState){
                case 1://OPENED
                    //do something
                    break;
                case 2://HEADERS_RECEIVED
                    //do something
                    break;
                case 3://LOADING
                    //do something
                    break;
                case 4://DONE
                    //do something
                    var url = xhr.responseURL;
                    var data = JSON.parse(xhr.response);
                    break;
            }
        }
    });
    
    $("#u, #u1, #lg, .qrcodeCon, #ftCon").remove();
    $("#result_logo").css("opacity", 0);
    document.title = "搜索";
    $("#su").val("搜索");
})();
