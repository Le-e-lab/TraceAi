
import { SymptomForm } from "@/components/symptoms/symptom-form";

export default function SymptomsPage() {
  return (
    <div className="container mx-auto py-2">
      {/* Title is handled by AppNavbar, this page is focused on the form */}
      <SymptomForm />
    </div>
  );
}
