var issound=true;                   //是否开启音乐
var shezhi=false;                   //选择界面
var isdifficult=false;                    //是否开启困难

var thismusic,crashSound,bombSound,deathSound;  //背景音乐,碰撞音效
var scene=new THREE.Scene();//新建场景
var renderer;               //渲染器
var start=false;            //游戏开始
// var gameover=false;         //游戏结束
var isgame=false;           //是否进去游戏界面
var isclear=false;          //是否清除场景中的扇环对象
var isdelete=false;         //判断扇环对象是否已删除
var cylinder;               //圆柱网格对象
var ball;                   //小球网格对象
var plane;                  //碰撞平面贴图

var currentXAngle=0;        //圆柱旋转角度
var lastClickX;             //上次点击的x坐标
var ismoved=false;          //移动标志位
var isdrop=false;                 //摄像机移动标志位
var isclear=false;                //是否清除动态扇环
var incAngle=0.007;          //旋转角度步长值
var singlelayercount=0;     //一次下落的层数
var camera;                 //摄像机
var pointlight;             //点光源
var ambientlight;           //环境光
var spotLight;              //聚光灯光源
var directionlight;                             //平行光光源
var cameraPosition;                             //摄像机初始位置
var pointlightPosition;                         //点光源初始位置
var directionlightPosition;                     //平行光光源位置
// var spotlightPosition;                       //聚光灯光源位置
var lookat=new THREE.Vector3(0,-10,0);          //摄像机视角

var velocity = new THREE.Vector3(0,0,0);        //设置小球速度
var gravity=0.05;                               //设置重力加速度
//-----------------------------------
var mainarraylist=[[1,0,0,1,0,1,0,1,1,1,1,0],randomArray(),randomArray(),
    randomArray(),randomArray(),randomArray()];                //扇环数组（确定位置）
var firstfloorcountfanring=[1,0,0,1,0,1,0,1,1,1,1,0];         //第一层扇环数组
var fanringArraylist=[[],[],[],[],[],[]];                    //可旋转扇环对象
var fanringArraylistindex=[[],[],[],[],[],[]];               //将扇环对象与位置对应（旋转）
var obstaclesFanringArraylist=[[],[],[],[],[],[]];                    //障碍物扇环对象
var obstaclesFanringArraylistindex=[[],[],[],[],[],[]];              //障碍物扇环对象索引
var collisiontexture=[];       //碰撞贴图对象数组
var deletefanring=[];           //需删除的反弹扇环对象数组
var deletecollisonfanring=[];   //需删除的失败扇环对象数组
var floorCounts=0;                      //层数计数器
var objFanRing=new Object();            //克隆扇环所需要的中间变量
var obstaclesFanring=new Object();      //克隆障碍物所需中间变量
var deleteobjFanRing=new Object();         //克隆要动态删除的扇环所需要的中间变量
var deleteobstaclesFanring=new Object();      //克隆障动态删除的碍物所需中间变量
//----------------------------------
var scoreboardNum=0;                    //记分板分数（总分数）
var oncescoreNum=0;                     //一次落下所得分数
//----------------------------------------------------
var tailArraylist=[];                   //小球尾巴纹理坐标数组
for(var i=0;i<20;i++){                  //跟随20个纹理图
    tailArraylist[i]=[];
}
var tailTexArraylist=[];                //小球网格对象数组
var tailGeometry;                       //小球集合体对象
var tailPic;                            //小球纹理对象
var tailPicMesh;                        //小球材质对象
var tailMesh;                           //小球网格对象（单个）
//-------------------------------------------------------
var waterCounts=50;         //粒子系统的粒子数目
var particleGroup;          //粒子群组
var waterDirection=[];      //粒子方向信息
//------------------------------
//模拟物理时用到的变量
var sportRadius=10;//小球运动半径长
var sinR=Math.round(parseFloat(Math.sin(30*Math.PI/180)*this.sportRadius*100))/100;//Math.sin(30*Math.PI/180)*this.sportRadius;
var cosR=Math.round(parseFloat(Math.cos(30*Math.PI/180)*this.sportRadius*100))/100;//Math.cos(30*Math.PI/180)*this.sportRadius;
var  ball_CollisionrangeXstart=[
    cosR,//0第1个扇形碰撞范围的x坐标左阈值
    sinR,//1第2个扇形碰撞范围的x坐标左阈值
    0,//2
    -sinR,//3
    -cosR,//4
    -this.sportRadius,//5
    -this.sportRadius,//6
    -cosR,//7
    -sinR,//8
    0,//9
    sinR,//10
    cosR//11
];//x坐标起始范围数组
var  ball_CollisionrangeXend=[
    this.sportRadius,//0第1个扇形碰撞范围的x坐标右阈值
    cosR,//1第2个扇形碰撞范围的x坐标右阈值
    sinR,//2
    0,//3
    -sinR,//4
    -cosR,//5
    -cosR,//6
    -sinR,//7
    -0,//8
    sinR,//9
    cosR,//10
    this.sportRadius//11
];//x坐标结范围数组
var  ball_CollisionrangeZstart=[
    -sinR,//0第1个扇形碰撞范围的z坐标左阈值
    -cosR,//1第2个扇形碰撞范围的z坐标左阈值
    -this.sportRadius,//2
    -this.sportRadius,//3
    -cosR,//4
    -sinR,//5
    0,//6
    sinR,//7
    cosR,//8
    cosR,//9
    sinR,//10
    0//11
];//z坐标起始围数组
var  ball_CollisionrangeZend=[
    0,//0第1个扇形碰撞范围的z坐标右阈值
    -sinR,//1第2个扇形碰撞范围的z坐标右阈值
    -cosR,//2
    -cosR,//3
    -sinR,//4
    0,//5
    sinR,//6
    cosR,//7
    this.sportRadius,//8
    this.sportRadius,//9
    cosR,//10
    sinR//11
];//z坐标结束围数组
//----------------------------------
var  xstart,xend,zstart,zend;//碰撞检测坐标范围
var waterTail="watertail";      //小球皮肤
var pifuon=false;               //默认不设置皮肤
var ballColor=0x1783FF;         //小球颜色
var isDrawNumPic=false;                     //绘制分数的位置
var isWelcome=false;                        //是否允许进入欢迎界面