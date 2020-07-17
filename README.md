[![Website](https://img.shields.io/badge/https://-cyclonedx.org-blue.svg)](https://cyclonedx.org/)
[![Slack Invite](https://img.shields.io/badge/Slack-Join-blue?logo=slack&labelColor=393939)](https://cyclonedx.org/slack/invite)
[![Group Discussion](https://img.shields.io/badge/discussion-groups.io-blue.svg)](https://groups.io/g/CycloneDX)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow)](https://twitter.com/CycloneDX_Spec)

# GitHub action to generate a CycloneDX SBOM for .NET

## Inputs

### `path`

**Required** The path to a .sln, .csproj, .vbproj, or packages.config file or the path to a directory which will be recursively analyzed for packages.config files.

Be sure to quote paths with spaces.

### `out`

Output directory, default is "./"

Be sure to quote paths with spaces.

### `json`

Produce a JSON BOM instead of XML, set to any value instead of false.

### `githubBearerToken`

Optionally provide the GitHub action bearer token for license resolution (example below).

## Example usage

```
- name: Generate XML SBOM
  uses: CycloneDX/gh-dotnet-generate-sbom@v1
  with:
    path: ./CycloneDX.sln
    github-bearer-token: ${{ secrets.GITHUB_TOKEN }}

- name: Generate JSON SBOM
  uses: CycloneDX/gh-dotnet-generate-sbom@master
  with:
    path: ./CycloneDX.sln
    json: true
    github-bearer-token: ${{ secrets.GITHUB_TOKEN }}
```
