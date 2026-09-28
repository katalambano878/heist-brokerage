import { useState } from "react";
import { CrudPage } from "../components/CrudPage";
import { ApplicationsPage } from "./ApplicationsPage";

type Tab = "openings" | "applications";

export function CareersPage() {
  const [tab, setTab] = useState<Tab>("openings");

  return (
    <div>
      <div className="page-header">
        <h1>Careers</h1>
        <p>Open positions on the public careers page, and the applications people submit</p>
      </div>
      <div className="segmented" role="tablist" aria-label="Careers sections">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "openings"}
          className={tab === "openings" ? "active" : ""}
          onClick={() => setTab("openings")}
        >
          Open positions
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "applications"}
          className={tab === "applications" ? "active" : ""}
          onClick={() => setTab("applications")}
        >
          Applications
        </button>
      </div>
      {tab === "openings" ? (
        <CrudPage
          title=""
          subtitle="Roles listed under Current openings. Turn off “Visible on site” to hide a role without deleting it."
          endpoint="/api/v1/admin/jobs"
          itemName="position"
          fields={[
            { key: "title", label: "Job title", kind: "text", required: true },
            { key: "type", label: "Employment type", kind: "text", placeholder: "Full Time" },
            { key: "location", label: "Location", kind: "text" },
            { key: "description", label: "Description", kind: "textarea" },
            { key: "active", label: "Visible on site", kind: "checkbox" },
          ]}
          columns={[
            { key: "title", label: "Role" },
            { key: "type", label: "Type" },
            { key: "location", label: "Location" },
            { key: "active", label: "Status", kind: "badge" },
          ]}
        />
      ) : (
        <ApplicationsPage embedded />
      )}
    </div>
  );
}
