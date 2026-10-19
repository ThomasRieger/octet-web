import { test } from "node:test";
import assert from "node:assert/strict";
import { masks, parseConfig, resolver, scope } from "./config.ts";

test("masks", () => {
  assert.equal(masks[0], "0.0.0.0");
  assert.equal(masks[23], "255.255.254.0");
  assert.equal(masks[32], "255.255.255.255");
});

test("parseConfig", () => {
  assert.deepEqual(parseConfig("192.168.1.50/24 gw 192.168.1.1 dns 1.1.1.1, 8.8.8.8"),
    { address: "192.168.1.50", subnet: "255.255.255.0", prefix: 24, gateway: "192.168.1.1", dns1: "1.1.1.1", dns2: "8.8.8.8" });
  assert.equal(parseConfig("10.0.1.124 mask 255.255.254.0")?.prefix, 23);
  assert.equal(parseConfig("10.0.0.5 255.255.0.255"), null);   // not a real mask
  assert.equal(parseConfig("300.1.1.1/24"), null);
  assert.equal(parseConfig("10.0.0.5/33"), null);
  assert.equal(parseConfig("hello"), null);
});

test("scope and resolver", () => {
  assert.equal(scope("172.20.0.1"), "Private");
  assert.equal(scope("172.32.0.1"), "Public");
  assert.equal(scope("100.100.1.1"), "CGNAT");
  assert.equal(resolver("9.9.9.9"), "Quad9");
  assert.equal(resolver("10.0.0.1"), null);
});
