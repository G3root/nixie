const buildRouteFilePath = path => {
  return `routes${path ? path : ''}/page.tsx`
}

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  tailwind: true,
  postcss: true,
  serverModuleFormat: 'esm',
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",

  routes: defineRoutes => {
    return defineRoutes(route => {
      route('/', buildRouteFilePath(''), { index: true })
      route('/login', buildRouteFilePath('/login'), { index: true })
    })
  },
}
