# ee — commercial layer

Everything under `ee/` is proprietary (see `ee/LICENSE`). This is where the paid
product lives:

| Directory | What it is |
| --- | --- |
| `console/` | Governance surface: team policies, approval workflows, roles, audit retention and export, multi-instance orchestration |
| `rulepacks/` | Rule packs and sample corpus — rules → verdicts → evidence. The moat. |
| `evidence-service/` | Hosted rule sync and evidence aggregation (service-tier revenue) |
| `enterprise/` | SSO/SAML/SCIM, self-hosting and air-gapped deployment, SIEM export, SBOM, signed builds |

**Why it is closed:** the integration layer has no price space (a 30k-star free
open-source alternative already exists), while governance, evidence and long-term
maintenance are exactly what teams pay for. Keeping this layer proprietary is
also what keeps the GPL-licensed host plugins separable — see `LICENSING.md`.
