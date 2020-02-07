//-----------------------------------------------------------
//初始化普通扇环模型
function addFanRing(indexarray,scene) {
    var loader=new THREE.OBJLoader();
    loader.load('model/aa.obj',function (fanring) {
        var objMaterial = new THREE.MeshLambertMaterial({color: 0x565656});
        fanring.scale.set(0.7, 0.7, 0.7);
        fanring.material = objMaterial;
        fanring.position.set(0 ,0 ,0);
        this.objFanRing=fanring;
        this.deleteobjFanRing=fanring;
        fanring.children.forEach(function (child) {
            child.material=new THREE.MeshLambertMaterial({color:0x565656});
            child.castShadow=true;
        });
        for (var i=0;i<indexarray.length;i++)               //将扇环存入数组
        {
            for (var j=0;j<indexarray[i].length;j++)
            {
                if(indexarray[i][j]==1) {               //扇环对象
                    var ai=fanring.clone();
                    ai.position.y=-i*20;                        //设置位置层数
                    ai.rotation.y=j*Math.PI/6;                  //设置扇环旋转角
                    fanringArraylist[i].push(ai);
                    fanringArraylistindex[i].push(j);
                    addFanringByList(fanringArraylist,scene);           //创建障碍物对象
                    if (i==0){
                        deletefanring.push(ai);//初始化要删除的扇环对象数组
                    }
                }
            }
        }
    });
}
//创建障碍物扇环模型
function addobstaclesFanring(indexarray,scene) {
    var loader=new THREE.OBJLoader();
    loader.load('model/bb.obj',function (fanring) {
        var objMaterial = new THREE.MeshLambertMaterial({color:0xFF8038});
        fanring.scale.set(0.7, 0.7, 0.7);
        fanring.material = objMaterial;
        fanring.position.set(0 ,0 ,0);
        this.obstaclesFanring=fanring;
        this.deleteobstaclesFanring=fanring;
        fanring.children.forEach(function (child) {
            child.material=new THREE.MeshLambertMaterial({color:0xFF5C32});
            child.castShadow=true;
        });
        for (var i=0;i<indexarray.length;i++)               //将扇环存入数组
        {
            for (var j=0;j<indexarray[i].length;j++)
            {
                if(indexarray[i][j]==-1) {               //扇环对象
                    var ai=fanring.clone();
                    ai.position.y=-i*20;                        //设置位置层数
                    ai.rotation.y=j*Math.PI/6;                  //设置扇环旋转角
                    obstaclesFanringArraylist[i].push(ai);
                    obstaclesFanringArraylistindex[i].push(j);
                    addFanringByList(obstaclesFanringArraylist,scene);  //创建反弹对象
                }
            }
        }
    });
}
//通过对象数组添加对象
function addFanringByList(arrayList,scene) {
    for(var i=0;i<arrayList.length;i++)          //遍历扇环对象数组
    {
        for(var j=0;j<arrayList[i].length;j++)
        {
            scene.add(arrayList[i][j]);
        }
    }
}
function adddeleteFanringByList(arrayList,scene) {
    for(var i=0;i<arrayList.length;i++)          //遍历扇环对象数组
    {
        scene.add(arrayList[i]);
    }
}
