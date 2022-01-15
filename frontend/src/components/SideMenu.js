import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        attributes {
          name
        }
        id
      }
    }
  }
`;

const SideMenu = () => {
  const { loading, data, error } = useQuery(CATEGORIES);

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div>
      <div className="row">
        {data.categories.data.map((category) => {
          return (
            <Link
              className="side-link"
              key={category.id}
              to={`/category/${category.id}`}
            >
              {category.attributes.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
