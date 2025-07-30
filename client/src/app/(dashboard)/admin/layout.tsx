"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (isLoaded && user) {
      const userRole = user.publicMetadata?.userType as string;
      setIsAuthorized(userRole === "teacher");
      
      if (!userId) {
        redirect("/sign-in");
      }
    }
  }, [isLoaded, userId, user]);
  
  if (!isLoaded || isAuthorized === null) {
    return <Loading />;
  }
  
  if (!isAuthorized) {
    redirect("/");
  }
  
  return <>{children}</>;
}
