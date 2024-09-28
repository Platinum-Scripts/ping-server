#!/bin/bash
# This script runs Bun with hot reloading for the specified index.js file

# Navigate to the script's directory (optional)
cd "$(dirname "$0")"

# Run Bun with hot reload
bun --hot index.js