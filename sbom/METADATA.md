# SBOM Generation Metadata

**Generated**: $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Branch**: main
**Commit**: 416e8bbb7d3f750c9c23c35f5f3cf4074b8e8dd2
**Workflow**: Generate and Publish SBOM
**Run ID**: 18715311401

## Files

- `sbom-cyclonedx.json`: CycloneDX format (via npm sbom)
- `sbom-spdx.json`: SPDX format (via npm sbom)

## Verification

```bash
# Verify file integrity
sha256sum sbom/*.json
```
