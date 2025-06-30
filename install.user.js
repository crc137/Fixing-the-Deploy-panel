// ==UserScript==
// @name         Fixing Dokploy Panel
// @name:de      Fixieren des Dokploy-Panels
// @name:es      Arreglar panel de Dokploy
// @name:zh      修复 Dokploy 面板
// @name:zh-TW   修復 Dokploy 面板
// @name:pt      Corrigir painel do Dokploy
// @name:ru      Исправление панели Dokploy
// @name:ja      Dokploy パネルの修正
// @name:ko      Dokploy 패널 수정
// @name:fr      Correction du panneau Dokploy
// @name:tr      Dokploy Panelini Düzelt
// @name:it      Correzione del pannello Dokploy
// @name:pl      Naprawa panelu Dokploy
// @name:uk      Виправлення панелі Dokploy
// @name:fa      اصلاح پنل Dokploy
// @name:nl      Dokploy-paneel repareren
// @name:id      Memperbaiki panel Dokploy
// @name:kk      Dokploy панелін түзету
// @name:no      Fikse Dokploy-panelet
// @name:az      Dokploy panelinin düzəldilməsi
// @name:ml      Dokploy പാനൽ പരിഹരിക്കൽ

// @description  Fixing the Dokploy admin panel
// @description:de  Fehlerbehebung im Dokploy-Admin-Panel
// @description:es  Arreglando el panel de administración de Dokploy
// @description:zh  修复 Dokploy 管理面板
// @description:zh-TW  修復 Dokploy 管理面板
// @description:pt  Corrigindo o painel de administração do Dokploy
// @description:ru  Исправление панели администратора Dokploy
// @description:ja  Dokploy 管理パネルの修正
// @description:ko  Dokploy 관리자 패널 수정
// @description:fr  Correction du panneau d'administration Dokploy
// @description:tr  Dokploy yönetici panelini düzeltme
// @description:it  Correzione del pannello di amministrazione di Dokploy
// @description:pl  Naprawa panelu administracyjnego Dokploy
// @description:uk  Виправлення панелі адміністратора Dokploy
// @description:fa  اصلاح پنл مدیریت Dokploy
// @description:nl  Het beheerpaneel van Dokploy repareren
// @description:id  Memperbaiki panel admin Dokploy
// @description:kk  Dokploy әкімшілік панелін түзету
// @description:no  Fikser Dokploy administrasjonspanel
// @description:az  Dokploy idarəetmə panelinin düzəldilməsi
// @description:ml  Dokploy അഡ്മിന് പാനൽ പരിഹരിക്കുന്നു

// @namespace    http://tampermonkey.net/
// @version      1.0.6
// @author       Coonlink Dev
// @license      MIT
// @homepageURL  https://github.com/crc137/Fixing-the-Deploy-panel
// @updateURL    https://github.com/crc137/Fixing-the-Deploy-panel/raw/refs/heads/main/install.user.js
// @downloadURL  https://github.com/crc137/Fixing-the-Deploy-panel/raw/refs/heads/main/install.user.js
// @supportURL   https://github.com/crc137/Fixing-the-Deploy-panel/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dokploy.com
// @grant        none
// @run-at       document-end
// @noframes
// @match        http://*/*
// @match        https://*/*
// @match        *://*.coonlink.com/*
// ==/UserScript==

(function () {
    'use strict';

    function isDokployPage() {
        const titleEl = document.querySelector('title');
        if (titleEl && titleEl.textContent.includes('Dokploy')) {
            return true;
        }

        try {
            const nextDataScript = document.querySelector('#__NEXT_DATA__');
            if (nextDataScript) {
                const data = JSON.parse(nextDataScript.textContent);
                const metricsType = data?.props?.pageProps?.trpcState?.json?.queries
                    ?.find(q => q.queryKey?.[0]?.[0] === 'user' && q.queryKey?.[0]?.[1] === 'get')
                    ?.state?.data?.user?.metricsConfig?.server?.type;
                if (metricsType === 'Dokploy') {
                    return true;
                }
            }
        } catch (e) {
            console.warn('[Fixing Dokploy Panel] JSON parse error:', e);
        }

        return false;
    }

    if (!isDokployPage()) {
        console.log('[Fixing Dokploy Panel] Not a Dokploy page. Skipping script.');
        return;
    }

    console.log('[Fixing Dokploy Panel] ✅ Dokploy detected. Loading external script...');

    const script = document.createElement('script');
    script.src = 'https://raw.coonlink.com/fixing-dokploy-panel.user.js';
    script.type = 'module';
    script.setAttribute('data-loaded-by', 'Fixing-Dokploy-Panel');
    document.head.appendChild(script);
})();
