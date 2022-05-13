const layout = require("../layout");
const getError = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form id="upload" method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, "price")}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input id="image-input" type="file" name="image" />
              <img src="" id="image"/>
            </div>
            <br />
            <button id="button" class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
    <div id="output" class="container"></div>
    <script>
      const imageInput = document.querySelector("#image-input");
      const fReader = new FileReader();
      imageInput.addEventListener("input", (event) => {
      fReader.readAsDataURL(imageInput.files[0]);
      fReader.onloadend = function (event) {
        const img = document.querySelector("#image");
        img.src = event.target.result;
      };
      });
    </script>
    <script>
    var output = document.getElementById("output");
    console.log(output);
    document.getElementById("upload").addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Hi");
      var form = document.getElementById("upload");
      var data = new FormData(form);
    
      var config = {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
        },
      };
    
      axios
        .post("/admin/products/new", data, config)
        .then(function (res) {
          output.className = "container";
          output.innerHTML = res.data;
        })
        .catch(function (err) {
          output.className = "container text-danger";
          output.innerHTML = err.message;
        });
    });
    </script>
  `,
  });
};

// var output = document.getElementById("output");
// console.log(output);
// document.getElementById("button").addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log("Hi");
//   var data = new FormData();
//   data.append("foo", "bar");
//   data.append("file", document.getElementById("image-input").files[0]);

//   var config = {
//     onUploadProgress: function (progressEvent) {
//       var percentCompleted = Math.round(
//         (progressEvent.loaded * 100) / progressEvent.total
//       );
//       console.log(percentCompleted);
//     },
//   };

//   axios
//     .post("/admin/products/new", data, config)
//     .then(function (res) {
//       output.className = "container";
//       output.innerHTML = res.data;
//     })
//     .catch(function (err) {
//       output.className = "container text-danger";
//       output.innerHTML = err.message;
//     });
// });
