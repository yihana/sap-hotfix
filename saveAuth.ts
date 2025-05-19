// saveAuth.ts
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://launchpad.support.sap.com/');

  console.log('🌐 브라우저가 열렸습니다. 로그인 후 이 창을 닫지 마세요!');
  console.log('⌛ 로그인 완료 후 90초간 대기 중...');

  await page.waitForTimeout(90000);  // 90초 동안 로그인 시간 제공
  await context.storageState({ path: 'auth.json' });

  console.log('✅ 로그인 세션이 auth.json에 저장되었습니다!');
  await browser.close();
})();
