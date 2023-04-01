<template>
  <section class="pt-20">
    <h2 class="text-md font-sf_bold tracking-normal py-5">EXAMPLES</h2>

    <div class="image-gallery">
    <div v-for="(image, index) in images" :key="index" class="image-gallery-item">
      <div class="shadow-md">
        <img :src="image.src" alt="Image">
        <div class="p-3">
          <span class="">"{{ image.prompt }}"</span>
          <div class="example-options cursor-grab flex mt-3">
            <span v-for="option in image.options" :key="option" class="example-option min-w-fit px-2 py-1 mx-1">
              {{ option.toString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  </section>
</template>

<script>
import images from '../content/examples.json';
export default {
    name: 'Examples',
    data() {
      return {
        images: images,
        imageIndex: 0,
        imagesPerPage: 10,
      }
    },
    mounted() {
    this.loadImages();
    console.log(this.images);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    loadImage(path) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(path);
        img.onerror = () => reject(`Error loading image ${path}`);
        img.src = path;
      });
    },
    async loadImages() {
      const imagePaths = [
        "./images/examples/image1.jpg",
        "./images/examples/image2.jpg",
        "./images/examples/image3.jpg",
        "./images/examples/image4.png",
        "./images/examples/image5.png",
        "./images/examples/image6.jpg",
        "./images/examples/image7.jpg",
        "./images/examples/image8.png",
      ];

      const imagePrompts = '';

      const startIndex = this.imageIndex;
      const endIndex = Math.min(
        startIndex + this.imagesPerPage,
        imagePaths.length
      );

      const promises = imagePaths
        .slice(startIndex, endIndex)
        .map((path) => this.loadImage(path));

      this.images = this.images.concat(await Promise.all(promises));
      this.imageIndex = endIndex;
    },
    handleScroll() {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollY >= pageHeight) {
        this.loadImages();
      }
    },
  },
}
</script>

<style>

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.image-gallery-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.example-options {
  box-shadow: inset -7px 0 5px -7px rgba(0,0,0,0.4);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  /* opcional */
  scrollbar-width: none; /* para Firefox */
  -ms-overflow-style: none; /* para Edge */
}

.example-options::-webkit-scrollbar { /* para Chrome, Safari y Opera */
  display: none;
}

.example-option {
  border: 1px solid #ccc;
  color:white;
  background-color: #000;
}

/* .example-image {
  width: 200px;
} */

</style>