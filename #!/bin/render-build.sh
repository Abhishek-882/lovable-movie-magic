#!/bin/bash
set -o errexit

echo "--- Installing dependencies ---"
npm install --omit=dev

echo "--- Building application ---"
npm run build

echo "--- Prune unnecessary files ---"
find node_modules -type d -name "test*" -exec rm -rf {} + || true
find node_modules -type d -name "docs" -exec rm -rf {} + || true
find node_modules -type f -name "*.md" -delete || true
find node_modules -type f -name "*.ts" -delete || true
