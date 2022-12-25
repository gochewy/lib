import { GitProcess } from 'dugite';
import { readFileSync, writeFileSync } from 'fs-extra';

async function bumpPackageVersion() {
  const jsPackage = JSON.parse(readFileSync('package.json', 'utf8'));
  const currentBranch = (
    await GitProcess.exec(['rev-parse', '--abbrev-ref', 'HEAD'], __dirname)
  ).stdout.trim();
  console.log(currentBranch);
  console.log(jsPackage.version);
  const packageVersion = jsPackage.version as string;
  if (!packageVersion.startsWith(currentBranch)) {
    return;
  }
  const increment = packageVersion.split(`${currentBranch}.`).pop();
  if (!increment) {
    return;
  }
  const newVersion = `${currentBranch}.${parseInt(increment) + 1}`;
  jsPackage.version = newVersion;
  writeFileSync('package.json', JSON.stringify(jsPackage, null, 2));
}

bumpPackageVersion();
