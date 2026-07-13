import {
  createImportReport,
  formatImportReport,
} from "./report";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const report = createImportReport(3, 2, [
  {
    severity: "warning",
    cardType: "ship",
    cardId: "S001",
    field: "factions",
    message: "Ship has no factions.",
  },
  {
    severity: "error",
    cardType: "ship",
    cardId: "S002",
    field: "cost",
    message: "Ship has an invalid cost.",
  },
]);

assert(report.totalCards === 3, "Total card count is incorrect.");
assert(report.importedCards === 2, "Imported card count is incorrect.");
assert(report.warningCount === 1, "Warning count is incorrect.");
assert(report.errorCount === 1, "Error count is incorrect.");

const formatted = formatImportReport(report);

assert(
  formatted.includes("Utopia Legacy Import Report"),
  "Report heading is missing."
);

assert(
  formatted.includes("Errors: 1"),
  "Error count was not formatted."
);

assert(
  formatted.includes("ship:S002 [cost]"),
  "Detailed error information was not formatted."
);

console.log("Importer report tests passed.");
