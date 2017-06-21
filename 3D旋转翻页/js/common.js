// 初始化3D旋转相册
var swiper = new Swiper('.content', {
    // 翻页配置
    pagination: '.swiper-pagination',
    // “effect”可配置项有"slide", "fade", "cube", "coverflow", "flip"
    effect: 'cube', 
    grabCursor: true,
    fade: {
      crossFade: false
    },
    cube: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94
    },
    coverflow: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true
    },
    flip: {
      slideShadows : true,
      limitRotation: true
    }  
});