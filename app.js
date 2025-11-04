// 1. Pobierz elementy ze strony
const videoElement = document.getElementById('webcam');
const startButton = document.getElementById('startButton');

// 2. Funkcja uruchamiająca kamerę
async function startCamera() {
    try {
        // 3. Poproś o dostęp do kamery
        // 'video: true' oznacza, że chcemy wideo.
        // 'audio: false' oznacza, że nie potrzebujemy dźwięku.
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: false 
        });

        // 4. Jeśli się uda, przypisz strumień do elementu <video>
        videoElement.srcObject = stream;
        
        // Ukryj przycisk po pomyślnym uruchomieniu
        startButton.style.display = 'none';

    } catch (err) {
        // 5. Obsłuż błędy (np. użytkownik odmówił dostępu)
        console.error("Wystąpił błąd podczas dostępu do kamery:", err);
        alert("Nie można uzyskać dostępu do kamery. Sprawdź uprawnienia w przeglądarce.");
    }
}

// 6. Nasłuchuj na kliknięcie przycisku
startButton.addEventListener('click', startCamera);