import { defineConfig } from "@playwright/test";
export default defineConfig({
 testDir:"./tests",testMatch:"redesign.spec.ts",timeout:60000,workers:2,
 use:{baseURL:"http://localhost:3100",reducedMotion:"reduce",trace:"retain-on-failure"},
 webServer:{command:"npm run start -- --port 3100",url:"http://localhost:3100/bg",reuseExistingServer:false,timeout:120000},
});
