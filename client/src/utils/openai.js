const GENERATE_IMAGE_URL = 'http://localhost:5000/openai/generateimage';
/**
 * Request to OpenAI API
 * @param {*} prompt 
 * @param {*} size 
 */
async function generateImageRequest(prompt, size){
    
    try {

        this.showLoading()

        const response = await fetch(GENERATE_IMAGE_URL, {
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

        this.showLoading();

    } catch (error) {
        this.showLoading();
        document.querySelector('.msg').textContent = error;
    }
}

export {
    generateImageRequest
}