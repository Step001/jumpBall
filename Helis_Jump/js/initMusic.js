function initMusic()
{
    thismusic=document.createElement("audio");      //初始化背景音乐
    var sourceMusic=document.createElement("source");
    // sourceMusic.src="music/BalancingForce.mp3";
    sourceMusic.src="music/mariage.ogg";
    thismusic.loop=true;
    thismusic.preload = true;
    thismusic.autoplay=false;
    thismusic.appendChild(sourceMusic);
    // thismusic.currentTime=0;
    // thismusic.play();

    crashSound=document.createElement("audio");         //反弹音效
    var sourceMusicCrash=document.createElement("source");
    sourceMusicCrash.src="music/crash.ogg";
    crashSound.loop=false;
    crashSound.preload=true;
    crashSound.autoplay=false;
    crashSound.appendChild(sourceMusicCrash);
    crashSound.onended=crashSound.pause;                //只播放一次

    bombSound=document.createElement("audio");          //爆炸音效
    var bombMusicCrash=document.createElement("source");
    bombMusicCrash.src="music/bomb.ogg";
    bombSound.loop=false;
    bombSound.preload=true;
    bombSound.autoplay=false;
    bombSound.appendChild(bombMusicCrash);
    bombSound.onended=bombSound.pause;                  //一次

    deathSound=document.createElement("audio");             //失败音效
    var sourceMusicdeath=document.createElement("source");
    sourceMusicdeath.src="music/death.ogg";
    deathSound.loop=false;
    deathSound.preload=true;
    deathSound.autoplay=false;
    deathSound.appendChild(sourceMusicdeath);
    deathSound.onended=deathSound.pause;
}