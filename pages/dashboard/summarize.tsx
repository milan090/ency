import React, { useEffect } from "react";

import { useAuth } from "hooks/useAuth.provider";
import { useRouter } from "next/router";

import RightBar from "components/right-bar/right-bar.component";
import AppBar from "components/appbar/appbar.component";
import SummariseTextUrl from "components/summarize-text-url/summarize-text-url.component";

export default function SummarisePage(): JSX.Element {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user.uid && !isLoading) {
      router.push("/sign-in");
    }
  }, [isLoading, router, user]);

  return (
    <div className="bg-gray-200 flex justify-between min-h-screen overflow-y-hidden">
      <AppBar />
      <div className="py-8 w-full px-20 max-h-screen overflow-y-scroll">
        <SummariseTextUrl />
      </div>
      <RightBar />
    </div>
  );
}
