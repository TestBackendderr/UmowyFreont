import MainLayout from "@/components/layouts/MainLayout";
import ZadanieDetail from "@/components/ZadanieDetail";
import withAuth from "@/utils/withAuth";
import React from "react";

function ZadaniePage() {
  return (
    <MainLayout>
      <ZadanieDetail />
    </MainLayout>
  );
}

export default withAuth(ZadaniePage);