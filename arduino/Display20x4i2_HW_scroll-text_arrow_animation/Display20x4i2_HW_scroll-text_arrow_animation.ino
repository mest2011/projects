#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Define o endereço utilizado pelo Adaptador I2C
LiquidCrystal_I2C lcd(0x27, 20, 4);

unsigned long previousMillisScroll = 0;
unsigned long previousMillisPrint = 0;
const long intervalScroll = 500; // Intervalo de tempo para a rolagem
const long intervalPrint = 300; // Intervalo de tempo para a impressão

// Array de 5 mensagens para rolar
const char* url1[] = {
    ">    MESTTECH.COM.BR",
    "->   MESTTECH.COM.BR",
    " ->  MESTTECH.COM.BR",
    "  -> MESTTECH.COM.BR",
    "   ->MESTTECH.COM.BR",
};
const char* url2[] = {
    ">      COFRIN.COM.BR",
    "->     COFRIN.COM.BR",
    " ->    COFRIN.COM.BR",
    "  ->   COFRIN.COM.BR",
    "   ->  COFRIN.COM.BR",
    "    -> COFRIN.COM.BR",
    "     ->COFRIN.COM.BR",
};
// Define the messages to scroll
const char* message1 = "Ferramentas e tutoriais e programacao                    ";
const char* message2 = "Tenha controle do seu dinheiro!                    ";

unsigned long currentMillis = millis();

void setup() {
    // Inicializa o LCD e o backlight
    lcd.init();
    lcd.backlight();
    lcd.clear();
}

void loop() {
    static int scrollIndex1 = 0;
    static int scrollIndex2 = 0;
    static int url1Index = 0;
    static int url2Index = 0;
    currentMillis = millis();

    // A cada 500ms imprimir a mensagem
    if (currentMillis - previousMillisPrint >= intervalPrint) {
        previousMillisPrint = currentMillis;
        lcd.setCursor(0, 0);
        // a cada impressao, imprimir a proxima mensagem e ao final do array, voltar para o inicio
        lcd.print(url1[url1Index]); 
        url1Index = (url1Index + 1) % 5;

        lcd.setCursor(0, 2);
        lcd.print(url2[url2Index]);
        url2Index = (url2Index + 1) % 7;
    }

    // A cada 500ms rolar a mensagem
    if (currentMillis - previousMillisScroll >= intervalScroll) {
        previousMillisScroll = currentMillis;
        scrollMessage(message1, 0, 1, scrollIndex1);
        scrollIndex1 = (scrollIndex1 + 1) % strlen(message1);
        scrollMessage(message2, 0, 3, scrollIndex2);
        scrollIndex2 = (scrollIndex2 + 1) % strlen(message2);
    }
}

void scrollMessage(const char* message, int col, int row, int index) {
    int len = strlen(message);
    char buffer[21]; // Buffer para armazenar a substring de 20 caracteres + null terminator

    if (len < 20) {
        // Se a mensagem for menor que 20 caracteres, preenche com espaços
        snprintf(buffer, 21, "%-20s", message);
    } else {
        // Se a mensagem for maior ou igual a 20 caracteres, pega uma substring de 20 caracteres
        strncpy(buffer, message + index, 20);
        buffer[20] = '\0'; // Adiciona o null terminator
    }

    lcd.setCursor(col, row);
    lcd.print(buffer);
}
