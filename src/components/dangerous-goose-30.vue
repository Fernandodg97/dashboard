<template>
  <div class="full-progress">
    <div class="content">
      <div class="text">
        <span>80</span>
        <span>%</span>
      </div>
      <div class="progresses">
        <div class="main-prog">
          <div class="separ"></div>
          <div class="separ"></div>
          <div class="separ"></div>
          <div class="separ"></div>
          <div class="separ"></div>
        </div>
        <div class="second-circle"></div>
        <div class="third-circle"></div>

        <div class="base-circle">
          <div class="separ2"></div>
          <div class="separ2"></div>
          <div class="separ2"></div>
          <div class="separ2"></div>
          <div class="separ2"></div>
          <div class="separ2"></div>
          <div class="separ2"></div>
          <div class="separ2"></div>
        </div>
        <div class="last-progress"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @keyframes move-second-circle {
    50% {
      bottom: -42%;
    }
    100% {
      bottom: -50%;
    }
  }

  @keyframes move-third-circle {
    50% {
      bottom: -66%;
    }
    100% {
      bottom: -75%;
    }
  }

  @keyframes move-last-progress {
    50% {
      bottom: -64%;
    }
    100% {
      bottom: -70%;
    }
  }

  @keyframes move-base {
    50% {
      bottom: -94%;
    }
    100% {
      bottom: -100%;
    }
  }

  .main-prog {
    margin: auto;
    width: 300px;
    height: 300px;
    border-radius: 300px;
    position: relative;
    background-color: #212121;
  }
  .main-prog::after {
    content: "";
    display: block;
    position: absolute;
    left: -40px;
    top: -40px;
    right: -40px;
    bottom: -40px;
    background-color: transparent;
    background-image: conic-gradient(white, white 80%, #414141 65%);
    z-index: -1;
    border-radius: 300px;
  }
  .main-prog::before {
    content: "";
    display: block;
    position: absolute;
    border: 15px solid #303030;
    height: 430px;
    width: 430px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  .main-prog > .separ {
    height: 200px;
    width: 10px;
    background: #212121;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    transform-origin: bottom center;
  }
  .main-prog > .separ:nth-child(1) {
    transform: translate(-50%, -100%) rotate(0deg);
  }
  .main-prog > .separ:nth-child(2) {
    transform: translate(-50%, -100%) rotate(72deg);
  }

  .main-prog > .separ:nth-child(3) {
    transform: translate(-50%, -100%) rotate(144deg);
  }
  .separ:nth-child(3)::before {
    content: "40";
    color: white;
    position: absolute;
    transform: translate(-50%, -36px) rotate(180deg);
    font-size: 22px;
    font-family: sans-serif;
    font-weight: bold;
  }
  .main-prog > .separ:nth-child(4) {
    transform: translate(-50%, -100%) rotate(216deg);
  }
  .separ:nth-child(4)::before {
    content: "60";
    color: white;
    position: absolute;
    transform: translate(-50%, -36px) rotate(180deg);
    font-size: 22px;
    font-family: sans-serif;
    font-weight: bold;
  }
  .main-prog > .separ:nth-child(5) {
    transform: translate(-50%, -100%) rotate(288deg);
  }
  .content {
    width: 100%;
    height: 100%;
  }
  .progresses {
    transform: rotateX(50deg) scaleY(0.6);
    position: relative;
  }

  .second-circle {
    border: 6px solid transparent;
    border-top-color: rgba(255, 255, 255, 0.2);
    border-left-color: rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: #4d4d4d;
    height: 250px;
    width: 250px;
    position: absolute;
    left: 50%;
    bottom: -50%;
    transform: translateX(-50%);
    border-radius: 50%;
    z-index: 2;
    animation: move-second-circle 3s ease-in-out infinite;
  }
  .third-circle {
    border: 3px solid #a6a6a6;
    height: 130px;
    width: 130px;
    position: absolute;
    left: 50%;
    bottom: -75%;
    transform: translateX(-50%);
    border-radius: 50%;
    z-index: 1;
    animation: move-third-circle 3s ease-in-out infinite;
    animation-delay: 300ms;
  }
  .last-progress {
    position: absolute;
    margin: auto;
    left: 50%;
    bottom: -70%;
    transform: translateX(-50%);
    border-radius: 50%;
    z-index: 0;
    overflow: visible;
    animation: move-last-progress 3s ease-in-out infinite;
    animation-delay: 600ms;
  }
  .last-progress::after {
    content: "";
    display: block;
    position: absolute;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    background: #212121;
    height: 58px;
    width: 58px;
    border-radius: 50%;
  }
  .last-progress::before {
    content: "";
    display: block;
    position: absolute;
    left: -40px;
    top: -40px;
    right: -40px;
    bottom: -40px;
    background-color: transparent;
    background-image: conic-gradient(white, white 65%, #414141 65%);
    z-index: 0;
    border-radius: 300px;
  }
  .base-circle {
    border: 40px solid rgba(255, 255, 255, 0.05);
    height: 180px;
    width: 180px;
    position: absolute;
    left: 50%;
    bottom: -100%;
    transform: translateX(-50%);
    border-radius: 50%;
    z-index: -2;
    animation: move-base 3s ease-in-out infinite;
    animation-delay: 600ms;
  }

  .base-circle > .separ2 {
    height: 100px;
    width: 3px;
    background-color: #212121;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    transform-origin: bottom center;
  }
  .separ2:nth-child(2) {
    transform: translate(-50%, -100%) rotate(45deg);
  }
  .separ2:nth-child(3) {
    transform: translate(-50%, -100%) rotate(90deg);
  }
  .separ2:nth-child(4) {
    transform: translate(-50%, -100%) rotate(135deg);
  }
  .separ2:nth-child(5) {
    transform: translate(-50%, -100%) rotate(180deg);
  }
  .separ2:nth-child(6) {
    transform: translate(-50%, -100%) rotate(225deg);
  }
  .separ2:nth-child(7) {
    transform: translate(-50%, -100%) rotate(270deg);
  }
  .separ2:nth-child(8) {
    transform: translate(-50%, -100%) rotate(315deg);
  }

  .text {
    position: absolute;
    top: 40%;
    left: 50%;
    color: #2098fb;
    z-index: 4;
    transform: translate(-50%, -50%);
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 0px 12px 22px rgba(0, 0, 0, 0.8);
  }
  .text span:first-child {
    font-size: 100px;
    font-weight: bold;
    line-height: 85px;
  }
  .text span:last-child {
    font-size: 22px;
  }
  .full-progress {
    height: 500px;
    width: 550px;
    display: flex;
    justify-content: center;
    border-radius: 14px;
  }
</style>