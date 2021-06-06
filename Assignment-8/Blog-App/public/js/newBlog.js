CKEDITOR.replace("body", {
  height: "400px",
});
$(":submit").click(async function () {
  var error = $("[for=body]");
  var size = error.length;
  if (size == 0) {
    var label = `<label for="body" class="error">This field is required.</label>`;
    $(label).insertAfter("#cke_body");
  }
});
$("#blog-form").validate({
  ignore: [],
  debug: false,
  event: "blur",
  rules: {
    title: { required: true },
    body: {
      required: function (textarea) {
        CKEDITOR.instances[textarea.id].updateElement(); // update textarea
        var editorcontent = textarea.value.replace(/<[^>]*>/gi, ""); // strip tags
        return editorcontent.length === 0;
      },
    },
  },
});
