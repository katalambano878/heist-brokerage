import { CrudPage } from "../components/CrudPage";

export function TestimonialsPage() {
  return (
    <CrudPage
      title="Testimonials"
      subtitle="Client quotes shown on the homepage"
      endpoint="/api/v1/admin/testimonials"
      itemName="testimonial"
      fields={[
        { key: "quote", label: "Quote", kind: "textarea", required: true },
        { key: "name", label: "Client name", kind: "text", required: true },
        { key: "role", label: "Role (e.g. Home Buyer)", kind: "text" },
        { key: "active", label: "Visible on site", kind: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Client" },
        { key: "role", label: "Role" },
        { key: "quote", label: "Quote" },
        { key: "active", label: "Status", kind: "badge" },
      ]}
    />
  );
}
