const layout = require("../layout");
const getError = require("../../helpers");

module.exports = ({ product, errors }) => {
  return layout({
    content: `
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>
          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title" value="${
                product.title
              }">
              <p class="help is-danger">${getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price" value="${
                product.price
              }">
              <p class="help is-danger">${getError(errors, "price")}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input id="image-input" type="file" name="image" />
              <img src="data:image/png;base64, ${product.image}" id="image"/>
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
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
  `,
  });
};
