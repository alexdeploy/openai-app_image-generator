<template>
    <main>
        <section>
            <form id="generate-form" class="flex flex-col">
                <h1 class="text-4xl py-5 flex justify-center">Describe an image</h1>
                <div class="form-control flex justify-center">
                    <input type="text" id="prompt" placeholder="Enter Text">
                </div>
                <div class="form-control flex justify-center py-5">
                    <select name="size" id="size">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <button type="submit" class="submit-btn">Generate</button>
            </form>
        </section>

        <section class="image">
            <div class="image-container">
                <h2 class="msg"></h2>
                <img src="" alt="" id="image">
            </div>
        </section>

        <Loading />

    </main>
</template>

<script>
import Loading from './Loading.vue'
import { generateImageRequest } from '../utils/openai.js'

export default {
  components: { Loading },
    name: 'FormGenerator',
    methods: {
        showLoading(){
            document.querySelector('#loading').classList.toggle('hide');
        },
        onSubmit(event){

            event.preventDefault()

            /* make sure to remove any error message and previous image. */
            document.querySelector('.msg').textContent = '';
            document.querySelector('#image').setAttribute('src', '');

            /* get the values from form */
            const prompt = document.querySelector('#prompt').value
            const size = document.querySelector('#size').value

            /* check if prompt is empty */
            if(prompt == '') alert('You have to add some text');

            this.generateImageRequest(prompt, size);
            
        },
        generateImageRequest
    },
    mounted() {
        /* set submit event to form */
        document.querySelector('#generate-form').addEventListener('submit', this.onSubmit)
    },
}
</script>

<style>

</style>