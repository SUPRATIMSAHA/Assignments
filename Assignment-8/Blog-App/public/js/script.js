var test = document.querySelector(".test");
var blog_content = document.querySelector(".blog-content");
var body = document.querySelector("#body");
var textarea;

$(".test").on("click", function (e) {
  $(this).parent().find(".blog-content").toggle();
});
$(document).on("click", "#pic_update", function (e) {
  $(".chooseImg").toggle();
});
$(document).on("click", "body", function (e) {
  if (e.target.id != "pic_update" && $(".chooseImg").is(":visible")) {
    $(".chooseImg").toggle();
  }
  if (
    !(e.target.className == "test" || e.target.className == "fas fa-ellipsis-v")
  ) {
    $(".blog-content").hide();
  }
});
$("#Profile_img").on("change", async function (e) {
  $("#upload").attr("disabled", false);
  console.log(e.target.files);
  const file = e.target.files[0];
  await previewFile(file);
});
const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  var src;
  reader.onloadend = () => {
    src = reader.result;
    $("#profileImg").html(`
        <img src="${src}" class="profile" width="200" height="200" style="margin-top: -25px;">
        <div class="update" id="update">
            <div class="pic_update" id="pic_update">
                Update
            </div>
        </div>
        `);
  };
};

$(document).on("click", ".edit", (e) => {
  const body = e.currentTarget.parentNode.parentNode;
  $(body).find("input").prop("disabled", false);
  $(body).find(".change .edit").remove();
  const cancel = `<button class="btn cancel">Cancel</button>`;
  if ($(body).find(".change .changePassword").length) {
    $(body).find(".change .changePassword").before(cancel);
  } else {
    $(body).find(".change").append(cancel);
  }
  const save =
    '<button type="submit" class="btn btn-primary mt-3 mb-3 save">Save</button>';
  $(body).append(save);
});
$(document).on("click", ".cancel", (e) => {
  const body = e.currentTarget.parentNode.parentNode;
  $(body).find("input").prop("disabled", true);
  $(body).find(".change .cancel").remove();
  const edit = `<button class="btn edit">Edit</button>`;
  if ($(body).find(".change .changePassword").length) {
    $(body).find(".change .changePassword").before(edit);
  } else {
    $(body).find(".change").append(edit);
  }
  $(body).find(".save").remove();
});
