function onSubmit(e) {

    console.log("ciao");
    e.preventDefault();
  
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
  
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
  
    if (prompt === '') {
      alert('Please add some text');
      return;
    }
  
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {

    try {

        showSpinner(); //avvio spinner

        const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
            size,
        }),
        });

        if (!response.ok) {
            showSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();

        const imageUrl = data.data;

        document.querySelector('#image').src = imageUrl;

        showSpinner(); //si toglie spinner
        showImage(); //mostro l'immagine
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function showSpinner() {
    document.querySelector('#spinner-container').classList.toggle('show-spinner');
}

function showImage() {
    document.querySelector('.image').classList.toggle('show-image');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);

document.querySelector('.close').addEventListener('click', () => {

    showImage();

} );
  