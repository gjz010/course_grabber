// ==UserScript==
// @name        shuake
// @namespace   gjz010
// @include     http://zhjwxk.cic.tsinghua.edu.cn/xkBks.vxkBksXkbBs.do
// @require     http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js
// @version     1
// @grant       none
// ==/UserScript==
//alert("b");
jQuery.noConflict();
jQuery(function(){
  //alert("a");
  console.log("starting...");
  var storage=window.localStorage;
  var classes;
  if(storage["classes"]==undefined){
    console.log("initializing...");
    classes=/*[
    {cid:"00690672",sid:"90",done:false},
    {cid:"00691223",sid:"90",done:false},
    {cid:"00120181",sid:"90",done:false},
    {cid:"00140122",sid:"90",done:false},
    {cid:"00700302",sid:"90",done:false},
    {cid:"00700852",sid:"90",done:false},
    {cid:"00680042",sid:"90",done:false},
    {cid:"01510162",sid:"90",done:false},
  ];*/
      classes=[{cid:"04100012",sid:"90",done:false}];
  storage["classes"]=JSON.stringify(classes);
  }else{
    console.log("old data detected!loading old data...");
    classes=JSON.parse(storage["classes"]);
  }
  var cid=jQuery("#p_kch").val();
  var current;
  classes.forEach(function(clazz){
    console.log(clazz);
    if(clazz.cid==cid){
      if(clazz.done){
        current=null;
        alert("该课程已选上！");
        return;
      }
      else{current=clazz;}
    }
  });
  if(current==null) return;
  if(current==undefined){
    alert("找不到待选课信息！");
    return;
  }
  console.log(current);
  var table=jQuery("#table_t");
  var tbody=jQuery(table.children()[0]);
  var trs=tbody.children();
  for(i=0;i<trs.length;i++){
    tr=jQuery(trs[i]);
    subid=jQuery(jQuery(tr.children()[2]).children()[0]).html();
    if(subid==current.sid){
      remain=jQuery(jQuery(tr.children()[4]).children()[0]).html();
      if(remain>0){
        jQuery(jQuery(tr.children()[0]).children()[0]).attr("checked","checked");
        current.done=true;
        storage["classes"]=JSON.stringify(classes);
        var frm=window.document.frm;
        frm.m.value="saveRxKc";
        frm.submit();

      }else{
        console.log("no remain...");
        window.setTimeout(doQuery,3000);
        return;
      }
    }
  }
  alert("找不到待选课信息！");
});