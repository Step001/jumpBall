//屏幕监听事件
function addListener() {
    //鼠标按下
    document.onmousedown=function(event) {
        var x=event.clientX,y=event.clientY;
        // //如果鼠标在<canvas>内开始移动
        var rect= (event.target||event.srcElement).getBoundingClientRect();
        if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom) {
            ismoved=true;
            lastClickX=x;
        }
    }
    // 鼠标移动
    document.onmousemove=function(event) {
        var x=event.clientX, y=event.clientY;
        if(ismoved) {
            currentXAngle+=(x-lastClickX)*incAngle;
        }
        lastClickX=x;
    }
    //鼠标抬起
    document.onmouseup=function(event) {
        ismoved=false;
        // alert("dfadfljshsfjsasjlfhjsas");
    }

    document.ontouchstart=function (event) {
        var x=event.touches[0].pageX,y=event.touches[0].pageY;
        // //如果鼠标在<canvas>内开始移动
        var rect= (event.target||event.srcElement).getBoundingClientRect();
        if(rect.left<=x&&x<rect.right&&rect.top<=y&&y<rect.bottom) {
            ismoved=true;
            lastClickX=x;
        }
    }
    document.ontouchmove=function (event) {
        var x=event.touches[0].pageX,y=event.touches[0].pageY;
        event.preventDefault();//防止左右滑动
        if(ismoved) {
            currentXAngle+=(x-lastClickX)*incAngle;
        }
        lastClickX=x;
    }
    document.ontouchend=function (event) {
        ismoved=false;
    }
}
//打开或关闭设置
function changeSet() {
    shezhi=!shezhi;
    if(shezhi){
        if(issound){
            document.getElementById("sound").style.display="block";
        }else {
            document.getElementById("nosound").style.display="block";
        }
    }else {
        document.getElementById("sound").style.display="none";
        document.getElementById("nosound").style.display="none";
    }
    if(pifuon){                             //如果存在皮肤界面就收起
        pifuon=!pifuon;
        document.getElementById("bluepifu").style.display="none";
        document.getElementById("purplepifu").style.display="none";
        document.getElementById("yellowpifu").style.display="none";
        document.getElementById("greenpifu").style.display="none";
        document.getElementById("kuang").style.display="none";
    }
}
//控制音乐的开关
function musiccloseopen() {
    issound=!issound;
    if(issound){
        document.getElementById("nosound").style.display="none";
        document.getElementById("sound").style.display="block";
        thismusic.currentTime=0;
        thismusic.play();
    }else {
        document.getElementById("sound").style.display="none";
        document.getElementById("nosound").style.display="block";
        thismusic.pause();
    }
}
//修改难度，本游戏仅仅设置两个难度，通过修改步长值实现
function changeDiddiculity() {
    isdifficult=!isdifficult;
    if(isdifficult){
        incAngle=0.015;                      //将步长值从0.007修改到0.015
        document.getElementById("difficulty").style.display="block";
        document.getElementById("easy").style.display="none";
    }else {
        incAngle=0.007;                     //将步长值修改回来
        document.getElementById("difficulty").style.display="none";
        document.getElementById("easy").style.display="block";
    }
}
//皮肤打开与收起
function pifucloseopen() {
    pifuon=!pifuon;
    if(pifuon){                                 //展开皮肤
        document.getElementById("bluepifu").style.display="block";
        document.getElementById("purplepifu").style.display="block";
        document.getElementById("yellowpifu").style.display="block";
        document.getElementById("greenpifu").style.display="block";
        document.getElementById("kuang").style.display="block";
    }else {                                 //收起皮肤
        document.getElementById("bluepifu").style.display="none";
        document.getElementById("purplepifu").style.display="none";
        document.getElementById("yellowpifu").style.display="none";
        document.getElementById("greenpifu").style.display="none";
        document.getElementById("kuang").style.display="none";
    }
    if(shezhi){                                 //如果存在音量界面就收起
        shezhi=!shezhi;
        document.getElementById("sound").style.display="none";
        document.getElementById("nosound").style.display="none";
    }
}
//选择皮肤
function choosePifu(num) {
    //tailPic,textureplane
    switch (num) {
        case 0:
            var thetailPic=new THREE.TextureLoader().load('texture/greencycle.png');       //读取尾气纹理图
            var thetailPicMesh=new THREE.MeshBasicMaterial({map:thetailPic});
            // tailPicMesh.depthTest=false;
            thetailPicMesh.depthWrite=false;               //尾巴不受深度检测影响
            tailMesh.material=thetailPicMesh;
            // tailMesh.material.depthWrite=false;

            ballColor=0x1783FF;
            waterTail="watertail";                //水滴溅射

            var textureplane=new THREE.TextureLoader().load('texture/youmo.png');//读取纹理图
            var planeMaterial = new THREE.MeshBasicMaterial({map:textureplane});//平面材质
            // planeMaterial.depthTest=false;
            planeMaterial.depthWrite=false;//不受深度检测影响
            planeMaterial.transparent=true;
            plane.material=planeMaterial;
            // plane.material.material.depthWrite=false;

            var ballMaterial = new THREE.MeshPhongMaterial({color:0x1783FF});//小球材质
            ballMaterial.specular=new THREE.Color("0xffffff");
            ballMaterial.shininess=3;
            ball.material=ballMaterial;

            break;
        case 1:
            var thetailPic=new THREE.TextureLoader().load('texture/purplewatertail.png');       //读取尾气纹理图
            var thetailPicMesh=new THREE.MeshBasicMaterial({map:thetailPic});
            // tailPicMesh.depthTest=false;
            thetailPicMesh.depthWrite=false;               //尾巴不受深度检测影响
            tailMesh.material=thetailPicMesh;
            // tailMesh.material.depthWrite=false;

            ballColor=0xF948FF;
            waterTail="purplewatertail";                //水滴溅射

            var textureplane=new THREE.TextureLoader().load('texture/purpleyoumo.png');//读取纹理图
            var planeMaterial = new THREE.MeshBasicMaterial({map:textureplane});//平面材质
            // planeMaterial.depthTest=false;
            planeMaterial.depthWrite=false;//不受深度检测影响
            planeMaterial.transparent=true;//设置网格对象为透明
            plane.material=planeMaterial;
            // plane.material.material.depthWrite=false;

            var ballMaterial = new THREE.MeshPhongMaterial({color:0xF948FF});//小球材质
            ballMaterial.specular=new THREE.Color("0xffffff");
            ballMaterial.shininess=3;
            ball.material=ballMaterial;

            break;
        case 2:
            var thetailPic=new THREE.TextureLoader().load('texture/yellowwatertail.png');       //读取尾气纹理图
            var thetailPicMesh=new THREE.MeshBasicMaterial({map:thetailPic});
            // tailPicMesh.depthTest=false;
            thetailPicMesh.depthWrite=false;               //尾巴不受深度检测影响
            tailMesh.material=thetailPicMesh;
            // tailMesh.material.depthWrite=false;

            ballColor=0xFCFF42;
            waterTail="yellowwatertail";                //水滴溅射

            var textureplane=new THREE.TextureLoader().load('texture/yellowyoumo.png');//读取纹理图
            var planeMaterial = new THREE.MeshBasicMaterial({map:textureplane});//平面材质
            // planeMaterial.depthTest=false;
            planeMaterial.depthWrite=false;//不受深度检测影响
            planeMaterial.transparent=true;
            plane.material=planeMaterial;
            // plane.material.material.depthWrite=false;

            var ballMaterial = new THREE.MeshPhongMaterial({color:0xFCFF42});//小球材质
            ballMaterial.specular=new THREE.Color("0xffffff");
            ballMaterial.shininess=3;
            ball.material=ballMaterial;

            break;
        case 3:
            var thetailPic=new THREE.TextureLoader().load('texture/greenwatertail.png');       //读取尾气纹理图
            var thetailPicMesh=new THREE.MeshBasicMaterial({map:thetailPic});
            // tailPicMesh.depthTest=false;
            thetailPicMesh.depthWrite=false;               //尾巴不受深度检测影响
            tailMesh.material=thetailPicMesh;
            // tailMesh.material.depthWrite=false;

            ballColor=0x0DFF23;
            waterTail="greenwatertail";                //水滴溅射

            var textureplane=new THREE.TextureLoader().load('texture/greenyoumo.png');//读取纹理图
            var planeMaterial = new THREE.MeshBasicMaterial({map:textureplane});//平面材质
            // planeMaterial.depthTest=false;
            planeMaterial.depthWrite=false;//不受深度检测影响
            planeMaterial.transparent=true;
            plane.material=planeMaterial;
            // plane.material.material.depthWrite=false;

            var ballMaterial = new THREE.MeshPhongMaterial({color:0x0DFF23});//小球材质
            ballMaterial.specular=new THREE.Color("0xffffff");//小球高光颜色
            ballMaterial.shininess=3;//小球高光区域
            ball.material=ballMaterial;

            break;
    }
}
//进入欢迎界面的方法
function toWelComeView(){                   //从加载界面切换到欢迎界面的方法
    isWelcome=true;                     //允许欢迎界面绘制
    document.getElementById("loadfinsh").style.display = "block";//显示加载完成图片
}
//欢迎界面
function beginView(){
    if(isWelcome){
        document.getElementById("loadfinsh").style.display = "none";        //加载完成界面消失
        document.getElementById("load").style.display = "none";     //将加载图片设置为不显示
        document.getElementById("Welcome").style.display="block";
        document.getElementById("startbutton").disabled=false;
        thismusic.currentTime=0;
        thismusic.play();//播放音乐
        document.getElementById("WebGL-output").appendChild(renderer.domElement);//将游戏界面呈现到屏幕上
        isgame=true;

    }
}
//点击开始游戏的方法
function startGame() {
    isWelcome=false;                    //欢迎界面结束
    document.getElementById("Welcome").style.display="none";
    document.getElementById("defen").style.display="block";     //分数面板
    document.getElementById("singlescore").style.display="block";//个位分数
    start=true;                             //开始标志位
}
//游戏结束界面
function loseGame() {
    thismusic.pause();
    deathSound.play();
    document.getElementById("endbackground").style.display="block";     //透明背景贴图
    document.getElementById("Gameover").style.display="block";          //出现游戏结束界面
    document.getElementById("again").style.display="block";             //重新开始按钮
    changePosition("millionscore",1);
    changePosition("thousandscore",1);
    changePosition("hundredscore",1);
    changePosition("tenscore",1);
    changePosition("singlescore",1);

}
//重新设置
function reset() {                  //重新开始游戏的方法
    isDrawNumPic=false;
    document.getElementById("Gameover").style.display="none";
    document.getElementById("endbackground").style.display="none";
    document.getElementById("again").style.display="none";
    deleteclearfangring(deletefanring);
    currentXAngle=0;                //角度清零
    singlelayercount=0;
    floorCounts=0;
    scoreboardNum=0;                //记分板分数（总分数）
    oncescoreNum=0;                 //一次落下所得分数
    isdelete=false;
    isclear=false;
    isdrop=false;
    directionlightPosition = new THREE.Vector3(40*Math.sin(20*Math.PI/180),30,40*Math.cos(20*Math.PI/180));//平行光位置
    directionlight.position.set(directionlightPosition.x,directionlightPosition.y,directionlightPosition.z);
    ball.position.set(0,15,sportRadius);
    cameraPosition=new THREE.Vector3(0,25,60);              //摄像机归位
    camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z);
    camera.lookAt(lookat);
    pointlight.position.set(pointlightPosition.x,pointlightPosition.y,pointlightPosition.z);
    cylinder.position.set(0,0,0);
    for(var i=0;i<firstfloorcountfanring.length;i++){
        if(firstfloorcountfanring[i]==1){
            var ai = objFanRing.clone();
            ai.rotation.y=i*Math.PI/6;
            deletefanring.push(ai);//更新要删除的扇环对象数组
        }
    }
    mainarraylist=[randomArray(),[1,0,0,1,0,1,0,1,1,1,1,0],randomArray(),
        randomArray(),randomArray(),randomArray()];                //扇环数组（确定位置）
    resetArray();
    gameover=false;
    document.getElementById("Welcome").style.display="block";
    restartGame();
}
//重新开始游戏
function restartGame() {
    deathSound.pause();
    deathSound.currentTime=0;
    if(issound){
        thismusic.currentTime=0;
        thismusic.play();
    }
    changePosition("millionscore",2);
    changePosition("thousandscore",2);
    changePosition("hundredscore",2);
    changePosition("tenscore",2);
    changePosition("singlescore",2);

    document.getElementById("singlescore").style.display="none";
    document.getElementById("tenscore").style.display="none";
    document.getElementById("hundredscore").style.display="none";
    document.getElementById("thousandscore").style.display="none";
    document.getElementById("millionscore").style.display="none";
    // alert("重新开始");
}
//改变图片大小
function changePosition(getResult,num){
    var result=getResult;
    var resultNum=num;
    switch (resultNum) {
        case 1:
            document.getElementById(result).style.top="45%";                //失败界面尺寸
            document.getElementById(result).style.width="90px";
            document.getElementById(result).style.height="180px";
            break;
        case 2:
            document.getElementById(result).style.top="5%";                 //重新开始尺寸
            document.getElementById(result).style.width="40px";
            document.getElementById(result).style.height="80px";
            break;
    }
}