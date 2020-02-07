//小球物理模拟
function initPhysics() {//碰撞检测
    clearTailarrayliat(tailTexArraylist,scene);     //清空尾巴纹理及数组
    ball.translateY(-velocity.y);//变换小球位置
    //=---------------------------------------------
    //将小球位置储存进数组
    if(tailArraylist.length<20){            //添加20个纹理图
        var result=[ball.position.x,ball.position.y,ball.position.z];
        tailArraylist.push(result);
    }
    else{
        for (var i=0;i<19;i++) {
            tailArraylist[i]=tailArraylist[i+1];
        }
        tailArraylist[19]=[ball.position.x,ball.position.y,ball.position.z];
        // tailTexArraylist[19]=[];
    }
   transferTail(tailArraylist,scene);      //将位置数组同对象数组对应
    //-----------------------------------------------
    if (!isdrop){ //
        velocity.y += gravity;   //改变小球速度
    }

    for(var i=0;i<this.mainarraylist[0].length;i++){//碰撞检测
        xstart=ball_CollisionrangeXstart[i];
        xend=ball_CollisionrangeXend[i];
        zstart=ball_CollisionrangeZstart[i];
        zend=ball_CollisionrangeZend[i];
        var ballX=Math.round(parseFloat(ball.position.x)*100)/100;
        var ballY=Math.round(parseFloat(ball.position.y)*100)/100;
        var ballZ=Math.round(parseFloat(ball.position.z)*100)/100;
        if(this.mainarraylist[0][i]==1) {  //小球捧碰撞到可反弹扇环

            if ((xstart <= ballX && ballX <= xend)
                && (-(floorCounts*20)<=ballY&&ballY <= -(floorCounts*20)+4.5)
                                    && (zstart <= ballZ&& ballZ <= zend)) {//向上运动
                crashSound.play();
                ballRebound();
                oncescoreNum=0;
            }
        }
        if (this.mainarraylist[0][i]==0){    //小球下落到下一层
            if ((xstart < ball.position.x && ball.position.x < xend) &&
                ( ball.position.y <= -(floorCounts * 20) + 2.9) &&
                (zstart< ball.position.z && ball.position.z < zend)) {//向下运动
                 velocity.y=0.99;
                if (floorCounts>=1){//更新需要动态删除的扇环数组 层数等于零的时候不更新数组
                    updatedeleteFanring(mainarraylist, scene);
                }
                 floorCounts+=1;//总层数加1
                 singlelayercount += 1;//单次下落的层数自加
                 oncescoreNum+=1;       //一次得分
                 scoreboardNum+=oncescoreNum;//总分数
                 // alert("此时分数为：：："+scoreboardNum);
                 clearPanelTexture(this.collisiontexture);      //清除地面纹理
                 isdelete=false;
                 isclear=true;
                 isdrop=true;
                scene.remove(scene.getObjectByName(particleGroup.name));        //清除粒子
                resetArray();//重置扇环数组
                // alert("nnnnnnnnnnnnnppppppppppppppppppp"+mainarraylist);
            }
        }
        if (this.mainarraylist[0][i]==-1){           //小球碰到障碍物

            if ((xstart < ball.position.x && ball.position.x < xend) &&
                (ball.position.y <= -(floorCounts*20)+5) && (zstart<= ball.position.z && ball.position.z <= zend)) {//向下运动
                if (singlelayercount>=3){
                    ballRebound();
                } else {
                    velocity.y = 0;
                    start = false;                          //无法移动摄像机和小球
                    isDrawNumPic=true;
                    loseGame();
                }
                oncescoreNum = 0;                   //单次分数归零
                scene.remove(scene.getObjectByName(particleGroup.name));        //清除粒子
            }
        }
     }
     if (collisiontexture.length!=0) {
         for (var i = 0; i < collisiontexture.length; i++) {
             scene.add(collisiontexture[i]);
         }
     }
    function ballRebound() {//小球反弹的方法
        velocity.y = -1.10;                     //改变小球速度方向
        velocity.y = velocity.y + gravity;      //小球速度改变
        //绘制碰撞扇环的特效贴图
        plane.position.set(ball.position.x, -floorCounts * 20 + 3.6, ball.position.z);
        var planeclone = plane.clone(); //克隆贴图对象
        this.collisiontexture.push(planeclone);//向数组中添加对象
        for (var i = 0; i < 50; i++) {     //传递方向信息
            waterDirection[i] = Math.floor(Math.random() * 360);
        }
        //创建粒子
        createParticles4Loader(false, 1, 0xffffff, [ball.position.x, ball.position.y + 0.2, ball.position.z]);
        isdrop = false;             //摄像机不移动
        if (singlelayercount >= 3) {//如果单次下落层数大于3
            isdelete = false;//
            bombSound.play();
            updatedeleteFanring(mainarraylist, scene);//更新要动态删除的扇环数组
            // alert("qwertyuiop[fhgvjhbjkn"+deletefanring.length);
            firstlinefanring();                     //删除原场景中的扇环对象及数组
            adddeleteFanringByList(deletefanring, scene);//绘制要删除的扇环网格体
            adddeleteFanringByList(deletecollisonfanring, scene);
            clearfangring(deletefanring, deletecollisonfanring)//删除需动态删除的扇环对象
            clearPanelTexture(collisiontexture);
            //alert(""+velocity.y);
        }
        singlelayercount = 0;
    }
}
//圆柱体旋转变化模拟
function simulation(){
    if(ismoved)//移动
    {
        camera.position.x=cameraPosition.z*Math.sin(-currentXAngle);
        camera.position.z=cameraPosition.z*Math.cos(-currentXAngle);
        camera.lookAt(new THREE.Vector3(0,camera.position.y-(cameraPosition.y-lookat.y),0));
        ball.position.x=10*Math.sin(-currentXAngle);//小球网格对象位置
        ball.position.z=10*Math.cos(-currentXAngle);
        pointlight.position.x=(pointlightPosition.z/Math.cos(Math.PI/6))*Math.sin(-(currentXAngle-Math.PI/6));//点光源x轴位置变化
        pointlight.position.z=(pointlightPosition.z/Math.cos(Math.PI/6))*Math.cos(-(currentXAngle-Math.PI/6));//点光源z轴位置变化
        directionlight.position.x=(directionlightPosition.z/Math.cos(20*Math.PI/180))*Math.sin(-(currentXAngle-20*Math.PI/180));//点光源x轴位置变化
        directionlight.position.z=(directionlightPosition.z/Math.cos(20*Math.PI/180))*Math.cos(-(currentXAngle-20*Math.PI/180));//点光源z轴位置变化
    }
}