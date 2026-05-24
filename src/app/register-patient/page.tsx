import { Suspense } from "react";
import RegisterPatientPage from "@/features/register-patient/RegisterPatientPage";

export default function RegisterPatient() {
  return (
    <Suspense fallback={null}>
      <RegisterPatientPage />
    </Suspense>
  );
}
