void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
}

void loop() {
  while (!Serial.available())
    ;
  int button_on = Serial.read();
  if (button_on) {
    digitalWrite(2, HIGH);
  } else {
    digitalWrite(2, LOW);
  }
}