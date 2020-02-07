//生成随机的一维数组
function randomArray() {
    var result=[];
    for(var i=0;i<12;i++){                      //12个随机 0 1 数字
        var num=0;
        var judgeNum=0.0;
        var randomNum=Math.floor(Math.random()*4);
        if(floorCounts>0){                  //0-100层
            judgeNum=0.3;
        }else if(floorCounts>100){          //100-240层
            judgeNum=0.5;
        }else if(floorCounts>240) {         //>240层
            judgeNum=0.7;
        }
        num=Math.random()<0.25?0:1;
        if(num) {
            num=Math.random()<judgeNum?-1:1;
        }
        result.push(num);           //置入扇环对应数组
        if(i==3) {
            result[randomNum]=0;
        }else if(i==7) {
            result[randomNum+4]=1;
        }else if(i==11){
            result[randomNum+8]=1;
        }
    }
    return result;
}
//重置扇环位置数组
function resetArray() {
    var onefloor=mainarraylist[1], twofloor=mainarraylist[2],
        threefloor=mainarraylist[3], fourfloor=mainarraylist[4], fivefloor=mainarraylist[5];
    mainarraylist[0]=onefloor;mainarraylist[1]=twofloor;mainarraylist[2]=threefloor;        //重新赋值
    mainarraylist[3]=fourfloor;mainarraylist[4]=fivefloor;mainarraylist[5]=randomArray();
    updateFanring(mainarraylist,scene);             //更新存储数组
}
//重置储存数组
function updateFanring(indexarray,scene) {
    clearFanring(fanringArraylist,scene);                   //重置前先删除并清空对象
    clearFanring(obstaclesFanringArraylist,scene);      //同上
    clearPanelTexture(collisiontexture);                    //删除并清空碰撞特效贴图
    //删除完原扇环对象后绘制需要动态删除的扇环对象
    adddeleteFanringByList(deletefanring,scene);//绘制要删除的扇环网格体
    adddeleteFanringByList(deletecollisonfanring,scene);

    collisiontexture=[];
    obstaclesFanringArraylist=[[],[],[],[],[],[]];
    obstaclesFanringArraylistindex=[[],[],[],[],[],[]];
    fanringArraylist=[[],[],[],[],[],[]];
    fanringArraylistindex=[[],[],[],[],[],[]];
    for (var i=0;i<indexarray.length;i++)               //将扇环存入数组
    {
        for (var j=0;j<indexarray[i].length;j++)
        {
            if(indexarray[i][j]==1)
            {
                var ai=objFanRing.clone();
                ai.position.y=-(floorCounts+i)*20;                        //设置位置层数
                ai.rotation.y=j*Math.PI/6;                  //设置扇环旋转角
                fanringArraylist[i].push(ai);
                fanringArraylistindex[i].push(j);
            }else if(indexarray[i][j]==-1)
            {
                var ai=obstaclesFanring.clone();
                ai.position.y=-(floorCounts+i)*20;             //设置位置层数
                ai.rotation.y=j*Math.PI/6;                  //设置扇环旋转角
                obstaclesFanringArraylist[i].push(ai);
                obstaclesFanringArraylistindex[i].push(j);
            }
        }
    }
    var changefanringArraylist=fanringArraylist;
    var changeobstaclesFanringArraylist=obstaclesFanringArraylist;
    addFanringByList(changefanringArraylist,scene);           //通过对象数组添加对象
    addFanringByList(changeobstaclesFanringArraylist,scene);

}
//重置储存要删除的运动扇环数组
function updatedeleteFanring(indexarray,scene) {
    for (var i = 0; i < indexarray.length; i++)               //将扇环存入数组
    {
        for (var j = 0; j < indexarray[i].length; j++) {
            if (indexarray[i][j] == 1) {
                if (singlelayercount>=3&&!isdrop){
                    deleteobjFanRing.children.forEach(function (child) {
                        child.material=new THREE.MeshLambertMaterial({color:ballColor});
                        child.material.transparent=true;
                        child.material.opacity=0.4;
                    });
                }else {
                    deleteobjFanRing.children.forEach(function (child) {
                        child.material=new THREE.MeshLambertMaterial({color:0x565656});
                    });
                }
                var ai = deleteobjFanRing.clone();
                ai.position.y = -(floorCounts+i) * 20;          //设置位置层数
                ai.rotation.y=j*Math.PI/6;
                if (i == 0) {
                    deletefanring.push(ai);//更新要删除的扇环对象数组
                }
            }
            if (indexarray[i][j] == -1){
                if (singlelayercount>=3&&!isdrop){
                    deleteobstaclesFanring.children.forEach(function (child) {
                        child.material=new THREE.MeshLambertMaterial({color:ballColor});
                        child.material.transparent=true;
                        child.material.opacity=0.7;
                    });
                }else {
                    deleteobstaclesFanring.children.forEach(function (child) {
                        child.material=new THREE.MeshLambertMaterial({color:0xFF5C32});
                    });
                }
                var ai = deleteobstaclesFanring.clone();
                ai.position.y = -(floorCounts+i) * 20;   //设置位置层数
                ai.rotation.y = j * Math.PI / 6;           //设置扇环旋转角
                if (i == 0) {
                    deletecollisonfanring.push(ai);        //更新要动态删除的扇环对象数组
                }
            }
        }
    }
}
//将位置数组同对象数组对相对应(小球尾巴)
function transferTail(arrayList,scene) {
    var result=arrayList;
    for(var i=0;i<result.length;i++){
        var otherTai=tailMesh.clone();              //创建网格clone对象
        //设置网格位置
        otherTai.position.set(tailArraylist[i][0],tailArraylist[i][1],tailArraylist[i][2]);
        otherTai.scale.set(0.2+0.04*i,0.2+0.04*i,0.2+0.04*i);       //设置缩放比例
        tailTexArraylist.push(otherTai);                            //读入对象数组
    }
    drawTail(tailTexArraylist,scene);                   //往场景内添加尾巴对象
}
//通过纹理对象数组绘制尾巴
function drawTail(arrayList,scene) {
    var result=arrayList;
    for(var i=0;i<result.length;i++){
        scene.add(result[i]);                           //通过数组添加网格对象
    }
}

//清空扇环对象数组
function clearFanring(arrayList,scene) {
    var result=arrayList;
    for(var i=0;i<result.length;i++)          //遍历扇环对象数组
    {
        for(var j=0;j<result[i].length;j++)
        {
            scene.remove(result[i][j]);
        }
    }
}
//删除首行扇环数组
function firstlinefanring() {
    mainarraylist[0]=[0,0,0,0,0,0,0,0,0,0,0,0];//首行数组归零
    // alert(""+mainarraylist);
    for (var i=0;i<fanringArraylist[0].length;i++){
        scene.remove(fanringArraylist[0][i]);
    }
    for (var i=0;i<obstaclesFanringArraylist[0].length;i++){
        scene.remove(obstaclesFanringArraylist[0][i]);
    }
}
//删除碰撞特效纹理图对象
function clearPanelTexture(arrayList){
    var result=arrayList;
    for(var i=0;i<result.length;i++){
        scene.remove(result[i]);
    }
    collisiontexture=[];
}
//清空尾巴对象数组与场景内对象
function clearTailarrayliat(arrayList,scece) {
    var result=arrayList;
    for (var i=0;i<result.length;i++){
        scece.remove(result[i]);                     //移除场景内网格对象
    }
    tailTexArraylist=[];
}
//清除动态的特效扇环数组
function clearfangring(arrayListfanring,arrayListcollisonfanring){//删除扇环数组
    for(var i=0;i<arrayListfanring.length;i++){
        arrayListfanring[i].translateZ(-0.7);
        arrayListfanring[i].translateX(-0.7);
        arrayListfanring[i].translateY(-0.2);
        arrayListfanring[i].rotation.z-=0.02;
        arrayListfanring[i].rotation.y-=0.02;
        if( arrayListfanring[i].rotation.z<-0.7){
            scene.remove(arrayListfanring[i]);
            arrayListfanring.splice(i,1);
        }
    }
    for(var i=0;i<arrayListcollisonfanring.length;i++){
        arrayListcollisonfanring[i].translateZ(-0.7);
        arrayListcollisonfanring[i].translateX(-0.7);
        arrayListcollisonfanring[i].translateY(-0.2);
        arrayListcollisonfanring[i].rotation.z-=0.02;
        arrayListcollisonfanring[i].rotation.y-=0.02;
        if( arrayListcollisonfanring[i].rotation.z<-0.7){
            scene.remove(arrayListcollisonfanring[i]);
            arrayListcollisonfanring.splice(i,1);
        }
    }
    if (arrayListcollisonfanring.length==0&&arrayListfanring.length==0){
        isdelete=true;//删除完毕
    }
}
//失败后直接清空特效数组
function deleteclearfangring(arrayListfanring) {//删除扇环数组
    for(var i=0;i<arrayListfanring.length;i++) {
        scene.remove(arrayListfanring[i]);
        deletefanring.splice(i,1);
    }
    deletefanring=[];
}

//创建粒子系统
function createParticles4Loader(transparent, opacity, color,result) {

    particleGroup=null;
    if(!particleGroup){
        particleGroup=new THREE.Group();
    }
    var material = new THREE.SpriteMaterial({
        transparent: transparent,                   //材质是否透明
        opacity, opacity,
        color: color,
        blending: THREE.NormalBlending,
        depthTest: true,
    });

    var loader = new THREE.TextureLoader();
    material.map=loader.load('texture/'+waterTail+'.png');

    for (var i=0;i<50;i++){
        particle = new THREE.Sprite(material);
        var x = result[0];
        var y = result[1];
        var z = result[2];
        particle.position.set(x, y, z);
        particle.scale.set(0.35,0.35,0.35);
        // group.add(particle);
        particleGroup.add(particle);
    }
    particleGroup.name = "particles";
    scene.remove(scene.getObjectByName(particleGroup.name));
    scene.add(particleGroup);
}
//更新粒子系统的方法
function updataParticlesPosition() {
    if(particleGroup){
        var i=0;                          //计数器
        particleGroup.children.forEach(function (child) {
            if(velocity.y<-0.2){
                child.position.x+=0.1*(Math.cos(waterDirection[i]))*Math.random();
                child.position.y+=0.4*Math.random();
                child.position.z+=(Math.sin(waterDirection[i]))*Math.random()<0.2?-0.15:0.1;
            }else {
                child.position.x+=0.15*(Math.cos(waterDirection[i]))*Math.random();
                child.position.y+=-0.3*Math.random();
                child.position.z+=0.1*(Math.sin(waterDirection[i]))*Math.random();
            }
            i++;
        });
    }
}
//根据记分板数字绘制数字纹理图片
function drawNumpic() {
    var result=scoreboardNum;
    // var result=1;
    var singleNum = result % 10;              //个位数
    var tenNum = Math.floor(result / 10) % 10;                 //十位数
    var hundredNum = Math.floor(result / 100) % 10;             //百位数
    var thousandNum = Math.floor(result / 1000) % 10;                //千位数
    var millionNum = Math.floor(result / 10000) % 10;                 //万位数

    var singleImg = document.getElementById("singlescore");//获得玩家的得分图片
    var tenImg = document.getElementById("tenscore");
    var hundredImg = document.getElementById("hundredscore");
    var thousandImg = document.getElementById("thousandscore");
    var millionImg = document.getElementById("millionscore");

    if(!isDrawNumPic){
        if (result > 9999) {
            millionImg.style.left="5%";
            thousandImg.style.left="10%";
            hundredImg.style.left="15%";
            tenImg.style.left="20%";
            singleImg.style.left="25%";
            millionImg.setAttribute('src', 'texture/' + millionNum + '.png');
            thousandImg.setAttribute('src', 'texture/' + thousandNum + '.png');
            hundredImg.setAttribute('src', 'texture/' + hundredNum + '.png');
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            millionImg.style.display = "block";thousandImg.style.display = "block";     //万位图片
            hundredImg.style.display = "block";tenImg.style.display = "block";
        } else if (result > 999) {
            thousandImg.style.left="5%";
            hundredImg.style.left="10%";
            tenImg.style.left="15%";
            singleImg.style.left="20%";
            thousandImg.setAttribute('src', 'texture/' + thousandNum + '.png');
            hundredImg.setAttribute('src', 'texture/' + hundredNum + '.png');
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            thousandImg.style.display = "block";hundredImg.style.display = "block";     //千位图片
            tenImg.style.display = "block";
        } else if (result > 99) {
            hundredImg.style.left="5%";
            tenImg.style.left="10%";
            singleImg.style.left="15%";
            hundredImg.setAttribute('src', 'texture/' + hundredNum + '.png');
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            hundredImg.style.display = "block";tenImg.style.display = "block";      //百位图片
        } else if (result > 9) {
            tenImg.style.left="5%";
            singleImg.style.left="10%";
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            tenImg.style.display = "block";                                         //十位图片
            singleImg.style.display="block";
        } else {
            singleImg.style.left="5%";
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
        }
    }
    else {
        if (result > 9999) {
            singleImg.style.left="65%";
            tenImg.style.left="55%";
            hundredImg.style.left="45%";
            thousandImg.style.left="35%";
            millionImg.style.left="25%";
            millionImg.setAttribute('src', 'texture/' + millionNum + '.png');
            thousandImg.setAttribute('src', 'texture/' + thousandNum + '.png');
            hundredImg.setAttribute('src', 'texture/' + hundredNum + '.png');
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            millionImg.style.display = "block";thousandImg.style.display = "block";     //万位图片
            hundredImg.style.display = "block";tenImg.style.display = "block";
        } else if (result > 999) {
            singleImg.style.left="60%";
            tenImg.style.left="50%";
            hundredImg.style.left="40%";
            thousandImg.style.left="30%";
            thousandImg.setAttribute('src', 'texture/' + thousandNum + '.png');
            hundredImg.setAttribute('src', 'texture/' + hundredNum + '.png');
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            thousandImg.style.display = "block";hundredImg.style.display = "block";     //千位图片
            tenImg.style.display = "block";
        } else if (result > 99) {
            singleImg.style.left="55%";
            tenImg.style.left="45%";
            hundredImg.style.left="35%";
            hundredImg.setAttribute('src', 'texture/' + hundredNum + '.png');
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            hundredImg.style.display = "block";tenImg.style.display = "block";      //百位图片
        } else if (result > 9) {
            singleImg.style.left="50%";
            tenImg.style.left="40%";
            tenImg.setAttribute('src', 'texture/' + tenNum + '.png');
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
            tenImg.style.display = "block";                                         //十位图片
        } else {
            singleImg.style.left="45%";
            singleImg.setAttribute('src', 'texture/' + singleNum + '.png');
        }
    }
}
//摄像机移动
function cameramove() {
    if (isclear){
        clearfangring(deletefanring,deletecollisonfanring);//清除要动态删除的扇环对象
    }
    if (isdrop){//如果摄像机移动
        camera.position.y=ball.position.y+cameraPosition.y-3.9;//摄像机下降
        cylinder.position.y=ball.position.y-3.9;//圆柱下降
        pointlight.position.y=camera.position.y+pointlightPosition.y-cameraPosition.y;//点光源下降
        directionlight.position.y=camera.position.y-cameraPosition.y+directionlightPosition.y;
    }
    if(!isdrop&&isdelete){//小球没有下落到下一层
        deletefanring=[];
        deletecollisonfanring=[];
        isclear = false;//不删除动态扇环
        isdelete=false;//删除完毕标志位变为false
    }
}