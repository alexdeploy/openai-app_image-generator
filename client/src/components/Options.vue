<template>
    <div class="options-menu">

        <div class="options hiden max-h-80 overflow-y-auto bg-dark_blue rounded-2xl">

            <div id="toucher" class="w-full flex justify-center bg-dark_blue sticky top-0 hover:cursor-grab">
                <div id="touch-icon" class="w-20 h-1 rounded-xl bg-slate-600 my-3"></div>
            </div>

            <div class="option px-5" v-for="option in options" :key="option.value">
    
                <div class="option-name text-white p-2">{{ option.name }}</div>
    
                <div class="option-options flex flex-wrap">
    
                    <div id="value" class="bg-gray-900 w-fit px-3 py-1 m-0.5 rounded-full text-white" v-for="optionValue in option.values" :key="optionValue" :value=optionValue @click="activeValue(option.name, optionValue)">
                        {{ optionValue }}
                    </div>
    
                </div>
    
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Options',
    props: {
        activeOptions: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            options: [
                {name: 'Size', icon:'', values: ['small', 'medium', 'large']},
                {name: 'Art', icon: '', values: ['abstract', 'ilustration', 'photo', 'sketch', 'watercolor', 'graffiti', 'caricature', 'painting', 'drawing', 'cartoon', 'comic', 'illustration', 'portrait', 'landscape', 'hyperrealism', 'realism', 'impressionism']},
                {name: 'Resolution', icon: '', values: ['HD', 'Full-HD', 'Ultra-HD', '4K', '8K', 'Megapixel']},
                {name: 'Lighting', icon: '', values: ['daylight', 'night', 'dusk', 'dawn', 'sunrise', 'sunset', 'afternoon', 'morning', 'evening', 'midnight', 'noon', 'twilight', 'golden-hour']},
            ],
        }
    },
    methods: {
        activeValue(option, value){

            // check if value is currently active
            const currentValues = this.activeOptions.map(option => option.value);
            currentValues.includes(value) ? this.activeOptions.splice(currentValues.indexOf(value), 1) : this.activeOptions.push({option: option, value: value});

            // set/unset active class
            const elemento = document.querySelector('[value="' + value + '"]');
            elemento.classList.toggle('active');

        }
    }
}
</script>

<style>

#value {
    cursor: pointer;
    border: 1px solid #21242e;
}

#value.active {
    background-color: #373a43;
}

#value:hover {
    background-color: #21242e;
}

.options::-webkit-scrollbar {
  display: none;
}

.options-menu {
    position: relative;
}

.options {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    /* transform: translateY(-100%); */
    transition: transform 0.3s ease-in-out;
}

.options.show {
  transform: translateY(-100%);
}

.options.hiden {
    transform: translateY(0);
}

.options .option {
  display: block;
  text-decoration: none;
  color: #333;
}


</style>