//初始化场景
function initScene(){

//新建摄像机 透视投影
    var screenwidth=document.documentElement.clientWidth || document.body.clientWidth;
    var screenhight=document.documentElement.clientHeight || document.body.clientHeight;
    camera=new THREE.PerspectiveCamera(45, screenwidth / screenhight ,0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias:true});//新建渲染器（打开抗锯齿）
    renderer.setClearColor(new THREE.Color(0x696669));  //设置背景颜色
    renderer.setSize(screenwidth,screenhight);//设置渲染窗口大小
    renderer.shadowMap.enabled=true;                    //允许产生阴影


    var cylinderGeometry = new THREE.CylinderGeometry(5,5,300,40,40);//创建圆柱几何体
    var cylinderMaterial = new THREE.MeshLambertMaterial();          //创建基本材质
    cylinderMaterial.color.setRGB(0.118,0.519,0.441);                //设置颜色
    cylinderMaterial.emissive.setRGB(0.218,0.519,0.541);             //设置自发光颜色
    //创建圆柱网格对象
    cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
    cylinder.receiveShadow=true;                    //接受投影的物体
    cylinder.castShadow=true;
    scene.add(cylinder);                            //向场景中添加圆柱体

    pointlight = new THREE.PointLight("#ffffff");                       //创建点光源
    pointlightPosition=new THREE.Vector3(40,70,80*Math.cos(Math.PI/6)); //点光源位置
    pointlight.position.set(pointlightPosition.x,pointlightPosition.y,pointlightPosition.z);//设置位置
    scene.add(pointlight);                          //添加点光源
    ambientlight = new THREE.AmbientLight("#ffffff");//设置环境光
    // ambientlight.position.set(0,0,0);
    ambientlight.intensity=0.1;
    cameraPosition=new THREE.Vector3(0,25,60);
    camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z);
    camera.lookAt(lookat);
    //------------
    tailGeometry=new THREE.SphereGeometry(0.8,50,50);               //创建尾气几何体
    tailPic=new new THREE.TextureLoader().load('texture/greencycle.png');       //读取尾气纹理图
    tailPicMesh=new THREE.MeshBasicMaterial({map:tailPic});
    tailPicMesh.depthWrite=false;               //尾巴不受深度检测影响
    tailMesh=new THREE.Mesh(tailGeometry,tailPicMesh);         //创建尾气网格对象

    createball();//创建小球网格对象及模拟刚体
    creatplane();//创建小球与扇环碰撞平面
    function createball(){//创建小球网格对象及刚体
        var ballGeometry = new THREE.SphereGeometry(0.8,50,50);//创建小球几何体、
        // var textureball=new THREE.TextureLoader().load('texture/greencycle.png');//读取小球纹理图片
        var ballMaterial = new THREE.MeshPhongMaterial({color:0x1783FF});//小球材质
        // ballMaterial.color.set(0x1783FF);
        ballMaterial.specular=new THREE.Color("0xffffff");
        ballMaterial.shininess=3;
        //创建小球网格对象
        ball = new THREE.Mesh(ballGeometry,ballMaterial);
        spotLight = new THREE.SpotLight("#ffffff");     //创建聚光灯光源
        ball.position.set(0,15,sportRadius);//设置小球位置
        ball.castShadow=true;//产生阴影的物体
        scene.add(ball);//小球网格对象

        directionlight=new THREE.DirectionalLight("#ffffff");
        directionlightPosition = new THREE.Vector3(40*Math.sin(20*Math.PI/180),30,40*Math.cos(20*Math.PI/180));//平行光位置
        directionlight.position.set(directionlightPosition.x,directionlightPosition.y,directionlightPosition.z);
        directionlight.castShadow = true;//开启平行光的阴影效果
        directionlight.shadow.camera.near = 2;//设置投影范围的近面
        directionlight.shadow.camera.far = 100;//设置投影范围的远面
        directionlight.shadow.camera.left = -50;//设置投影范围的左侧
        directionlight.shadow.camera.right = 50;//设置投影范围的右侧
        directionlight.shadow.camera.top = 50;//设置投影范围的顶部
        directionlight.shadow.camera.bottom = -50;//设置投影范围的底部
        directionlight.target=cylinder;//设置投影目标点
        directionlight.intensity=0.1;//平行光强度
        directionlight.shadow.mapSize.height=2048;
        directionlight.shadow.mapSize.width=2048;
        scene.add(directionlight);//将平行光添加进场景中

    }
    function creatplane(){//小球与扇环碰撞平面
        var planeGeometry=new THREE.PlaneGeometry(6,6);//设置平面大小
        var textureplane=new THREE.TextureLoader().load('texture/youmo.png');//读取纹理图
        var planeMaterial = new THREE.MeshBasicMaterial({map:textureplane});//平面材质
        planeMaterial.depthWrite=false;//不受深度检测影响
        planeMaterial.transparent=true;
        plane = new THREE.Mesh(planeGeometry,planeMaterial);//创建小球网格对象
        // plane.material.transparent=true;
        plane.rotation.x=-0.5*Math.PI;
    }
}