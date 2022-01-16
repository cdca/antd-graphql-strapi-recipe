import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import spinner from "../../assets/Infinity-2.9s-200px.svg";
import "../../App.css";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={spinner} style={{ height: 150, width: 150, paddingTop: 30 }} />
    </div>
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
