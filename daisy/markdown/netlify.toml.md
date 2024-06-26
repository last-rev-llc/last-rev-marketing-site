[build]
  publish = "packages/web/.next"
  command = "yarn installEnvkey && yarn build"

[dev]
  publish = "packages/web/.next"
  command = "yarn installEnvkey && yarn dev"

[functions]
  directory = "packages/functions/src"
  included_files = ["!node_modules/@swc/core-linux-x64-musl/*","!node_modules/@swc/core-linux-x64-gnu/*", "node_modules/envkey/ext/envkey-source_*_linux_amd64/envkey-source"]
  external_node_modules = ["express", "envkey"]
  node_bundler = "esbuild"

[[plugins]]
  package = "./packages/cache-netlify-plugin"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Enable this plugin to run tests on Netlify
#[[plugins]]
#  package = "netlify-plugin-cypress"
#  [plugins.inputs]
#    record = true
#    start = "yarn percy exec:start"
#    configFile = "packages/web/cypress.netlify.json"

[[headers]]
  # Define which paths this header configuration applies to
  for = "/*"

  [headers.values]
  Content-Security-Policy = "default-src 'self' *.sentry.io app.netlify.com *.netlify.app; style-src 'self' 'unsafe-inline' *.sentry.io; script-src 'unsafe-eval' 'self' 'unsafe-inline' *.sentry.io app.netlify.com *.netlify.app; font-src 'self' *.sentry.io fonts.gstatic.com *.fontawesome.com data:; worker-src data: 'self' blob:; img-src * data:; media-src * data:; object-src 'none'"
  Referrer-Policy = "strict-origin-when-cross-origin"
  Strict-Transport-Security = "max-age=15768000; includeSubdomains"
  X-Content-Type-Options = "nosniff"
  X-Frame-Options = "SAMEORIGIN"
  X-XSS-Protection = "1; mode=block"
  Permissions-Policy = "camera=(), microphone=(), geolocation=()"
