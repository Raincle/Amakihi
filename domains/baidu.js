// ==UserScript==
// @name         Amakihi for Baidu
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Give You a Purification of Baidu!
// @author       Hong
// @match        https://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // 首页
    $("#u, #u1, #lg, .qrcodeCon, #ftCon").remove();
    // 搜索结果页
    $("#content_right, #foot").remove();
    $("#result_logo").css("opacity", 0);
    document.title = "搜索";
    $("#su").val("搜索");
})();
