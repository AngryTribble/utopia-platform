# Utopia Platform Data Model

Version: 0.1  
Status: Draft

## Purpose

Define the core data structures used by Utopia Platform.

The goal is to make card data easy to read, easy to validate, and easy to expand.

## Core Principle

Cards should be mostly data.

Rules should be reusable modules whenever possible.

Custom code should only be needed for rare edge cases.

## Core Entities

- Card
- Ship
- Ship Class
- Captain
- Admiral
- Ambassador
- Upgrade
- Resource
- Expansion
- Faction
- Rule Reference
- Mission

## Universal Card Fields

Every card should have:

```ts
type CardBase = {
  id: string;
  name: string;
  cardType: string;
  factions: string[];
  setIds: string[];
  cost: number | "variable";
  imageUrl?: string;
  text: string;
  unique?: boolean;
  mirror?: boolean;
  keywords?: string[];
  rules?: string[];
};
