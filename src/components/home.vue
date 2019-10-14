<template>
<div>
    <!-- navbar -->
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand ml-auto">一個人的旅行</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="#">首頁<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
             <router-link to="/custom_order">產品介紹</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/admin/coupon">優惠券</router-link>
        </li>
        <li class="nav-item">
             <router-link to="/custom_order"><i class="fas fa-shopping-cart"></i></router-link>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
        </li>
        </ul>
    </div>
    </nav>
    </div>
    <!-- 輪播畫面 -->
    <div class="container">
        <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" class="img-fluid" alt="Responsive image">
    </div>
    <!-- 產品介紹 -->
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-5">
          <div class="col-md-12 heading-section text-center ftco-animate">
            <!-- <span class="subheading ">出發吧！一個人的旅行</span> -->
            <h2 class="mt-4">出發吧！一個人的旅行l</h2>
            <p>多久沒有好好放鬆一下呢？</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href>
                  <img
                    src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1969&q=80"
                    class="img-fluid"
                    alt="Colorlib Template"
                  />
                </a>
              </div>
              <div class="text">
                <h4 class="price">$2000</h4>
                <span>一日遊</span>
                <h3>
                  <a href="destination.html">日本, 富士山</a>
                </h3>
                <div class="star d-flex clearfix">
                  <div class="mr-auto float-left">
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                  </div>
                </div>
              </div>
              <a
                href="images/destination-1.jpg"
                class="icon image-popup d-flex justify-content-center align-items-center"
              >
                <span class="icon-expand"></span>
              </a>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href>
                  <img
                    src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    class="img-fluid"
                    alt="Colorlib Template"
                  />
                </a>
              </div>
              <div class="text">
                <h4 class="price">$130000</h4>
                <span>十三日遊</span>
                <h3>
                  <a href="destination.html">希臘, 地中海</a>
                </h3>
                <div class="star d-flex clearfix">
                  <div class="mr-auto float-left">
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                  </div>
                </div>
              </div>
              <a
                href="images/destination-1.jpg"
                class="icon image-popup d-flex justify-content-center align-items-center"
              >
                <span class="icon-expand"></span>
              </a>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href>
                  <img
                    src="https://images.unsplash.com/photo-1481988535861-271139e06469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1967&q=80"
                    class="img-fluid"
                    alt="Colorlib Template"
                  />
                </a>
              </div>
              <div class="text">
                <h4 class="price">$500</h4>
                <span>一日遊</span>
                <h3>
                  <a href="destination.html">台中,高美濕地</a>
                </h3>
                <div class="star d-flex clearfix">
                  <div class="mr-auto float-left">
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                    <span class="ion-ios-star"></span>
                  </div>
                </div>
              </div>
              <a
                href="images/destination-1.jpg"
                class="icon image-popup d-flex justify-content-center align-items-center"
              >
                <span class="icon-expand"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 優惠碼 -->
    <section
      class="ftco-intro img"
      id="hotel-section"
      style="background-image: url(https://images.unsplash.com/photo-1440778303588-435521a205bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);">
      <div class="overlay"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-9 text-center">
            <h2 class="mt-4">秋冬促銷優惠</h2>
            <p class="mb-0">
            <div class="btn btn-primary">立即了解</div>
          </div>
        </div>
      </div>
    </section>

    <footer class="ftco-footer ftco-section text-center">練習demo</footer>
</div>
</template>


<script>
export default {};
</script>

<style scoped lang="scss"></style>