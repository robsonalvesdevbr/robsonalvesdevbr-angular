# SBOM Generation Metadata

**Generated**: $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Branch**: main
**Commit**: 6f2eff5ba1b4d168888c6fd8c686f8ff4d1b76f2
**Workflow**: Generate and Publish SBOM
**Run ID**: 18715145488

## Files

- `sbom-cyclonedx.json`: CycloneDX format (via npm sbom)
- `sbom-spdx.json`: SPDX format (via npm sbom)

## Verification

```bash
# Verify file integrity
sha256sum sbom/*.json
```
