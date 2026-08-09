# Developer Guide: Adding New Pages in YStudy Frontend

This guide outlines the standard architectural pattern for adding new pages to the Next.js frontend application. Following this structure ensures exact styling compatibility, optimal server-side rendering, robust SEO setup, and graceful local fallbacks.

---

## Architecture Overview

YStudy uses a hybrid Next.js App Router and Page-widget architecture:
1. **Routing and SEO** are managed in the App Router under `src/app/<route>/page.tsx`. This file specifies search engine metadata and serves as the Server Component wrapper.
2. **Page Templates and CMS Integration** are implemented in the `src/pages/` folder. This handles data fetching from the backend CMS API concurrently and parses structured sections.
3. **Interactive Components** are written as Client Components (`"use client"`) inside `src/components/widgets/` and embedded inside the templates.
4. **Fallback Resilience** is guaranteed via static fallback JSON files inside `src/content/fallbacks/` in case the CMS database API is offline or unseeded.

---

## Step-by-Step Implementation Workflow

To add a new page (for example, `/guides/student-finance` or `/new-page`):

### Step 1: Create Fallback Data
Always define a fallback dataset to keep the app working during server outages or when database entries are missing.
Create a JSON file: `src/content/fallbacks/<category>/<page-slug>.json`.
Example:
```json
{
  "page": "new-page",
  "section_1": {
    "badge": "New Guide",
    "title": "Welcome to the new guide page.",
    "description": "Important explanation of the resource contents."
  }
}
```

---

### Step 2: Register Fallback in CMS Service
Open [cms.service.ts](file:///E:/projects/y-study/git/nextjs-ystudy-frontend/src/services/cms.service.ts):
1. **Import the JSON file**:
   ```typescript
   import fallbackNewPage from "@/content/fallbacks/category/new-page.json";
   ```
2. **Map the slug inside the `getFallbackData` function**:
   ```typescript
   if (slug === "new-page") {
     return fallbackNewPage as unknown as CMSPageData;
   }
   ```

---

### Step 3: Create the Page Template
Implement the visual layout in `src/pages/<category>/NewPageDetail.tsx` or `src/pages/NewPage.tsx`. Use a Server Component pattern to fetch initial CMS content:
```tsx
import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";

export default async function NewPageDetail() {
  const data = await getCMSPageContent("new-page");

  if (!data) {
    return <div>Content not found.</div>;
  }

  const s1 = data.section_1 || {};

  return (
    <div className="new-page-container">
      <Banner
        slug="new-page"
        fallbackTitle={s1.title}
        fallbackDescription={s1.description}
      />
      {/* Page layout and details */}
    </div>
  );
}
```

---

### Step 4: Map the App Router Endpoint
Create the Next.js router directory: `src/app/new-page/page.tsx` (for static routes) or `src/app/new-page/[slug]/page.tsx` (for dynamic sub-routes).

#### Static Route (`src/app/new-page/page.tsx`)
```tsx
import NewPageDetail from "@/pages/NewPage";

export const metadata = {
  title: "YStudy — New Page Title",
  description: "Meta description for SEO optimisation.",
};

export default function Page() {
  return <NewPageDetail />;
}
```

#### Dynamic Route (`src/app/new-page/[slug]/page.tsx`)
```tsx
import NewPageDetail from "@/pages/NewPageDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `YStudy — ${title} Details`,
    description: `Read our comprehensive guide about ${title}.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <NewPageDetail slug={slug} />;
}
```

---

## Reusable Components & layout Sections

To prevent code duplication, do not write raw HTML/CSS wrappers for common UI patterns. Import and reuse the following components:

### 1. Comparison & Informational Tables
For check lists, decision signals, or situation-maximum lists.
```tsx
import { ComparisonTable } from "@/components/sections";

<ComparisonTable
  className="finance-comparison-table" // or "comp-table"
  headers={["Option", "Details", "Verdict"]}
  rows={[{ option: "Blended", details: "On-campus", verdict: "Strongest" }]}
  renderCell={(value, colKey) => {
    if (colKey === "verdict") return <b style={{ color: "var(--b)" }}>{value}</b>;
    return value;
  }}
/>
```

### 2. Notices & Warning Banners
For highlighted warnings (e.g., study mode checks, residency criteria alerts).
```tsx
import { FinanceWarningBanner } from "@/components/sections";

<FinanceWarningBanner
  badge="Eligibility Warning"
  title="Study mode can affect Maintenance Loan."
  description="Distance learning routes may not qualify for living-cost support."
  status={true}
/>
```

### 3. CTA Panels & Action Cards
For inline adviser-call prompts or route comparisons.
```tsx
import { CtaPanel } from "@/components/sections";

<CtaPanel
  title="Need help choosing the right route?"
  description="Use Degree Match Finder or speak to a YStudy adviser before applying."
  primaryBtnText="Find my degree"
  primaryBtnHref="/tools/degree-match"
  secondaryBtnText="Apply with YStudy"
  secondaryBtnHref="/apply"
  style={{ marginTop: "28px" }}
/>
```

### 4. Stay In Touch Footer ribbon
A page-footer layout ribbon.
```tsx
import { FooterCta } from "@/components/sections";

<FooterCta
  badge="Stay in touch"
  title="Your next step should feel organised."
  description="Create a free account to save progress and track applications."
  status={true}
/>
```

### 5. Conversion Cards & Next Steps
Standard 3-column actions card-grid.
```tsx
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

<QualificationConversionCards />
<QualificationCrosslinks />
```

### 6. Shared Bottom Sections (Funding Pages)
Bundles Eligibility Snapshot, journey, myths, certainty CTA, and footer stay in touch bands.
```tsx
import FundingBottomSections from "@/components/widgets/FundingBottomSections";

<FundingBottomSections
  snapshot={data.section_8}
  journey={data.section_9}
  myths={data.section_10}
  certainty={data.section_11}
/>
```

---

## Best Practices Checklist

- [ ] **Reuse First**: Check this guide before implementing raw layout wrappers like `.cta-panel`, `.footer-cta`, or `.ds-finance-integrated`.
- [ ] **SEO Tags**: Ensure every static/dynamic App Router `page.tsx` defines high-quality `title` and `description` metadata.
- [ ] **No Placeholders**: Never use placeholder images or missing values; integrate dynamic fallbacks or curations.
- [ ] **Styles**: Use the global stylesheet class names (e.g., `ds-finance-integrated`, `card-grid`, `btn-orange`) to maintain consistent styling.
- [ ] **Type Safety**: Cast imports as `as unknown as CMSPageData` inside `cms.service.ts` to enforce TypeScript contract checks.
