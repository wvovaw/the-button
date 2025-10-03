#!/bin/sh
set -e
bun db migrate
exec "$@"
