<template>
  <div class="roadmap" id="roadmap">
    <div class="roadmap-title-wrapper">
      <h3 class="roadmap-title">Roadmap</h3>
    </div>
    <img src="/img/mainpage/landings/roadmap.png" alt="" id="roadmapImg">
  </div>
</template>

<script>

  export default {
    name: "roadmap",
    props: ['data'],
    mounted() {
      setTimeout(() => {
        document.getElementById('roadmapImg').style.height = window.innerHeight - 80 + 'px';
        if (window.outerWidth > 768) {
          this.height = window.outerHeight - 80;
          let widthDiff = window.innerWidth - document.querySelector('.roadmap img').offsetWidth;
          let controller = new ScrollMagic.Controller();
          let wipeAnim = new TimelineMax()
            .fromTo(".roadmap img", 1, {x: "0px"}, {x: widthDiff + 'px', ease: Linear.easeNote});
          new ScrollMagic.Scene({
            triggerElement: '#roadmap',
            triggerHook: '0.10',
            duration: '200%'
          }).setPin("#roadmap").setTween(wipeAnim).addTo(controller);
        }
      }, 1300);
    }
  }
</script>
