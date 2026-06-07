import React from "react";
export const handleEnterPress = (e, callbackAction) => {
  if (e.key === "Enter" && typeof callbackAction === "function") {
    callbackAction();
  }
};