/**
 * Created by CYA on 2015/10/25.
 */
//时间轴心构造器
var Timeline= function () {
    this.order=[];
    this.add=function(timeout,func,log){//动画触发
        this.order.push({
            timeout:timeout,//什么时间后触发
            func:func,//函数内容是什么
            log:log//日志
        });
    }
            //支持快进
    this.start=function(ff){
            for(s in  this.order){
                (function(me){//创建一个闭包函数
                        var fn=me.func;
                        var timeout=me.timeout;
                        var log=me.log;
                    timeout=Math.max(timeout-(ff||0),0);
                    setTimeout(fn,timeout)
                    setTimeout(function(){
                        console.log('time->',timeout,'log->',log);
                    },timeout);
                })(this.order[s])
            }
    }

}


//获取DOM对象
var g=function(id){
    return document.getElementById(id);
}
//初始的场景 粽子摆动
var s1=new Timeline();
//粽子展开的情节
var s2=new Timeline();
//粽子旋转的情景
var s3=new Timeline();
s1.add(1,function(){
    g('c_zongzi_box').className='c_zongzi_box c_zongzi_box_rock';//粽子摆动
    g('c_string').onclick=function(){//绳子点击事件
        s2.start();//绳子事件开始
       // g('c_string').onclick=function(){}
    }
})
//粽子消失展开动画
s2.add(1,function(){
    g('c_zongzi_box').className='c_zongzi_box';
    g('text').className='text text_in';
})

//绳子动画
s2.add(100,function(){
    g('c_string').className='c_string_2';
})
s2.add(400,function(){
    g('c_string').className='c_string_3';
})
s2.add(800,function(){
    g('c_string').className='c_string_4';
})
s2.add(1000,function(){
    g('c_string').className='c_string_0';
})

//粽子的动画过程
s2.add(2000,function(){
    g('c_zongzi').className='c_zongzi c_zongzi_out';//粽子出去，
    g('c_zongzirou').className='c_zongzirou c_zongzirou_in';//粽子肉出来
    g('c_zouye').className='c_zouye c_zouye_in';//左页出来
    g('c_youye').className='c_youye c_youye_in';//右页出来

    g('c_text_1').className='c_text_1 c_text_in';//吉祥出来
    g('c_text_1').className='c_text_1 c_text_in';//吉祥出来
})
s2.add(3000,function(){
    g('c_zouye').className='c_zouye c_zouye_in c_zouye_out';//左页出来
    g('c_youye').className='c_youye c_youye_in c_youye_out';//右页出来
    g('c_diye').className='c_diye';//底页出来
    s3.start();
})
//粽子托盘旋转定义
s3.add(1000,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_1";
})
s3.add(1200,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_2";
    g('c_text_1').className="c_text_1 text_in c_text_view_2";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_2";
})
s3.add(1400,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_3";
    g('c_text_1').className="c_text_1 text_in c_text_view_3";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_3";
})
s3.add(1600,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_4";
    g('c_text_1').className="c_text_1 text_in c_text_view_4";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_4";
})
s3.add(1800,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_0";
    g('c_text_1').className="c_text_1 text_in c_text_mirror_0";
    g('c_text_2').className="c_text_2 text_in c_text_view_0";
})
s3.add(3000,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_4";
    g('c_text_1').className="c_text_1 text_in c_text_view_4";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_4";
})
s3.add(3200,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_3";
    g('c_text_1').className="c_text_1 text_in c_text_view_3";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_3";
})
s3.add(3400,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_2";
    g('c_text_1').className="c_text_1 text_in c_text_view_2";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_2";
})
s3.add(3600,function () {
    g('c_zongzirou').className="c_zongzirou c_zongzirou_in c_zongzirou_view_1";
    g('c_text_1').className="c_text_1 text_in c_text_view_0";
    g('c_text_2').className="c_text_2 text_in c_text_mirror_0";
})
s3.add(3600,function () {
    s3.start();
})
s1.start();

//图片加载器
 var imgs=['img/zzr_2','img/zzr_3','img/zzr_4']
var imgs_load=function(){
    img.pop();
    if(img.length==0){
        s1.start();
    }
}
for(s in imgs){
    var img=new Image;
    img.onload=imgs_load;
    img.src=imgs[s];
}