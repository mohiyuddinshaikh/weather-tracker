import { useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";

export const useCustomMediaQuery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return { isMobile, isTab, isDesktop, isLargeScreen };
};
