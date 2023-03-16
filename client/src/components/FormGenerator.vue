<template>
    <main class="p-5">
        <section>
            <form id="generate-form" class="flex flex-col">
                <h1 class="text-6xl py-5 font-sf_bold text-center">
                    <span>AI</span> Image <span>Generator</span>
                </h1>
                <h2 class="text-xl font-sf_regular py-5">Describe the image you would like to generate 👇</h2>
                <div class="form-control flex justify-center">
                    <input type="text" id="prompt" placeholder="Polar bear riding a bike">
                </div>
                <div class="form-control flex justify-between py-5">
                    <label for="size">Select size</label>
                    <select name="size" id="size" class="px-2 py-1 text-gray-300">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <button type="submit" class="submit-btn bg-blue-500 hover:bg-blue-700 text-white font-sf_bold tracking-wide py-3 px-6 rounded-lg w-36 self-center">Generate</button>
            </form>
        </section>

        <section class="image py-10">
            <div class="image-container flex justify-center">
                <h2 class="msg"></h2>
                <img src="" alt="" id="image" class="w-60">
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

#prompt {
    padding: 12px;
    color: #cbcbcb;
}

input {
  border: 1px solid #2b2b2b;
  background-color: #000000;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  color: #929292;
  outline: none;
  width: 400px;
}

input::placeholder{
    color: #ffffff87
}

select {
    border: 1px solid #2b2b2b;
    background-color: #000000;
    border-radius: 7px;
    padding: 12px;
}

select option {
    color: #929292;
}

</style>