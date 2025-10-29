"use client";

import QueryProvider from "./providers/QueryProvider";

import Loading from "@/components/Loading";
import { Suspense } from "react";
import styled from "styled-components";

import Header from "./Layout/Header";
import Menu from "./Layout/Menu";

const Wrap = styled("body")({
  position: "relative",
  height: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
  minWidth: "340px",
});

const ContentArea = styled("main")({
  padding: "70px 20px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "@media (min-width:1280px)": {
    padding: "120px 0 50px",
    // height: 'calc(100% - 50px)',
  },
});

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <Wrap>
        <Header />
        <QueryProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </QueryProvider>
        <Menu />
      </Wrap>
    </html>
  );
};

export default AppLayout;
