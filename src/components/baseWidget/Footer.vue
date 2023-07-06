<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-sm-6 col-md-3">
        <h3 class="title">MiniPaw</h3>
        <ul>
          <li>Hà Nội, Việt Name</li>
          <li>+ (84) 777-777-777</li>
          <li>minipaw@example.com</li>
          <li>minipaw.com</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3">
        <h3 class="title">{{ $t('HelpAndInfomation') }}</h3>
        <ul>
          <li>{{ $t('TermAndCondition') }}</li>
          <li>{{ $t('Contact') }}</li>
          <li>{{ $t('Accessories') }}</li>
          <li>{{ $t('TermOfUse') }}</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3">
        <h3 class="title">{{ $t('AboutUs') }}</h3>
        <ul>
          <li>{{ $t('HelpCenter') }}</li>
          <li>{{ $t('AddressStore') }}</li>
          <li>{{ $t('PrivacyPolity') }}</li>
        </ul>
      </div>
      <div class="col-sm-6 col-md-3">
        <h3 class="title">{{ $t('Profile') }}</h3>
        <ul>
          <li>{{ $t('MyAccount') }}</li>
        </ul>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center">
      <div class="col-sm-6 text-start">
        <p>{{ $t('SeeYouAgain') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter"
}
</script>

<style scoped>
div.container-fluid {
  background-color: #fffdf9;
  padding: 3% 2%;
}
ul {
  padding: 0;
}
h3 {
  text-align: left;
}
li {
  list-style-type: none;
  text-align: left;
}
</style>
