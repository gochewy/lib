import { execSync } from 'child_process';
import { writeFileSync } from 'fs-extra';
import { compile } from 'json-schema-to-typescript';
import fetch from 'node-fetch';
import { resolve } from 'path';
import { cwd } from 'process';

const specUrl =
  'https://raw.githubusercontent.com/compose-spec/compose-spec/master/schema/compose-spec.json';

(async function() {
  const response = await fetch(specUrl);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
  const module = await compile(json, 'ComposeSchema');

  const modulePath = resolve('src', 'config', 'project', 'docker-compose.ts');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  writeFileSync(modulePath, module);

  execSync(`npx eslint --fix ${modulePath}`);

  const schemaPath = resolve(
    'src',
    'config',
    'project',
    'docker-compose-schema.ts'
  );

  execSync(
    `yarn ts-to-zod ${modulePath.replace(cwd() + '/', '')} ${schemaPath.replace(
      cwd() + '/',
      ''
    )}`
  );

  execSync(`npx eslint --fix ${schemaPath}`);
})().finally(() => null);
