#define STRIP_PIN 13  // пин ленты
#define NUMLEDS 30    // кол-во светодиодов
#define COLOR_DEBTH 3
#include <microLED.h>  // подключаем библу
microLED<NUMLEDS, STRIP_PIN, MLED_NO_CLOCK, LED_WS2811, ORDER_GRB, CLI_AVER>
    strip;

void setup() {
  Serial.begin(9600);

  randomSeed(analogRead(0));

  strip.setBrightness(60);
  // яркость применяется по CRT гамме
  // применяется при выводе .show() !

  // очистка буфера (выключить диоды, чёрный цвет)
  strip.clear();
  // применяется при выводе .show() !

  strip.show();  // вывод изменений на ленту
  delay(1);
}

void loop() {
  while (!Serial.available())
    ;
  int led = Serial.read();
  long red = random(0, 255);
  long green = random(0, 255);
  long blue = random(0, 255);
  if (led < 22) {
    strip.set(led, mRGB(red, green, blue));
  } else if (led == 22) {
    strip.fill(22, 30, mMaroon);
  } else if (led == 23) {
    strip.fill(30, 35, mYellow);
  } else if (led == 24) {
    strip.fill(35, 40, mMaroon);
  } else if (led == 25) {
    strip.fill(40, 42, mOlive);
  } else if (led == 26) {
    strip.set(42, mLime);
  } else if (led == 27) {
    strip.set(43, mGreen);
  } else if (led == 28) {
    strip.fill(44, 49, mAqua);
  } else if (led == 29) {
    strip.fill(49, 52, mTeal);
  } else if (led > 29) {
    strip.set((led + 22), mRGB(red, green, blue));
    //  } else if (led == 31) {
    //    strip.set(53, mRGB( red, green, blue));
    //  } else if (led == 32) {
    //    strip.set(54, mRGB( red, green, blue));
    //  } else if (led == 33) {
    //    strip.set(55, mRGB( red, green, blue));
    //  } else if (led == 34) {
    //    strip.set(56, mRGB( red, green, blue));
    //  } else if (led == 35) {
    //    strip.set(57, mRGB( red, green, blue));
    //  } else if (led == 36) {
    //    strip.set(58, mRGB( red, green, blue));
    //  } else if (led == 37) {
    //    strip.set(59, mRGB( red, green, blue));
    //  } else if (led == 38) {
    //    strip.set(60, mRGB( red, green, blue));
    //  } else if (led == 39) {
    //    strip.set(61, mRGB( red, green, blue));
    //  } else if (led == 40) {
    //    strip.set(62, mRGB( red, green, blue));
  } else if (led == 100) {
    strip.clear();  // отключение светодиодной ленты
  }
  strip.show();  // вывод изменений на ленту
  delay(500);
}