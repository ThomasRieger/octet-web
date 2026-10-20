// All page copy, English and Thai. Thai follows the app's own wording (ui/index.html):
// casual, and network terms like Gateway, DNS and Admin stay in English.

export type Lang = "en" | "th";

const en = {
  meta: {
    description: "A fast, modern take on Simple IP Config, written in Rust. One portable .exe, no installer, no telemetry.",
  },
  nav: { paste: "Paste", engine: "Engine", privacy: "Privacy", download: "Download" },
  hero: {
    windows: "Windows 10 & 11",
    latest: "Latest release",
    before: "Switch to",
    after: "in seconds.",
    label: "Switch IPv4 and DNS in seconds.",
    lede: "Octet changes IPv4 and DNS on Windows in one click, then shows you who else is on the network. A fast, modern take on Simple IP Config, written in Rust.",
    download: "Download Octet.exe",
    source: "View source",
    meta: "One portable file · no installer · no telemetry · MIT",
  },
  tour: {
    hint: "Keys 1–5 switch tabs, like Ctrl+1–5 in the app",
    alt: "Octet, {name} tab",
    tabs: [
      { img: "ip", name: "IP & DNS", title: "DHCP or manual in one click.",
        body: "Every field is checked as you type. Before Apply, Octet asks the network whether someone already has the address. After, it pings the gateway and DNS for you." },
      { img: "advanced", name: "Advanced", title: "Several addresses and gateways.",
        body: "Stack extra addresses and gateways on one adapter, each with its own metric." },
      { img: "ping", name: "Ping", title: "Live latency, jitter and loss.",
        body: "A running graph to the gateway or any host, sent out this adapter and no other. Add :port for devices that ignore ping." },
      { img: "scan", name: "Scan", title: "Who else is on the subnet.",
        body: "Every address in the range as a grid, with the maker and MAC of whatever answers. Click a device to see its open ports and open its web page." },
      { img: "info", name: "Info", title: "Everything about the adapter.",
        body: "What Windows knows about the adapter, in one list. One click copies it." },
    ],
  },
  paste: {
    eyebrow: "Paste",
    title: "One line in, a whole setup out.",
    sub: "Try it. This is the parser from the app: an address with /prefix or a mask, then gw and dns.",
    input: "Paste a setup",
    ok: "Paste this anywhere in Octet and the form fills in.",
    bad: "Not a setup yet. Start with an address, then /prefix or a mask.",
    try: "Try",
  },
  engine: {
    eyebrow: "Engine",
    title: "Fast, all the way down.",
    sub: "Rust talking to Windows directly. A DNS change takes milliseconds.",
    nos: ["ipconfig", "PowerShell", "flashing consoles"],
    api: [
      ["IP Helper", "Addresses, DNS and DHCP."],
      ["ICMP", "Ping, and the checks after Apply."],
      ["WinHTTP", "Public IP and updates, when you ask."],
    ],
    details: [
      ["Follows Windows", "Cable, Wi-Fi and address changes show up on their own."],
      ["The usual buttons", "Release and renew, flush DNS, enable and disable adapters."],
      ["DNS presets", "Google, Cloudflare, Quad9, AdGuard, OpenDNS and NextDNS, named as you type them."],
      ["One line, whole setup", "Copy a configuration as text, paste it on another PC."],
      ["Keyboard first", "Ctrl+1 to Ctrl+5 switch tabs."],
      ["Updates inside", "Check, download and restart from Settings. Every release is signed."],
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Private by default.",
    sub: "No account, no telemetry, no server of its own.",
    diagram: "Octet talks to your network. The internet only when you ask: your public IP, or an update.",
    pc: "This PC",
    net: "Your network",
    wire: "ARP · ping · lookup",
    wireOut: "on click",
    items: [
      ["Sends only what you'd expect", "An ARP check before Apply, pings to the gateway and DNS after it, pings and ARP while you Ping or Scan, a TCP connect when you ping a port or check a device's ports, and a reverse lookup for the gateway."],
      ["MAC addresses stay home", "Device makers come from the IEEE list built into the app. MACs are never looked up online."],
      ["The internet only on a click", "Your public IP through ipinfo.io, and updates from GitHub, each only when you click it."],
      ["Admin only for the change", "Octet opens without admin rights. UAC asks when you Apply, toggle an adapter or release and renew, and only that change runs elevated."],
    ],
  },
  get: {
    title: "Get Octet.",
    sub: "One file. Run it.",
    all: "All releases",
    notes: [
      ["Windows 11", "Runs as is."],
      ["Windows 10", "Needs the WebView2 Runtime. Most PCs already have it."],
      ["Not code-signed yet", "If SmartScreen stops it, choose More info, then Run anyway."],
    ],
    signed: "Updates from inside Octet are checked against Octet's own signature before they install.",
    hash: "Check it against",
    copy: "Copy",
    copied: "Copied",
  },
  footer: { inspired: "Inspired by", noCode: ", shares no code with it.", tracking: "No cookies, no tracking." },
};

export type Dict = typeof en;

const th: Dict = {
  meta: {
    description: "Simple IP Config ยุคใหม่ที่เร็วกว่าเดิม เขียนด้วย Rust ไฟล์ .exe ไฟล์เดียว ไม่ต้องติดตั้ง ไม่เก็บข้อมูลการใช้งาน",
  },
  nav: { paste: "วางค่า", engine: "ความเร็ว", privacy: "ความเป็นส่วนตัว", download: "ดาวน์โหลด" },
  hero: {
    windows: "Windows 10 และ 11",
    latest: "เวอร์ชันล่าสุด",
    before: "เปลี่ยน IP เป็น",
    after: "ได้ในไม่กี่วินาที",
    label: "เปลี่ยน IPv4 และ DNS ได้ในไม่กี่วินาที",
    lede: "Octet เปลี่ยน IPv4 และ DNS บน Windows ได้ในคลิกเดียว แถมดูได้ว่ามีเครื่องไหนอยู่ในเครือข่ายเดียวกันบ้าง เป็น Simple IP Config ยุคใหม่ที่เร็วกว่าเดิม เขียนด้วย Rust",
    download: "ดาวน์โหลด Octet.exe",
    source: "ดูซอร์สโค้ด",
    meta: "ไฟล์เดียวจบ · ไม่ต้องติดตั้ง · ไม่เก็บข้อมูลการใช้งาน · MIT",
  },
  tour: {
    hint: "กด 1–5 เพื่อสลับแท็บ เหมือนกด Ctrl+1–5 ในแอป",
    alt: "Octet หน้า {name}",
    tabs: [
      { img: "ip", name: "IP & DNS", title: "สลับ DHCP กับกำหนดเองได้ในคลิกเดียว",
        body: "ทุกช่องตรวจค่าให้ทันทีที่พิมพ์ ก่อนบันทึก Octet จะเช็กให้ว่ามีเครื่องอื่นใช้ IP นี้อยู่หรือเปล่า และหลังบันทึกจะ ping Gateway กับ DNS ให้อัตโนมัติ" },
      { img: "advanced", name: "ขั้นสูง", title: "ใส่ได้หลาย IP หลาย Gateway",
        body: "เพิ่ม IP และ Gateway ได้หลายชุดในอะแดปเตอร์เดียว ตั้ง Metric แยกกันได้ทุกชุด" },
      { img: "ping", name: "Ping", title: "ดู Latency, Jitter และ Loss แบบเรียลไทม์",
        body: "กราฟเรียลไทม์ไปยัง Gateway หรือปลายทางไหนก็ได้ โดยส่งออกทางอะแดปเตอร์นี้เท่านั้น อุปกรณ์ที่ไม่ตอบ ping ก็ใส่ :port ต่อท้ายได้" },
      { img: "scan", name: "หา IP", title: "ดูว่าใครอยู่ใน Subnet นี้บ้าง",
        body: "แสดงทุก IP ในวงเป็นตาราง พร้อมยี่ห้อและ MAC ของอุปกรณ์ที่ตอบกลับ กดที่อุปกรณ์เพื่อดู port ที่เปิดอยู่ และเปิดหน้าเว็บของมันได้" },
      { img: "info", name: "ข้อมูล", title: "ข้อมูลอะแดปเตอร์ครบในที่เดียว",
        body: "ทุกอย่างที่ Windows รู้เกี่ยวกับอะแดปเตอร์นี้ รวมไว้ในรายการเดียว คัดลอกได้ในคลิกเดียว" },
    ],
  },
  paste: {
    eyebrow: "วางค่า",
    title: "วางบรรทัดเดียว ได้ค่าครบชุด",
    sub: "ลองดูได้เลย นี่คือตัวอ่านค่าตัวเดียวกับในแอป ใส่ IP ตามด้วย /prefix หรือ mask แล้วต่อด้วย gw และ dns",
    input: "วางค่าทั้งหมด",
    ok: "วางลงตรงไหนก็ได้ใน Octet แล้วฟอร์มจะกรอกให้เอง",
    bad: "ยังอ่านค่าไม่ได้ ให้เริ่มด้วย IP แล้วตามด้วย /prefix หรือ mask",
    try: "ตัวอย่าง",
  },
  engine: {
    eyebrow: "ความเร็ว",
    title: "เร็วทุกขั้นตอน",
    sub: "Rust คุยกับ Windows โดยตรง เปลี่ยน DNS เสร็จในเสี้ยววินาที",
    nos: ["ipconfig", "PowerShell", "จอดำเด้งขึ้นมา"],
    api: [
      ["IP Helper", "จัดการ IP, DNS และ DHCP"],
      ["ICMP", "Ping และการเช็กหลังบันทึก"],
      ["WinHTTP", "ดู IP สาธารณะและอัปเดต เมื่อคุณกด"],
    ],
    details: [
      ["อัปเดตตาม Windows", "เสียบสาย สลับ Wi-Fi หรือ IP เปลี่ยน แอปก็อัปเดตให้เอง"],
      ["ปุ่มที่ใช้บ่อยครบ", "Release และ Renew, ล้างแคช DNS, เปิดและปิดอะแดปเตอร์"],
      ["DNS ยอดนิยมพร้อมใช้", "Google, Cloudflare, Quad9, AdGuard, OpenDNS และ NextDNS พิมพ์ IP แล้วขึ้นชื่อให้ทันที"],
      ["คัดลอกค่าทั้งชุด", "คัดลอกค่าทั้งหมดเป็นข้อความบรรทัดเดียว แล้วไปวางบนอีกเครื่องได้เลย"],
      ["ใช้คีย์บอร์ดได้คล่อง", "กด Ctrl+1 ถึง Ctrl+5 เพื่อสลับแท็บ"],
      ["อัปเดตในแอป", "ตรวจ โหลด และรีสตาร์ทได้จาก Settings ทุกเวอร์ชันมีลายเซ็นกำกับ"],
    ],
  },
  privacy: {
    eyebrow: "ความเป็นส่วนตัว",
    title: "ความเป็นส่วนตัวมาก่อน",
    sub: "ไม่ต้องสมัครบัญชี ไม่เก็บข้อมูลการใช้งาน และไม่มีเซิร์ฟเวอร์ของตัวเอง",
    diagram: "Octet คุยกับเครือข่ายของคุณเท่านั้น และจะออกอินเทอร์เน็ตเมื่อคุณกดเท่านั้น คือดู IP สาธารณะ หรืออัปเดต",
    pc: "เครื่องนี้",
    net: "เครือข่ายของคุณ",
    wire: "ARP · ping · lookup",
    wireOut: "เมื่อกด",
    items: [
      ["ส่งข้อมูลเท่าที่จำเป็น", "เช็ก ARP ก่อนบันทึก, ping Gateway และ DNS หลังบันทึก, ping และ ARP ระหว่างใช้ Ping หรือหา IP, ต่อ TCP เมื่อ ping ไปที่ port หรือตรวจ port ของอุปกรณ์ และค้นชื่อของ Gateway"],
      ["MAC ไม่ถูกส่งออกไป", "ยี่ห้ออุปกรณ์ดูจากรายชื่อ IEEE ที่ฝังอยู่ในแอป ไม่มีการเอา MAC ไปค้นออนไลน์"],
      ["ออกอินเทอร์เน็ตเมื่อกดเท่านั้น", "ดู IP สาธารณะผ่าน ipinfo.io และตรวจอัปเดตจาก GitHub ทั้งสองอย่างทำเฉพาะตอนที่คุณกด"],
      ["ขอสิทธิ์ Admin เฉพาะตอนจำเป็น", "Octet เปิดใช้ได้โดยไม่ต้องมีสิทธิ์ Admin ระบบจะถาม UAC เฉพาะตอนบันทึก เปิดปิดอะแดปเตอร์ หรือ Release/Renew และให้สิทธิ์เฉพาะคำสั่งนั้น"],
    ],
  },
  get: {
    title: "ดาวน์โหลด Octet",
    sub: "ไฟล์เดียว ดับเบิลคลิกแล้วใช้ได้เลย",
    all: "ดูทุกเวอร์ชัน",
    notes: [
      ["Windows 11", "ใช้งานได้ทันที"],
      ["Windows 10", "ต้องมี WebView2 Runtime ซึ่งเครื่องส่วนใหญ่มีอยู่แล้ว"],
      ["ยังไม่ได้เซ็นรับรองโค้ด", "ถ้า SmartScreen ขึ้นเตือน ให้กด More info แล้วกด Run anyway"],
    ],
    signed: "อัปเดตจากในแอปจะถูกตรวจลายเซ็นของ Octet เองก่อนติดตั้งทุกครั้ง",
    hash: "ตรวจสอบไฟล์กับ",
    copy: "คัดลอก",
    copied: "คัดลอกแล้ว",
  },
  footer: { inspired: "ได้แรงบันดาลใจจาก", noCode: " แต่ไม่ได้ใช้โค้ดร่วมกัน", tracking: "ไม่มีคุกกี้ ไม่มีการติดตามผู้ใช้" },
};

export const dict: Record<Lang, Dict> = { en, th };
