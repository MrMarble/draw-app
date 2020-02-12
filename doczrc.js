export default {
  files: '**/*.{md,markdown,mdx}',
  filterComponents: (files) => files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
};
