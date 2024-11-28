//Configured for nodeMCU ESP8266
#define analogicMoisture A0 
#define digitalMoisture 13 
#define alertLight 14

int analogicMoistureValue; 
int digitalMoistureValue; 

void setup() {
  Serial.begin(9600);
  pinMode(analogicMoisture, INPUT); 
  pinMode(digitalMoisture, INPUT); 
  pinMode(alertLight, OUTPUT);
}

void loop() {
  analogicMoistureValue = analogRead(analogicMoisture); 
  analogicMoistureValue = map(analogicMoistureValue, 1023, 315, 0, 100); 
  Serial.print("Moisture readed: "); 
  Serial.print(analogicMoistureValue); 
  Serial.println(" % " );

  digitalMoistureValue = digitalRead(digitalMoisture);
  
  if (analogicMoistureValue > 20) { 
    Serial.println("Status: Wet ground");
    digitalWrite(alertLight, LOW);
  }
  else { 
    Serial.println("Status: Dry ground");
    digitalWrite(alertLight, HIGH);
  }

  delay(500); 
}
