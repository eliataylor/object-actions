#!/bin/bash
source "$(dirname "$0")/common.sh"

cd "$SCRIPT_DIR/src"

# ./load-sheets.sh --project "oaexample" --types "/Users/trackauthoritymusic/Developer/tmt/object-actions/src/examples/democrasee-objects.csv" --permissions "/Users/trackauthoritymusic/Developer/tmt/object-actions/src/examples/democrasee-permissions.csv"
source .venv/bin/activate

# Run the Python scripts to generate files
echo "Building Django with types $csvpath and permissions $permissionspath"
python -m generate django --types="$csvpath" --permissions="$permissionspath" --output_dir="$stackpath/django/${machinename}_app"

echo "Building TypeScript with types $csvpath and permissions $permissionspath"
python -m generate typescript --types="$csvpath" --permissions="$permissionspath" --output_dir="$stackpath/reactjs/src/object-actions/types/"
python -m generate typescript --types="$csvpath" --permissions="$permissionspath" --output_dir="$stackpath/databuilder/src/"
python -m generate typescript --types="$csvpath" --permissions="$permissionspath" --output_dir="$stackpath/cypress/cypress/support/"
# python -m generate typescript --types="$csvpath" --permissions="$permissionspath" --output_dir="$stackpath/k6/"
