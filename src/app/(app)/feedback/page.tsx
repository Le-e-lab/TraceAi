
import { FeedbackForm } from "@/components/feedback/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="container mx-auto py-2">
      {/* Title is handled by AppNavbar, this page is focused on the form */}
      <FeedbackForm />
    </div>
  );
}
