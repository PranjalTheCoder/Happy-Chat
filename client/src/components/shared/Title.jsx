import React from "react";
import { Helmet } from "react-helmet-async";

// eslint-disable-next-line react/prop-types
const Title = ({ title = "Happy App", description = "The Chat App" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;