<template>
    <div class="pt-24">

        <h2 class="text-md font-sf_regular py-5">Describe the image you would like to generate 👇</h2>
<!-- 
        <div id="blackboard" class="w-full rounded-xl bg-gray-900 -z-10 flex justify-center">
            <Loading />
            <div id="empty-msg" class="flex flex-col h-full justify-center items-center">
                <h2 class="text-xl font-sf_regular py-5 text-gray-500">Describe the image you would like to generate</h2>
                <span>👇</span>
            </div>
            <img src="" alt="" id="image" class="max-h-full p-10">

        </div>
 -->
        <!-- options -->
        <!-- <Options :activeOptions="activeOptions" class="z-0" /> -->

        <form id="generate-form" class="flex flex-col sm:mx-auto">

            <div class="form-control flex w-full">
                <input type="text" id="prompt" placeholder="Polar bear riding a bike">
                <button type="submit" class="submit-btn bg-blue-500 flex justify-center">
                    <img src="../assets/icons/send.svg" alt="" class="w-6 self-center md:hidden">
                    <span class="hidden md:block self-center mx-7 text-white">Generate</span>
                </button>
            </div>

            <button class="p-2 bg-white mt-5 w-full z-10" @click="showOptions()" type="button" >
                Options
            </button>

            <!-- <div class="form-control flex justify-between py-5 z-10 bg-black pb-32">
                <label for="size">Select size</label>
                <select name="size" id="size" class="px-2 py-1 text-gray-300">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large" selected="selected">Large</option>
                </select>
            </div> -->
        </form>
        
    </div>
</template>

<script>
import Loading from './Loading.vue'
import Options from './Options.vue'
import { generateImageRequest } from '../utils/openai.js'

export default {
  components: { Loading, Options },
    name: 'ImageGenerator',
    data() {
        return {
            activeOptions: []
        }
    },
    methods: {
        showLoading(){
            document.querySelector('#loading').classList.remove('hide');
        },
        hideLoading(){
            document.querySelector('#loading').classList.add('hide');
        },
        showOptions(){
            document.querySelector('.options').classList.toggle('show');
            document.querySelector('.options').classList.toggle('hiden');
           /*  document.querySelector('.options').classList.toggle('hidden'); */
        },
        clearOptions(){
            this.activeOptions = [];
            // remove active class from values
            document.querySelectorAll('#value').forEach(option => {
                option.classList.remove('active');
            })
        },
        draw(response){
            const imageUrl = response.data;
            // print the image with css effect (draw the image)
            document.querySelector('#image').setAttribute('src', imageUrl);
            this.hideLoading();
            document.querySelector('.submit-btn').removeAttribute('disabled');
        },
        onSubmit(event){

            event.preventDefault()

            /* make sure to remove any error message and previous image. */
            /* document.querySelector('.msg').textContent = ''; */
            document.querySelector('#image').setAttribute('src', '');

            /* get the values from form */
            var prompt = document.querySelector('#prompt').value
            const size = document.querySelector('#size').value
            const options = this.activeOptions;
            console.log(options);

            /* check if prompt is empty */
            if(prompt == '') alert('You have to add some text');

            // add options values to prompt
            options.forEach(option => {
                prompt += ', ' + option.value
            })

            console.log(prompt)

            /* set thinking */
            // check if text is empty or meet some requisites.
            
            document.querySelector('.submit-btn').setAttribute('disabled', true);
            document.querySelector('#empty-msg').classList.add('hidden');

            // check if options has 'hide' or 'show' class and toggle them
            if(document.querySelector('.options').classList.contains('show')){
                this.showOptions();
            }

            try {
                // generate image request and returns the image url
                this.showLoading();
                this.generateImageRequest(prompt, size).then(response => this.draw(response));

                this.clearOptions();

            } catch (error) {
                this.hideLoading();
                // show error message to user through a toast
                console.log(error);
            }
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

.hide {
    display: none;
}

#prompt {
    padding: 12px;
    color: #cbcbcb;
    height: 50px;
}

#blackboard {
    height: 42rem;
    border-radius: 10px 10px 0px 0px;
}

input {
  background-color: #FFF;
  border-radius: 10px 0px 0px 10px;
  padding: 12px;
  font-size: 16px;
  color: #929292;
  outline: none;
  width: 100%;
  @apply shadow-sm;
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

.submit-btn {
    border-radius: 0px 10px 10px 0px;
    height: 50px;
    min-width: 50px;
    display: flex;
}

button:disabled,
button[disabled]{
    opacity: 0.7;
    cursor: not-allowed;
}

</style>