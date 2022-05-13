const layout = require("../layout");

module.exports = ({ req }) => {
  const signout = `
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <form method="POST" action="/signout">
          <h1 class="title">Sign Out</h1>
          <h1 class="title"> Your ID is ${req.session.userID}</h1>
          <button class="button is-primary">Sign Out</button>
        </form>
      </div>
    </div>
  </div>
`;
  return layout({ content: signout });
};
