<template>
  <div style="height: calc(200vh + 1730px);" id="scrollingBlock">
    <div class="scene0" id="mining">
      <img src="/img/mainpage/landings/03_phone-mining.jpg" alt="">
    </div>
    <div id="firstScene">
      <div class="scene1">
        <img src="/img/mainpage/landings/04_our-mission.jpg" alt="">
      </div>
      <div class="scene2" id="world">
        <img src="/img/mainpage/landings/05_changing-the-world.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "our-mission",
    mounted() {
      setTimeout(() => {
        let controller = new ScrollMagic.Controller();
        let wipeAnim = new TimelineMax()
          .fromTo(".scene2", 1, {y: "0%"}, {y: "-100%", ease: Linear.easeNote});
        window.scene = new ScrollMagic.Scene({
          triggerElement: '#firstScene',
          triggerHook: '0.08',
          duration: '200%'
        }).setPin("#firstScene").setTween(wipeAnim).addTo(controller);
      }, 1000);
    }
  }
</script>

<style scoped>

</style>
