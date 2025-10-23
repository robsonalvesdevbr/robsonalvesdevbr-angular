# SBOM Generation Metadata

**Generated**: $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Branch**: main
**Commit**: b0d83f55d5c7fc233a91ad63060c600f144c4403
**Workflow**: Generate and Publish SBOM
**Run ID**: 18733788378

## Files

- `sbom-cyclonedx.json`: CycloneDX format (via npm sbom)
- `sbom-spdx.json`: SPDX format (via npm sbom)

## Verification

```bash
# Verify file integrity
sha256sum sbom/*.json
```
