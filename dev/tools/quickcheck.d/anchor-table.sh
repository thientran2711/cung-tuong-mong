#!/bin/bash
# quickcheck hook: every player-face anchor set is plausible and the toil-fit mouth agrees with the face-mesh lips (dev/test/anchor-table.py, offline, <5 s)
cd "$(dirname "$0")/../../.." && python3 dev/test/anchor-table.py | head -5
