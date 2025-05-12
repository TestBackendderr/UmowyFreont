import MainLayout from "@/components/layouts/MainLayout";
import Middleside from "@/components/Middleside";
import withAuth from "@/utils/withAuth";
import React from "react";

function Home() {
  return (
    <MainLayout>
      <Middleside />
    </MainLayout>
  );
}

export default withAuth(Home);
