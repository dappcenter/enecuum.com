<template>
  <div class="roadmap pureBlock" id="roadmap">
    <img src="/img/mainpage/landings/06_roadmap.jpg" alt="">
  </div>
</template>

<script>

  export default {
    name: "roadmap",
    props: ['data'],
    mounted() {
      setTimeout(() => {
        let widthDiff = window.innerWidth - document.querySelector('.roadmap img').offsetWidth;
        let controller = new ScrollMagic.Controller();
        let wipeAnim = new TimelineMax()
          .fromTo(".roadmap img", 1, {x: "0px"}, {x: widthDiff + 'px', ease: Linear.easeNote});
        new ScrollMagic.Scene({
          triggerElement: '#roadmap',
          triggerHook: '0.10',
          duration: '200%'
        }).setPin("#roadmap").setTween(wipeAnim).addTo(controller);
      }, 1300);
    }
  }
</script>
