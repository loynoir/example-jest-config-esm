#!/usr/bin/env bash
set -exo pipefail

_test() {
	unset NODE_OPTIONS
	"${JEST[@]}" test/config/ESMOnlySoft.spec.ts
	! "${JEST[@]}" test/config/ESMOnlyHard.spec.ts >/dev/null 2>/dev/null
	env NODE_OPTIONS='--experimental-vm-modules' "${JEST[@]}"
}

_cleanup() {
	# undo what yarn@berry did :(
	jq 'del(.packageManager)' package.json | sponge package.json

	trash node_modules pnpm-lock.yaml package-lock.json yarn.lock .pnp.cjs .yarnrc.yml 2>/dev/null || true
}

describe_pnpm() {
	pnpm install
	JEST=(jest --verbose)
	_test
	_cleanup
}

describe_npm() {
	npm install
	JEST=(jest)
	_test
	_cleanup
}

describe_yarn() {
	yarn install
	JEST=(jest)
	_test
	_cleanup
}

describe_yarnBerry() {
	yarn set version berry
	yarn install
	JEST=(yarn jest)
	_test
	_cleanup
}

{
	_cleanup

	if [ "$#" == 0 ]; then
		describe_pnpm
		describe_npm
		describe_yarn
		describe_yarnBerry
	else
		describe_"${1}"
	fi
	echo "ALL PASS! 🎉"
}
