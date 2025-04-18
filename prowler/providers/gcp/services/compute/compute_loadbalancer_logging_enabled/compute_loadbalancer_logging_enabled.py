from prowler.lib.check.models import Check, Check_Report_GCP
from prowler.providers.gcp.services.compute.compute_client import compute_client


class compute_loadbalancer_logging_enabled(Check):
    def execute(self) -> Check_Report_GCP:
        findings = []
        for lb in compute_client.load_balancers:
            # Only load balancers with backend service can have logging enabled
            if lb.service:
                report = Check_Report_GCP(
                    metadata=self.metadata(),
                    resource=lb,
                    location=compute_client.region,
                )
                report.status = "PASS"
                report.status_extended = f"LoadBalancer {lb.name} has logging enabled."
                if not lb.logging:
                    report.status = "FAIL"
                    report.status_extended = (
                        f"LoadBalancer {lb.name} does not have logging enabled."
                    )
                findings.append(report)

        return findings
