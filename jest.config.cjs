module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  resolver: null,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
