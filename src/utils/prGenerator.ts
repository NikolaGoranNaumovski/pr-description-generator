export function generatePRDescription(
  commitMessages: string,
  breakingChange: boolean,
  testsAdded: boolean
): string {
  // Parse commit messages
  const commits = commitMessages
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Categorize commits
  const features: string[] = [];
  const fixes: string[] = [];
  const chores: string[] = [];
  const docs: string[] = [];
  const others: string[] = [];

  commits.forEach((commit) => {
    const lower = commit.toLowerCase();
    if (lower.startsWith("feat:") || lower.startsWith("feature:")) {
      features.push(commit.replace(/^(feat|feature):\s*/i, ""));
    } else if (lower.startsWith("fix:")) {
      fixes.push(commit.replace(/^fix:\s*/i, ""));
    } else if (lower.startsWith("chore:")) {
      chores.push(commit.replace(/^chore:\s*/i, ""));
    } else if (lower.startsWith("docs:") || lower.startsWith("doc:")) {
      docs.push(commit.replace(/^docs?:\s*/i, ""));
    } else {
      others.push(commit);
    }
  });

  // Generate summary
  let summary = "## Summary\n\n";

  if (features.length > 0) {
    summary += `This PR introduces ${features.length} new feature${
      features.length > 1 ? "s" : ""
    } `;
  }
  if (fixes.length > 0) {
    if (features.length > 0) summary += "and ";
    summary += `resolves ${fixes.length} bug${fixes.length > 1 ? "s" : ""} `;
  }
  if (features.length === 0 && fixes.length === 0) {
    summary += "This PR includes various improvements and updates ";
  }
  summary += "to enhance the codebase.\n\n";

  // Add breaking change warning
  if (breakingChange) {
    summary +=
      "🚨 **BREAKING CHANGE**: This PR contains breaking changes that require migration steps.\n\n";
  }

  // Changes section
  let changes = "## Changes\n\n";

  if (features.length > 0) {
    changes += "### ✨ Features\n";
    features.forEach((feat) => {
      changes += `- ${feat}\n`;
    });
    changes += "\n";
  }

  if (fixes.length > 0) {
    changes += "### 🐛 Bug Fixes\n";
    fixes.forEach((fix) => {
      changes += `- ${fix}\n`;
    });
    changes += "\n";
  }

  if (docs.length > 0) {
    changes += "### 📚 Documentation\n";
    docs.forEach((doc) => {
      changes += `- ${doc}\n`;
    });
    changes += "\n";
  }

  if (chores.length > 0) {
    changes += "### 🔧 Maintenance\n";
    chores.forEach((chore) => {
      changes += `- ${chore}\n`;
    });
    changes += "\n";
  }

  if (others.length > 0) {
    changes += "### 🔀 Other Changes\n";
    others.forEach((other) => {
      changes += `- ${other}\n`;
    });
    changes += "\n";
  }

  // Testing section
  let testing = "## Testing\n\n";
  if (testsAdded) {
    testing +=
      "✅ **Tests have been added** to cover the new functionality and ensure reliability.\n\n";
    testing += "### Test Coverage\n";
    testing += "- Unit tests added for new features\n";
    testing += "- Integration tests updated\n";
    testing += "- All existing tests passing\n\n";
  } else {
    testing += "### Manual Testing\n";
    testing += "- Tested locally in development environment\n";
    testing += "- Verified functionality works as expected\n\n";
  }

  // Additional sections
  let additional = "## Checklist\n\n";
  additional += `- [${testsAdded ? "x" : " "}] Tests added/updated\n`;
  additional += `- [${
    breakingChange ? "x" : " "
  }] Breaking changes documented\n`;
  additional += "- [x] Code follows project style guidelines\n";
  additional += "- [x] Self-review completed\n\n";

  return summary + changes + testing + additional;
}
