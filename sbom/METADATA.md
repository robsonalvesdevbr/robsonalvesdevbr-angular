# SBOM Generation Metadata

**Generated**: $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Branch**: main
**Commit**: 6b25766d2a13ecab1c334a0c072fde22c2eafb18
**Workflow**: Generate and Publish SBOM
**Run ID**: 18452932028

## Files

- `sbom-cyclonedx.json`: CycloneDX format (via npm sbom)
- `sbom-spdx.json`: SPDX format (via npm sbom)

## Verification

```bash
# Verify file integrity
sha256sum sbom/*.json
```
