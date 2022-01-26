import React, { useState, useEffect, createContext } from "react";

import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  console.log(props);
}
