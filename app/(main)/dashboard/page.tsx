import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import Loader from "@/components/loader/Loader";

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContent />
    </Suspense>
  );
}
