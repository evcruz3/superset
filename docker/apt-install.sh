#!/usr/bin/env bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
#!/usr/bin/env bash
set -euo pipefail

# First, install gnupg2 without verification
apt-get update -y --allow-unauthenticated
apt-get install -y --allow-unauthenticated gnupg2

# Update GPG keys
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 648ACFD622F3D138
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 0E98404D386FA1D9
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys DCC9EFBF77E11517

# Additional Debian keys
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 04EE7237B7D453EC
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 648ACFD622F3D138

# Update package lists
apt-get update

# Install packages
apt-get install -y --no-install-recommends "$@"

# Clean up
apt-get clean
rm -rf /var/lib/apt/lists/*

# Ensure this script is run as root
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" >&2
  exit 1
fi

# Check for required arguments
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <package1> [<package2> ...]" >&2
  exit 1
fi

# Colors for better logging (optional)
GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'

# Install packages with clean-up
echo -e "${GREEN}Updating package lists...${RESET}"
apt-get update -qq

echo -e "${GREEN}Installing packages: $@${RESET}"
apt-get install -yqq --no-install-recommends "$@"

echo -e "${GREEN}Autoremoving unnecessary packages...${RESET}"
apt-get autoremove -y

echo -e "${GREEN}Cleaning up package cache and metadata...${RESET}"
apt-get clean
rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/* /tmp/* /var/tmp/*

echo -e "${GREEN}Installation and cleanup complete.${RESET}"
