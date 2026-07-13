import type { ImportIssue } from "./validation";

export type ImportReport = {
  totalCards: number;
  importedCards: number;
  errorCount: number;
  warningCount: number;
  issues: ImportIssue[];
};

export function createImportReport(
  totalCards: number,
  importedCards: number,
  issues: ImportIssue[]
): ImportReport {
  return {
    totalCards,
    importedCards,
    errorCount: issues.filter((issue) => issue.severity === "error").length,
    warningCount: issues.filter((issue) => issue.severity === "warning").length,
    issues,
  };
}

export function formatImportReport(report: ImportReport): string {
  const lines: string[] = [
    "Utopia Legacy Import Report",
    "===========================",
    `Total cards reviewed: ${report.totalCards}`,
    `Cards imported: ${report.importedCards}`,
    `Errors: ${report.errorCount}`,
    `Warnings: ${report.warningCount}`,
  ];

  if (report.issues.length === 0) {
    lines.push("", "No import issues found.");
    return lines.join("\n");
  }

  lines.push("", "Issues:");

  for (const issue of report.issues) {
    const field = issue.field ? ` [${issue.field}]` : "";

    lines.push(
      `- ${issue.severity.toUpperCase()} ${issue.cardType}:${issue.cardId}${field} - ${issue.message}`
    );
  }

  return lines.join("\n");
}
