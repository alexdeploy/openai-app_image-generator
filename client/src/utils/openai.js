const GENERATE_IMAGE_URL_DEV = 'http://localhost:5000/openai/generateimage';
const GENERATE_IMAGE_URL_PROD = 'https://openai-app-image-generator.vercel.app/openai/generateimage';

/**
 * Request to OpenAI API
 * @param {*} prompt 
 * @param {*} size 
 */
async function generateImageRequest(prompt, size){
    
    try {

        this.showLoading()
        document.querySelector('.submit-btn').setAttribute('disabled', true);

        const response = await fetch(GENERATE_IMAGE_URL_PROD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, size })
        })

        /* check if response is success */
        if (!response.ok) {
            /* this.showLoading(); */
            throw new Error('Something went wrong');
        }

        const data = await response.json();

        const imageUrl = data.data;
        
        document.querySelector('#image').setAttribute('src', imageUrl);
        document.querySelector('.submit-btn').toggleAttribute("disabled");

        this.showLoading();

    } catch (error) {
        this.showLoading();
        document.querySelector('.msg').textContent = error;
    }
}

export {
    generateImageRequest
}