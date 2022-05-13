const layout = require("../layout");

module.exports = ({ items }) => {
  const cartPrice = items.reduce((total, item) => {
    return (total += item.quantity * item.product.price);
  }, 0);

  const renderedItems = items
    .map((item) => {
      return `
      <tr>
        <td>${item.product.title}</td>
        <td>${item.product.price}$</td>
        <td>${item.quantity}</td>
        <td>${item.quantity * item.product.price}$</td>
        <td>
          <img src="data:image/png;base64, ${item.product.image}"/>
        </td>
        <td>
          <form method="post" action="/cart/item/delete">
            <input hidden value="${item.id}" name="itemID"/>
            <button class="button is-danger" href="">Delete</button>
          </form>
        </td>
      </tr>
    `;
    })
    .join("");

  return layout({
    content: `
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-half">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderedItems}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Cart Price</td>
                                <td>${cartPrice}$</td>
                            </tr>
                        </tfoot>
                    </table>
            </div>
        </div>
    </div>
`,
  });
};
