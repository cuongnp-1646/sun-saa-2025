up: tools deps
	@mkdir -p supabase/images
	@npx supabase start

down: tools
	@npx supabase stop

dev:
	@yarn dev

tools:
	@command -v yarn >/dev/null 2>&1 || { echo "Error: yarn is not installed."; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "Error: npm is not installed."; exit 1; }
	@command -v npx >/dev/null 2>&1 || { echo "Error: npx is not installed."; exit 1; }

deps:
	@test -d node_modules || yarn install

.PHONY: up tools deps
