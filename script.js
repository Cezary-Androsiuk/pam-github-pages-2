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