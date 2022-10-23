import utils from "./utils";

import { describe, expect, it } from "vitest";

describe("#isStaff", () => {
  it("returns true for E6", () => {
    expect(utils.isStaff("BN FSO")).toBe(true);
  });

  it("returns true for E7", () => {
    expect(utils.isStaff("BN FSNCO")).toBe(true);
  });

  it("returns true for O1", () => {
    expect(utils.isStaff("CO FSO")).toBe(true);
  });

  it("returns true for O2", () => {
    expect(utils.isStaff("CO FSNCO")).toBe(true);
  });

  it("returns false for E1", () => {
    expect(utils.isStaff("AFATDS")).toBe(false);
  });

  it("returns false for E2", () => {
    expect(utils.isStaff("FO")).toBe(false);
  });

  it("returns false for E3", () => {
    expect(utils.isStaff("RTO")).toBe(false);
  });

  it("returns false for E4", () => {
    expect(utils.isStaff("BN FO")).toBe(false);
  });
});

describe("#assignUnitPosition", () => {
  it("returns 1 for BN FSO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BN STAFF",
        team: "HQ",
        role: "BN FSO",
      })
    ).toBe(1);
  });

  it("returns 2 for BN FSNCO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BN STAFF",
        team: "HQ",
        role: "BN FSNCO",
      })
    ).toBe(2);
  });

  it("returns 3 for BN FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BN STAFF",
        team: "HQ",
        role: "BN FO",
      })
    ).toBe(3);
  });

  it("returns 4 for AFATDS", () => {
    expect(
      utils.assignUnitPosition({
        section: "BN STAFF",
        team: "HQ",
        role: "AFATDS",
      })
    ).toBe(4);
  });

  it("returns 5 for BN RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BN STAFF",
        team: "HQ",
        role: "BN RTO",
      })
    ).toBe(5);
  });

  it("returns 10 for ALPHA CO FSO", () => {
    expect(
      utils.assignUnitPosition({ section: "ALPHA", team: "HQ", role: "CO FSO" })
    ).toBe(10);
  });

  it("returns 11 for ALPHA CO FSNCO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "HQ",
        role: "CO FSNCO",
      })
    ).toBe(11);
  });

  it("returns 12 for ALPHA Team 1 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "1",
        role: "FO",
      })
    ).toBe(12);
  });

  it("returns 13 for ALPHA Team 1 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "1",
        role: "RTO",
      })
    ).toBe(13);
  });

  it("returns 14 for ALPHA Team 2 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "2",
        role: "FO",
      })
    ).toBe(14);
  });

  it("returns 15 for ALPHA Team 2 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "2",
        role: "RTO",
      })
    ).toBe(15);
  });

  it("returns 16 for ALPHA Team 3 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "3",
        role: "FO",
      })
    ).toBe(16);
  });

  it("returns 17 for ALPHA Team 3 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "ALPHA",
        team: "3",
        role: "RTO",
      })
    ).toBe(17);
  });

  it("returns 20 for BRAVO CO FSO", () => {
    expect(
      utils.assignUnitPosition({ section: "BRAVO", team: "HQ", role: "CO FSO" })
    ).toBe(20);
  });

  it("returns 21 for BRAVO CO FSNCO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "HQ",
        role: "CO FSNCO",
      })
    ).toBe(21);
  });

  it("returns 22 for BRAVO Team 1 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "1",
        role: "FO",
      })
    ).toBe(22);
  });

  it("returns 23 for BRAVO Team 1 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "1",
        role: "RTO",
      })
    ).toBe(23);
  });

  it("returns 24 for BRAVO Team 2 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "2",
        role: "FO",
      })
    ).toBe(24);
  });

  it("returns 25 for BRAVO Team 2 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "2",
        role: "RTO",
      })
    ).toBe(25);
  });

  it("returns 26 for BRAVO Team 3 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "3",
        role: "FO",
      })
    ).toBe(26);
  });

  it("returns 27 for BRAVO Team 3 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "BRAVO",
        team: "3",
        role: "RTO",
      })
    ).toBe(27);
  });

  it("returns 30 for CHARLIE CO FSO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "HQ",
        role: "CO FSO",
      })
    ).toBe(30);
  });

  it("returns 31 for CHARLIE CO FSNCO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "HQ",
        role: "CO FSNCO",
      })
    ).toBe(31);
  });

  it("returns 32 for CHARLIE Team 1 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "1",
        role: "FO",
      })
    ).toBe(32);
  });

  it("returns 33 for CHARLIE Team 1 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "1",
        role: "RTO",
      })
    ).toBe(33);
  });

  it("returns 34 for CHARLIE Team 2 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "2",
        role: "FO",
      })
    ).toBe(34);
  });

  it("returns 35 for CHARLIE Team 2 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "2",
        role: "RTO",
      })
    ).toBe(35);
  });

  it("returns 36 for CHARLIE Team 3 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "3",
        role: "FO",
      })
    ).toBe(36);
  });

  it("returns 37 for CHARLIE Team 3 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "3",
        role: "RTO",
      })
    ).toBe(37);
  });

  it("returns 37 for CHARLIE Team 3 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "CHARLIE",
        team: "3",
        role: "RTO",
      })
    ).toBe(37);
  });

  it("returns 40 for DELTA CO FSO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "HQ",
        role: "CO FSO",
      })
    ).toBe(40);
  });

  it("returns 41 for DELTA CO FSNCO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "HQ",
        role: "CO FSNCO",
      })
    ).toBe(41);
  });

  it("returns 42 for DELTA Team 1 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "1",
        role: "FO",
      })
    ).toBe(42);
  });

  it("returns 43 for DELTA Team 1 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "1",
        role: "RTO",
      })
    ).toBe(43);
  });

  it("returns 44 for DELTA Team 2 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "2",
        role: "FO",
      })
    ).toBe(44);
  });

  it("returns 45 for DELTA Team 2 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "2",
        role: "RTO",
      })
    ).toBe(45);
  });

  it("returns 46 for DELTA Team 3 FO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "3",
        role: "FO",
      })
    ).toBe(46);
  });

  it("returns 47 for DELTA Team 3 RTO", () => {
    expect(
      utils.assignUnitPosition({
        section: "DELTA",
        team: "3",
        role: "RTO",
      })
    ).toBe(47);
  });

  it("returns 50 for UNASSIGNED", () => {
    expect(
      utils.assignUnitPosition({
        section: "UNASSIGNED",
        team: "UNASSIGNED",
        role: "UNASSIGNED",
      })
    ).toBe(50);
  });

  it("returns 50 for no input", () => {
    expect(
      utils.assignUnitPosition({
        section: "",
        team: "",
        role: "",
      })
    ).toBe(50);
  });
});
