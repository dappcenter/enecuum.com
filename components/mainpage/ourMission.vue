<template>
  <div id="scrollingBlock" class="scrollingBlock">
    <div id="firstScene">
      <div class="scene0" id="mining">
        <div class="block-wrapper standart mining">
          <div class="block-inner">
            <div class="block">
              <div class="block-title">Phone Mining</div>
              <div class="block-description">On average, people only utilize about 10% of data processing capabilities
                of
                their smartphones. Enecuum leases this unused capacity and in return rewards the device owner. The
                smartphone
                becomes a part of a huge network, with a special algorithm Trinity using the capacity of each device in
                the
                most effective way.
                Every smartphone on the network will participate in the publication of microblocks on a daily basis and
                receive a reward for this. This is real-world mobile mining, which opens doors of the crypto world to
                millions
                of new users. A user simply needs to download the Enecuum App, whose processing load on the smartphone
                is
                comparable to that of a messenger app.
              </div>
              <div class="block-button">
                <button class="button-link blue">HOW IT WORKS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scene1">
        <div class="block-wrapper standart mission">
          <div class="block-inner">
            <div class="block">
              <div class="block-title">Our mission</div>
              <div class="block-description">Enecuum allows each smartphone owner to participate in a global network and
                get rewarded for it. Crypto technologies should not belong to a small community of technological elite.
                On the contrary, everyone should have the opportunity to become a part of a beautiful future. We make
                access to this advanced technology simple and easy. This is what the Blockchain of tomorrow should be.
              </div>
              <div class="block-button">
                <button class="button-link blue">HOW IT WORKS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scene2" id="world">
        <div class="block-wrapper standart changeworld">
          <div class="block-inner">
            <div class="block">
              <div class="block-title">Changing the world</div>
              <div class="block-description">Enecuum is an ideal platform for companies that need a fast, secure, and
                decentralized blockchain. We are pleased to have created a technology that can radically ease various
                areas of life and business: from providing free mobile communication for subscribers to putting
                scientific breakthroughs within reach with unlimited computing capacity.
              </div>
              <div class="block-button">
                <button class="button-link blue">MORE ABOUT USECASES</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "our-mission",
    mounted() {
      if (window.outerWidth > 991) {
        setTimeout(() => {
          let controller = new ScrollMagic.Controller();
          let wipeAnim = new TimelineMax()
            .fromTo(".scene0", 1, {y: "0%"}, {y: "0%", ease: Linear.easeNote})
            .fromTo(".scene1", 1, {y: "0%"}, {y: "-100%", ease: Linear.easeNote})
            .fromTo(".scene2", 1, {y: "-100%"}, {y: "-200%", ease: Linear.easeNote});
          window.scene = new ScrollMagic.Scene({
            triggerElement: '#firstScene',
            triggerHook: '0.08',
            duration: '200%'
          }).setPin("#firstScene").setTween(wipeAnim).addTo(controller);
          document.getElementById('scrollingBlock').style.height = document.getElementById('firstScene').offsetHeight + 100 + 'px';
        }, 1000);
      }
    }
  }
</script>
