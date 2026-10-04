export const RELEASE_AT = Date.parse('2026-10-05T00:00:00+05:00');
export function countdownAt(now){const remaining=Math.max(0,Math.ceil((RELEASE_AT-now)/1000));return {unlocked:now>=RELEASE_AT,days:Math.floor(remaining/86400),hours:Math.floor(remaining/3600)%24,minutes:Math.floor(remaining/60)%60,seconds:remaining%60};}
