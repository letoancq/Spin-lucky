(() => {
  const $ = document.querySelector.bind(document);

  let timer = 7000;
  let isRotating = false;
  let currentRotate = 0;
  let Gifts = [];

  const wheel = $(".wheel");
  const btnStart = $(".btn-start");
  const btnx5 = $(".btn-start-x5");
  const msg = $(".msg");
  const listGifts = $(".listGift");
  const btnreset = $(".btn-reset");

  const listGift = [
    {
      textName: "70.000",
      percent: 2 / 100,
    },
    {
      textName: "60.000",
      percent: 3 / 100,
    },
    {
      textName: "30.000",
      percent: 15 / 100,
    },
    {
      textName: "50.000",
      percent: 5 / 100,
    },
    {
      textName: "100.000",
      percent: 1.5 / 100,
    },
    {
      textName: "20.000",
      percent: 33 / 100,
    },
    {
      textName: "40.000",
      percent: 12 / 100,
    },
    {
      textName: "80.000",
      percent: 3 / 100,
    },
    {
      textName: "200.000",
      percent: 0.5 / 100,
    },
    {
      textName: "10.000",
      percent: 25 / 100,
    },
  ];

  const size = listGift.length;
  const rotate = 360 / size; // Số góc của 1 gift trong vòng quay
  const skewY = 90 - rotate; //Độ nghiêng 1 item

  const renderItems = () => {
    listGift.forEach((item, index) => {
      const itemGift = document.createElement("li");

      itemGift.style.transform = `
        rotate(${rotate * index}deg )
        skewY(-${skewY}deg)
        `;

      itemGift.innerHTML = `
        <p class="text-item ${index % 2 == 0 && "even"}" 
            style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg)"
        >
                <b>${item.textName} Vnđ</b>
        </p>
        `;

      wheel.appendChild(itemGift);
    });
  };

  const rotateWheel = (currentRotate, index) => {
    wheel.style.transform = `rotate(${
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];

    listGift.forEach((item, index) => {
      currentPercent += item.percent;

      randomNumber <= currentPercent &&
        list.push({
          ...item,
          index,
        });
    });

    return list[0];
  };

  const showTextGift = (txt) => {
    setTimeout(() => {
      isRotating = false;
      msg.innerHTML = ` Chúc mừng bạn nhận được: ${txt} Vnđ`;
      const received = Gifts.map((e) => e.textName);
      console.log(received);
      listGifts.innerHTML = received;
    }, timer);
  };

  //Tạo âm thanh và tải tập tin tick.mp3.
  // let audio = new Audio("tick.mp3");
  // function playSound() {
  //   // audio.pause();
  //   // audio.currentTime = 0;
  //   audio.play();
  // }

  const start = () => {
    isRotating = true;
    msg.innerHTML = ``;

    const random = Math.random();
    const gift = getGift(random);

    console.log(gift);
    currentRotate += 360 * 10;

    rotateWheel(currentRotate, gift.index);
    showTextGift(gift.textName);
    Gifts.push(gift);
    // playSound();
  };

  btnStart.addEventListener("click", () => {
    !isRotating && start();
  });

  btnx5.addEventListener("click", () => {
    !isRotating && (start(), start(), start(), start(), start());
  });

  btnreset.addEventListener("click", () => {
    Gifts = [];
    const received = Gifts.map((e) => e.textName);
    console.log(received);
    listGifts.innerHTML = received + "Vnđ";
  });

  renderItems();
})();
