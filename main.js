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

  const listGift = [
    {
      textName: "Trà Sữa",
      percent: 5 / 100,
    },
    {
      textName: "Bim Bim",
      percent: 10 / 100,
    },
    {
      textName: "Kẹo mút",
      percent: 15 / 100,
    },
    {
      textName: "Kiss",
      percent: 10 / 100,
    },
    {
      textName: "Kem lớn",
      percent: 5 / 100,
    },
    {
      textName: "Ôm",
      percent: 18 / 100,
    },
    {
      textName: "Kem nhỏ",
      percent: 12 / 100,
    },
    {
      textName: "1 hộp xúc xích",
      percent: 7 / 100,
    },
    {
      textName: "Đi chơi TTTM",
      percent: 3 / 100,
    },
    {
      textName: "Nothing",
      percent: 20 / 100,
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
                <b>${item.textName}</b>
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
      msg.innerHTML = ` Chúc mừng bạn nhận được: ${txt}`;
      const received = Gifts.map((e) => e.textName);
      console.log(received);
      listGifts.innerHTML = received;
    }, timer);
  };

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
  };

  btnStart.addEventListener("click", () => {
    !isRotating && start();
  });

  btnx5.addEventListener("click", () => {
    !isRotating && (start(), start(), start(), start(), start());
  });

  renderItems();
})();
