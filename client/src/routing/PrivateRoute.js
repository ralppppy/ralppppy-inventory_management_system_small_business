import React from "react";

function PrivateRoute({ Layout, Component }) {
  if (Layout) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }

  return <Component />;
}

export default PrivateRoute;
