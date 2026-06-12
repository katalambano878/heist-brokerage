import { CrudPage } from "../components/CrudPage";

export function TeamPage() {
  return (
    <CrudPage
      title="Team"
      subtitle="People shown on the About and Team pages"
      endpoint="/api/v1/admin/team"
      itemName="member"
      fields={[
        { key: "name", label: "Name", kind: "text", required: true },
        { key: "title", label: "Role / Title", kind: "text", required: true },
        { key: "focus", label: "Bio / Focus", kind: "textarea" },
        { key: "imageUrl", label: "Portrait", kind: "image" },
        { key: "featured", label: "Featured (founder spotlight)", kind: "checkbox" },
        { key: "active", label: "Visible on site", kind: "checkbox" },
      ]}
      columns={[
        { key: "imageUrl", label: "", kind: "image" },
        { key: "name", label: "Name" },
        { key: "title", label: "Title" },
        { key: "featured", label: "Featured", kind: "check" },
        { key: "active", label: "Status", kind: "badge" },
      ]}
    />
  );
}
