import { CrudPage } from "../components/CrudPage";

export function ServicesPage() {
  return (
    <CrudPage
      title="Services"
      subtitle="Service offerings shown on the Services page and homepage"
      endpoint="/api/v1/admin/services"
      itemName="service"
      fields={[
        { key: "title", label: "Title", kind: "text", required: true },
        { key: "slug", label: "Slug", kind: "text", required: true, slugOf: "title" },
        { key: "description", label: "Description", kind: "textarea" },
        { key: "imageUrl", label: "Image", kind: "image" },
        { key: "imageAlt", label: "Image alt text", kind: "text" },
        { key: "active", label: "Visible on site", kind: "checkbox" },
      ]}
      columns={[
        { key: "imageUrl", label: "", kind: "image" },
        { key: "title", label: "Service" },
        { key: "slug", label: "Slug" },
        { key: "active", label: "Status", kind: "badge" },
      ]}
    />
  );
}
