const GENERATE_IMAGE_URL_DEV = 'http://localhost:5000/openai/generateimage';
const GENERATE_IMAGE_URL_PROD = 'https://openai-app-image-generator.vercel.app/openai/generateimage';

/**
 * Request to OpenAI API
 * @param {*} prompt 
 * @param {*} size 
 */
async function generateImageRequest(prompt, size){
    
    try {

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

        return await response.json();

    } catch (error) {
        console.log(error);
        /* document.querySelector('.msg').textContent = error; */
    }
}

export {
    generateImageRequest
}