import React from "react";
import { GetServerSideProps } from "next";

const indexOld: React.FC = () => {
  return <div>indexOld</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default indexOld;


