<template>
  <div class="scene">
    <div class="cube-wrapper">
      <div class="cube">
        <div class="cube-faces">
          <div class="cube-face shadow"></div>
          <div class="cube-face bottom"></div>
          <div class="cube-face top"></div>
          <div class="cube-face left"></div>
          <div class="cube-face right"></div>
          <div class="cube-face back"></div>
          <div class="cube-face front"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.scene {
  position: relative;
  z-index: 2;
  height: 240px;
  width: 240px;
  display: grid;
  place-items: center;
}

.cube-wrapper {
  transform-style: preserve-3d;
  animation: bouncing 2s infinite;
}

.cube {
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
  animation: rotation 2s infinite;
}

.cube-faces {
  transform-style: preserve-3d;
  height: 80px;
  width: 80px;
  position: relative;
  transform-origin: 0 0;
  transform: translateX(0) translateY(0) translateZ(-40px);
}

.cube-face {
  position: absolute;
  inset: 0;
}
.cube-face.shadow {
  transform: translateZ(-80px);
  animation: bouncing-shadow 2s infinite;
  background: #110d31ff;
}
.cube-face.top {
  transform: translateZ(80px);
  background: var(--app-initialing-cube-bg-color-1);
  border: solid 1px var(--app-initialing-cube-bd-color-1);
}
.cube-face.front {
  transform-origin: 0 50%;
  transform: rotateY(-90deg);
  background: var(--app-initialing-cube-bg-color-2);
  border: solid 1px var(--app-initialing-cube-bd-color-2);
}
.cube-face.back {
  transform-origin: 0 50%;
  transform: rotateY(-90deg) translateZ(-80px);
  background: var(--app-initialing-cube-bg-color-2);
  border: solid 1px var(--app-initialing-cube-bd-color-2);
}
.cube-face.right {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(-80px);
  background: var(--app-initialing-cube-bg-color-3);
  border: solid 1px var(--app-initialing-cube-bd-color-3);
}
.cube-face.left {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(-80px) translateZ(80px);
  background: var(--app-initialing-cube-bg-color-3);
  border: solid 1px var(--app-initialing-cube-bd-color-3);
}

@keyframes rotation {
  0% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  50% {
    transform: rotateX(45deg) rotateY(0) rotateZ(225deg);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  100% {
    transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
}
@keyframes bouncing {
  0% {
    transform: translateY(-40px);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  45% {
    transform: translateY(40px);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  100% {
    transform: translateY(-40px);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
}
@keyframes bouncing-shadow {
  0% {
    transform: translateZ(-80px) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.05;
  }
  45% {
    transform: translateZ(0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.3;
  }
  100% {
    transform: translateZ(-80px) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.05;
  }
}
</style>
