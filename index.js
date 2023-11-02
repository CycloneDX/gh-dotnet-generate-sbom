// This file is part of CycloneDX GitHub Action for .NET
//
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) Patrick Dwyer. All Rights Reserved.

const fs = require('fs');
const core = require('@actions/core');
const execSync = require('child_process').execSync;

try {
  // check if CycloneDX is installed
  try {
    execSync('dotnet CycloneDX --help');
  } catch (error) {
    console.log('Installing CycloneDX...');
    let output = execSync('dotnet tool install --global CycloneDX', { encoding: 'utf-8' });
    console.log(output);
  }

  const path = core.getInput('path');
  const out = core.getInput('out');
  const json = core.getInput('json') != 'false';
  const githubBearerToken = core.getInput('github-bearer-token');
  const logBomContents = core.getInput('log-bom-contents') == 'true';

  console.log('Options:');
  console.log(`  path: ${path}`);
  console.log(`  out: ${out}`);
  console.log(`  json: ${json}`);
  console.log(`  log-bom-contents: ${logBomContents}`);

  let command = `dotnet CycloneDX ${path} --out ${out}`
  if (json) command += ' --json';

  console.log(`Running: ${command}`);

  if (githubBearerToken != '') {
    console.log('With GitHub bearer token');
    command += ' --github-bearer-token ' + githubBearerToken;
  }

  output = execSync(command, { encoding: 'utf-8' });
  console.log(output);

  if (logBomContents) {
    console.log('BOM Contents:');
    const bomFormat = json ? 'json' : 'xml';
    let bomContents = fs.readFileSync(`${out}/bom.${bomFormat}`).toString('utf8');
    console.log(bomContents);
  }
} catch (error) {
  core.setFailed(error.message);
}