# SBOM Generation Metadata

**Generated**: $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Branch**: main
**Commit**: 1bd57eeaf1beb8130cab796539beca23f3aa606b
**Workflow**: Generate and Publish SBOM
**Run ID**: 18417052461

## Files

- `sbom-cyclonedx.json`: CycloneDX format (via npm sbom)
- `sbom-spdx.json`: SPDX format (via npm sbom)

## Verification

```bash
# Verify file integrity
sha256sum sbom/*.json
```
