<template>
  <div>
      <table>
        <tbody>
          <tr>
            <td><a class="simple-link" >Clear</a></td>
          </tr>
        </tbody>
      </table>
            <table class="highlight">
        <tbody>
          <tr class="h-row">
            <td><p class="emerald-btn"><strong>Post</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
          <tr class="h-row">
            <td><p class="pink-color"><strong>Get</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
          <tr class="h-row">
            <td><p class="emerald-btn"><strong>Post</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
            <tr class="h-row">
            <td><p class="emerald-btn"><strong>Post</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
                      <tr class="h-row">
            <td><p class="emerald-btn"><strong>Post</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
                    <tr class="h-row">
            <td><p class="pink-color"><strong>Get</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
                                <tr class="h-row">
            <td><p class="emerald-btn"><strong>Post</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
                    <tr class="h-row">
            <td><p class="pink-color"><strong>Get</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
                              <tr class="h-row">
            <td><p class="pink-color"><strong>Get</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
                              <tr class="h-row">
            <td><p class="pink-color"><strong>Get</strong></p></td>
            <td colspan="2"><p>http://www.google.come/api/thi...<a class="floating-eye-btn btn-floating d-none"><i class="fa fa-eye"></i></a></p></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  mounted() {
    // on hover history row
    $('.h-row').on('mouseover', function(){
        $(this).find('a').removeClass('d-none');
    });
    // on out history row
    $('.h-row').on('mouseout', function(){
        $(this).find('a').addClass('d-none');
    });
  },
  methods: {

  }
};
</script>