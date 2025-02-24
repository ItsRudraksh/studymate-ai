"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      checkIsNewUser();
    }
  }, [user]);

  const checkIsNewUser = async () => {
    const res = await axios.post("/api/create-user", { user: user });
  };
  return (
    <div className="w-screen h-screen">
      <div>{children}</div>
    </div>
  );
}

export default Provider;
