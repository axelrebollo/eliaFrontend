<script setup></script>

<template>
  <h2>Bienvenido a Èlia</h2>
  <div class="custom-carousel-container">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="/src/assets/a1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/src/assets/a2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/src/assets/a3.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
  h2{
    text-align: center;
    color: white;
    padding-top: 50px;
  }
    
  .custom-carousel-container {
    width: 1000px;
    height: 700px;
    margin: auto;
    padding-top: 80px;
  }

  .carousel,
  .carousel-inner,
  .carousel-item {
    height: 100%;
    border-radius: 20px;
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    display: block;
  }
</style>
