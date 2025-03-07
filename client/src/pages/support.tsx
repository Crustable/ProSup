import TicketForm from "@/components/TicketForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <Card className="mt-4 sm:mt-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Support Ticket</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Need help? Submit a ticket and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketForm />
        </CardContent>
      </Card>
    </div>
  );
}