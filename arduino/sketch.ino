#define STRIP_PIN 13     // пин ленты
#define NUMLEDS 30      // кол-во светодиодов
#define COLOR_DEBTH 3
#include <microLED.h>   // подключаем библу
microLED<NUMLEDS, STRIP_PIN, MLED_NO_CLOCK, LED_WS2813, ORDER_GRB, CLI_AVER> strip;


void setup() {
  Serial.begin(9600);

  strip.setBrightness(60);
  // яркость применяется по CRT гамме
  // применяется при выводе .show() !

  // очистка буфера (выключить диоды, чёрный цвет)
  strip.clear();
  // применяется при выводе .show() !

  strip.show(); // вывод изменений на ленту
  delay(1);
}

void loop() {
  while (!Serial.available());
  int button_on = Serial.read();
  if (button_on == 1) {
    strip.set(0, mRGB(255, 0, 0));
  } else if (button_on == 2) {
    strip.set(1, mRGB(0, 255, 0));
  } else {
    strip.clear(); // отключение светодиодной ленты
  }
    strip.show(); // вывод изменений на ленту
    delay(500);
}