from prowler.lib.check.models import Check, CheckReportNHN
from prowler.providers.nhn.services.compute.compute_client import compute_client


class compute_instance_public_ip(Check):
    def execute(self):
        findings = []
        for instance in compute_client.instances:
            report = CheckReportNHN(
                metadata=self.metadata(),
                resource=instance,
            )
            report.status = "PASS"
            report.status_extended = (
                f"VM Instance {instance.name} does not have a public IP."
            )
            if instance.public_ip:
                report.status = "FAIL"
                report.status_extended = f"VM Instance {instance.name} has a public IP."
            findings.append(report)

        return findings
