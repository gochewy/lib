import { GitProcess } from 'dugite';
import { readFileSync, writeFileSync } from 'fs-extra';
import { cwd } from 'process';

async function bumpPackageVersion() {
  const dir = cwd();
  const jsPackage = JSON.parse(readFileSync('package.json', 'utf8')) as {
    version: string;
  };
  const currentBranch = (
    await GitProcess.exec(['rev-parse', '--abbrev-ref', 'HEAD'], dir)
  ).stdout.trim();
  console.log(currentBranch);
  console.log(jsPackage.version);
  const packageVersion = jsPackage.version;
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
  const addOutput = await GitProcess.exec(['add', 'package.json'], dir);
  if (addOutput.exitCode !== 0) {
    throw new Error(`Failed to add files to git: ${addOutput.stderr}`);
  }
}

bumpPackageVersion().catch(e => console.log(e));
