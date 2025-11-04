console.log("script included");


async function startCamera(){
    console.log("starting cammera...");
    try{
        const videoOutputElement = document.getElementById('webcam');
    
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
    
        videoOutputElement.srcObject = stream
        
        document.getElementById('cammeraStarterButton').disabled = true;
    }
    catch(err)
    {
        alert("Error: " + err);
    }
}

document.getElementById('cammeraStarterButton').addEventListener('click', startCamera);




const scanButton = document.getElementById('scanButton');
const log = document.getElementById('log');

scanButton.addEventListener('click', async () => {
    log.textContent = "Zbliż tag NFC do czytnika...";

    try {
        // 1. Utwórz nową instancję czytnika
        const reader = new NDEFReader();

        // 2. Rozpocznij skanowanie
        // To spowoduje wyświetlenie natywnego okienka systemowego
        await reader.scan();
        log.textContent = "Skanowanie aktywne. Czekam na tag...";

        // 3. Dodaj nasłuchiwanie na zdarzenie 'reading'
        reader.addEventListener('reading', event => {
            console.log("Tag odczytany!");
            log.textContent = "Tag odczytany!\n";

            const message = event.message;
            
            // Przejdź przez wszystkie rekordy na tagu
            for (const record of message.records) {
                log.textContent += `> Rekord typu: ${record.recordType}\n`;

                // Spróbuj odkodować tekst (jeśli to rekord tekstowy)
                if (record.recordType === "text") {
                    const textDecoder = new TextDecoder(record.encoding);
                    const text = textDecoder.decode(record.data);
                    log.textContent += `> Zawartość (tekst): ${text}\n`;
                } 
                // Spróbuj odkodować URL
                else if (record.recordType === "url") {
                    const textDecoder = new TextDecoder();
                    const url = textDecoder.decode(record.data);
                    log.textContent += `> Zawartość (URL): ${url}\n`;
                } 
                // Inne typy danych
                else {
                    log.textContent += `> (Nie można wyświetlić danych tego typu)\n`;
                }
            }
        });

        // Obsługa błędów odczytu
        reader.addEventListener('readingerror', () => {
            log.textContent = "Błąd odczytu taga.";
        });

    } catch (error) {
        // Obsługa błędów (np. użytkownik anulował skanowanie)
        log.textContent = `Błąd: ${error}`;
        console.error("Błąd Web NFC: ", error);
    }
});