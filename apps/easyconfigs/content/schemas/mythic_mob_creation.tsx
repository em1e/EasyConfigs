import type { BooleanString } from './basic_types';

export type DamageType =
  | 'MELEE'
  | 'PROJECTILE'
  | 'FIRE'
  | 'FIRE_TICK'
  | 'MAGIC'
  | 'POISON'
  | 'WITHER'
  | 'FALL'
  | 'DROWNING'
  | 'SUFFOCATION'
  | 'LAVA'
  | 'VOID'
  | 'LIGHTNING'
  | 'EXPLOSION';

export type DespawnType = 'true' | 'false' | 'chunk' | 'persistent' | 'never' | 'npc';

export type BossBarColor = 'PINK' | 'BLUE' | 'RED' | 'GREEN' | 'YELLOW' | 'PURPLE' | 'WHITE';

export type BossBarStyle =
  | 'SOLID'
  | 'SEGMENTED_6'
  | 'SEGMENTED_10'
  | 'SEGMENTED_12'
  | 'SEGMENTED_20';

export const DamageTypeArray: DamageType[] = [
  'MELEE',
  'PROJECTILE',
  'FIRE',
  'FIRE_TICK',
  'MAGIC',
  'POISON',
  'WITHER',
  'FALL',
  'DROWNING',
  'SUFFOCATION',
  'LAVA',
  'VOID',
  'LIGHTNING',
  'EXPLOSION',
];

export const DespawnTypeArray: DespawnType[] = [
  'true',
  'false',
  'chunk',
  'persistent',
  'never',
  'npc',
];

export const BossBarColorArray: BossBarColor[] = [
  'PINK',
  'BLUE',
  'RED',
  'GREEN',
  'YELLOW',
  'PURPLE',
  'WHITE',
];

export const BossBarStyleArray: BossBarStyle[] = [
  'SOLID',
  'SEGMENTED_6',
  'SEGMENTED_10',
  'SEGMENTED_12',
  'SEGMENTED_20',
];

export interface MobEntry {
  Type: string;
  Display?: string;
  Faction?: string;
  Mount?: string;
  Health?: number;
  Damage?: number;
  Armor?: number;
  HealthBar?: {
    Enabled: BooleanString;
    Offset: number;
  };
  BossBar?: {
    Enabled: BooleanString;
    Title?: string;
    Range?: number;
    Color?: BossBarColor;
    Style?: BossBarStyle;
    CreateFog?: BooleanString;
    DarkenSky?: BooleanString;
    PlayMusic?: BooleanString;
  };
  DisplayOptions?: Record<string, string | number | BooleanString>;
  AIGoalSelectors?: string[];
  AITargetSelectors?: string[];
  Skills?: string[];
  Drops?: string[];
  DamageModifiers?: string[];
  Equipment?: [
    string?, // MainHand
    string?, // Helmet
    string?, // Chestplate
    string?, // Leggings
    string?  // Boots
  ];
  Disguise?: string;
  DisguiseOptions?: {
    'Disguise.Burning'?: BooleanString;
    'Disguise.Blocking'?: BooleanString;
    'Disguise.Invisible'?: BooleanString;
    'Disguise.Name'?: string;
    'Disguise.ShowName'?: BooleanString;
    'Disguise.Sneaking'?: BooleanString;
    'Disguise.Sprinting'?: BooleanString;
    'Disguise.ModifyBoundingBox'?: BooleanString;
    'Disguise.Glowing'?: BooleanString;
    'Disguise.Gliding'?: BooleanString;
  };
  Options?: {
    AlwaysShowName?: BooleanString;
    AttackSpeed?: number;
    VisibleByDefault?: BooleanString;
    Invisible?: BooleanString;
    Collidable?: BooleanString;
    DigOutOfGround?: BooleanString;
    Despawn?: DespawnType;
    FollowRange?: number;
    Glowing?: BooleanString;
    HealOnReload?: BooleanString;
    KnockbackResistance?: number;
    MaxCombatDistance?: number;
    MovementSpeed?: number;
    Marker?: BooleanString;
    Small?: BooleanString;
    LockPitch?: BooleanString;
    Invincible?: BooleanString;
    Interactable?: BooleanString;
    NoAI?: BooleanString;
    NoDamageTicks?: number;
    NoGravity?: BooleanString;
    PassthroughDamage?: BooleanString;
    Persistent?: BooleanString;
    PreventItemPickup?: BooleanString;
  };
  Modules?: {
    ThreatTable?: BooleanString;
    ImmunityTable?: BooleanString;
    ThreatMultiplier?: number;
  };
  Variables?: Record<string, string | number | BooleanString>;
  Trades?: string[];
}

export type MythicMobsConfig = Record<string, MobEntry>;
