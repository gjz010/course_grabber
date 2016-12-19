// ==UserScript==
// @name        shuake
// @namespace   gjz010
// @include     http://zhjwxk.cic.tsinghua.edu.cn/xkBks.vxkBksXkbBs.do
// @version     1
// @grant       none
// ==/UserScript==
//alert("b");
//自带屏蔽alert和confirm功能
window.alert=console.log;
window.confirm=function(str){
  console.log(str);
  return true;
  
};
//jQuery.noConflict();
$(function(){
  console.log("starting...");
  var storage=window.localStorage;
  var classes;
  if(storage["classes"]==undefined){
    console.log("initializing...");
    //要改的话自己delete window.localStorage.classes 
      classes=[
      {sem:"2016-2017-2",cid:"30240343",sid:"0",done:false}
    
      ];
  storage["classes"]=JSON.stringify(classes);
  }else{
    console.log("old data detected!loading old data...");
    classes=JSON.parse(storage["classes"]);
  }
  classes.forEach(function(clazz){
    jQuery("#frm_sy").append
    ('<input name="p_rx_id" value="'+clazz.sem+';'+clazz.cid+';'+clazz.sid+';" type="checkbox" checked="checked">');
  });
  window.setTimeout(function(){
        var frm=window.document.frm;
        frm.m.value="saveRxKc";
        frm.submit();
  },3000);

});
