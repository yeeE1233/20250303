let input, slider, button, dropdown, iframe;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput('TKUET');
  input.size(300, 50);
  input.position(0, 0);

  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(320, 0); // 將滑桿放置在文字框的右側

  button = createButton('跳動文字');
  button.position(480, 0); // 將按鈕放置在滑桿的右側
  button.mousePressed(toggleBounce);

  dropdown = createSelect();
  dropdown.position(600, 0); // 將下拉式選單放置在按鈕的右側
  dropdown.option('淡江大學');
  dropdown.option('教科系');
  dropdown.option('第三周');
  dropdown.changed(goToLink);

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide();

  let cols = Math.floor(width / 150);
  let rows = Math.floor(height / 150);
  for (let i = 0; i <= cols; i++) {
    offsets[i] = [];
    for (let j = 0; j <= rows; j++) {
      offsets[i][j] = random(0, TWO_PI);
    }
  }
}

function draw() {
  background(0); // 設置背景為黑色
  let inputText = input.value();
  let textSizeValue = slider.value(); // 獲取滑桿的值
  textSize(textSizeValue);
  fill(255); // 設置文字顏色為白色
  textAlign(CENTER, CENTER);

  let offset = 150; // 行間距
  let cols = Math.floor(width / offset);
  let rows = Math.floor(height / offset);

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let x = i * offset;
      let y = j * offset;
      if (isBouncing) {
        y += sin(millis() / 1000 + offsets[i][j]) * 20; // 文字上下跳動
      }
      text(inputText, x, y);
    }
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function goToLink() {
  let selected = dropdown.value();
  iframe.show();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw');
  } else if (selected === '教科系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw');
  } else if (selected === '第三周') {
    iframe.attribute('src', 'https://yeee1233.github.io/20250310/');
  }
}
