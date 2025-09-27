import React from 'react';
import { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';
import yaml from 'js-yaml';
import type { BossBarColor, BossBarStyle, DespawnType } from './mythic_mob_creation';
import type { BooleanString, MobTypes } from './basic_types';
import { mobTypesArray } from './basic_types';
import { BossBarStyleArray, BossBarColorArray, DespawnTypeArray, DamageTypeArray } from './mythic_mob_creation';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';

const toBooleanString = (v: any): BooleanString => (v ? 'true' : 'false');

export type MobForm = {
  internalName: string;
  Type: MobTypes;
  Display?: string;
  Faction?: string;
  Mount?: string;
  Health?: number;
  Damage?: number;
  Armor?: number;
  HealthBar?: {
    Enabled?: boolean;
    Offset?: number;
  };
  BossBar?: {
    Enabled?: boolean;
    Title?: string;
    Range?: number;
    Color?: BossBarColor;
    Style?: BossBarStyle;
    CreateFog?: boolean;
    DarkenSky?: boolean;
    PlayMusic?: boolean;
  };
  AIGoalSelectors: { value: string }[];
  AITargetSelectors: { value: string }[];
  Skills: { value: string }[];
  Drops: { value: string }[];
  DamageModifiers: { value: string }[];
  Equipment: {
    MainHand?: string;
    Helmet?: string;
    Chestplate?: string;
    Leggings?: string;
    Boots?: string;
  };
  Options: {
    AlwaysShowName?: boolean;
    AttackSpeed?: number;
    VisibleByDefault?: boolean;
    Invisible?: boolean;
    Collidable?: boolean;
    DigOutOfGround?: boolean;
    Despawn?: DespawnType;
    FollowRange?: number;
    Glowing?: boolean;
    HealOnReload?: boolean;
    KnockbackResistance?: number;
    MaxCombatDistance?: number;
    MovementSpeed?: number;
    Marker?: boolean;
    Small?: boolean;
    LockPitch?: boolean;
    Invincible?: boolean;
    Interactable?: boolean;
    NoAI?: boolean;
    NoDamageTicks?: number;
    NoGravity?: boolean;
    PassthroughDamage?: boolean;
    Persistent?: boolean;
    PreventItemPickup?: boolean;
  };
};

function mobFormToYaml(form: MobForm) {
  const mob: any = {
    Type: form.Type,
    ...(form.Display && { Display: form.Display }),
    ...(form.Faction && { Faction: form.Faction }),
    ...(form.Mount && { Mount: form.Mount }),
    ...(form.Health && { Health: form.Health }),
    ...(form.Damage && { Damage: form.Damage }),
    ...(form.Armor && { Armor: form.Armor }),
    ...(form.HealthBar && {
      HealthBar: {
        ...(form.HealthBar.Enabled !== undefined && { Enabled: toBooleanString(form.HealthBar.Enabled) }),
        ...(form.HealthBar.Offset !== undefined && { Offset: form.HealthBar.Offset }),
      },
    }),
    ...(form.BossBar && {
      BossBar: {
        ...(form.BossBar.Enabled !== undefined && { Enabled: toBooleanString(form.BossBar.Enabled) }),
        ...(form.BossBar.Title && { Title: form.BossBar.Title }),
        ...(form.BossBar.Range !== undefined && { Range: form.BossBar.Range }),
        ...(form.BossBar.Color && { Color: form.BossBar.Color }),
        ...(form.BossBar.Style && { Style: form.BossBar.Style }),
        ...(form.BossBar.CreateFog !== undefined && { CreateFog: toBooleanString(form.BossBar.CreateFog) }),
        ...(form.BossBar.DarkenSky !== undefined && { DarkenSky: toBooleanString(form.BossBar.DarkenSky) }),
        ...(form.BossBar.PlayMusic !== undefined && { PlayMusic: toBooleanString(form.BossBar.PlayMusic) }),
      },
    }),
    ...(form.AIGoalSelectors && form.AIGoalSelectors.length > 0 && {
      AIGoalSelectors: form.AIGoalSelectors.filter(s => s.value).map(s => s.value),
    }),
    ...(form.AITargetSelectors && form.AITargetSelectors.length > 0 && {
      AITargetSelectors: form.AITargetSelectors.filter(s => s.value).map(s => s.value),
    }),
    ...(form.Skills && form.Skills.length > 0 && {
      Skills: form.Skills.filter(s => s.value).map(s => s.value),
    }),
    ...(form.Drops && form.Drops.length > 0 && {
      Drops: form.Drops.filter(d => d.value).map(d => d.value),
    }),
    ...(form.DamageModifiers && form.DamageModifiers.length > 0 && {
      DamageModifiers: form.DamageModifiers.filter(d => d.value).map(d => d.value),
    }),
    ...(form.Equipment && (
      form.Equipment.MainHand ||
      form.Equipment.Helmet ||
      form.Equipment.Chestplate ||
      form.Equipment.Leggings ||
      form.Equipment.Boots
    ) && {
      Equipment: [
        form.Equipment.MainHand || undefined,
        form.Equipment.Helmet || undefined,
        form.Equipment.Chestplate || undefined,
        form.Equipment.Leggings || undefined,
        form.Equipment.Boots || undefined,
      ].filter(Boolean),
    }),
    ...(form.Options && Object.keys(form.Options).length > 0 && {
      Options: Object.fromEntries(
        Object.entries(form.Options)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) =>
            typeof v === "boolean"
              ? [k, toBooleanString(v)]
              : [k, v]
          )
      ),
    }),
  };

  return { [form.internalName]: mob };
}

export default function MythicMobForm() {
  const { register, handleSubmit, control, reset } = useForm<MobForm>({
    defaultValues: {
      AIGoalSelectors: [{ value: '' }],
      AITargetSelectors: [{ value: '' }],
      Skills: [{ value: '' }],
      Drops: [{ value: '' }],
      DamageModifiers: [{ value: '' }],
      Equipment: {},
      Options: {},
    },
  });

  const aiGoalArray = useFieldArray({ control, name: 'AIGoalSelectors' });
  const aiTargetArray = useFieldArray({ control, name: 'AITargetSelectors' });
  const skillsArray = useFieldArray({ control, name: 'Skills' });
  const dropsArray = useFieldArray({ control, name: 'Drops' });
  const dmgModsArray = useFieldArray({ control, name: 'DamageModifiers' });

  const [yamlOutput, setYamlOutput] = useState('');

  const onSubmit = (data: MobForm) => {
    const yamlObj = mobFormToYaml(data);
    setYamlOutput(yaml.dump(yamlObj, { lineWidth: 120 }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MythicMob YAML Generator</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('internalName', { required: true })} placeholder="Internal Name" className="input" required />
        <select
          {...register('Type', { required: true })}
          className="input w-full"
          required
        >
          <option value="">Select Mob Type</option>
          {mobTypesArray.map((mob) => (
            <option key={mob} value={mob}>{mob}</option>
          ))}
        </select>
        <input {...register('Display')} placeholder="Display Name" className="input" />
        <input {...register('Faction')} placeholder="Faction" className="input" />
        <input {...register('Mount')} placeholder="Mount (InternalMobName)" className="input" />
        <input type="number" {...register('Health')} placeholder="Health" className="input" />
        <input type="number" {...register('Damage')} placeholder="Damage" className="input" />
        <input type="number" {...register('Armor')} placeholder="Armor" className="input" />

        {/* HealthBar */}
        <div>
          <label className="font-semibold">HealthBar</label>
          <div className="flex gap-2 items-center">
            <label>
              <input type="checkbox" {...register('HealthBar.Enabled')} /> Enabled
            </label>
            <input type="number" {...register('HealthBar.Offset')} placeholder="Offset" className="input w-24" />
          </div>
        </div>

        {/* BossBar */}
        <div>
          <label className="font-semibold">BossBar</label>
          <div className="flex gap-2 items-center flex-wrap">
            <label>
              <input type="checkbox" {...register('BossBar.Enabled')} /> Enabled
            </label>
            <input {...register('BossBar.Title')} placeholder="Title" className="input w-32" />
            <input type="number" {...register('BossBar.Range')} placeholder="Range" className="input w-20" />
            <select {...register('BossBar.Color')}>
              <option value="">Color</option>
              {BossBarColorArray.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select {...register('BossBar.Style')}>
              <option value="">Style</option>
              {BossBarStyleArray.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <label>
              <input type="checkbox" {...register('BossBar.CreateFog')} /> CreateFog
            </label>
            <label>
              <input type="checkbox" {...register('BossBar.DarkenSky')} /> DarkenSky
            </label>
            <label>
              <input type="checkbox" {...register('BossBar.PlayMusic')} /> PlayMusic
            </label>
          </div>
        </div>

        {/* AIGoalSelectors */}
        <div>
          <label className="font-semibold">AIGoalSelectors</label>
          {aiGoalArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`AIGoalSelectors.${idx}.value`)} placeholder="e.g. 0 clear" className="input" />
              <button type="button" onClick={() => aiGoalArray.remove(idx)} className="btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => aiGoalArray.append({ value: '' })} className="btn">Add Goal</button>
        </div>

        {/* AITargetSelectors */}
        <div>
          <label className="font-semibold">AITargetSelectors</label>
          {aiTargetArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`AITargetSelectors.${idx}.value`)} placeholder="e.g. 0 clear" className="input" />
              <button type="button" onClick={() => aiTargetArray.remove(idx)} className="btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => aiTargetArray.append({ value: '' })} className="btn">Add Target</button>
        </div>

        {/* Skills */}
        <div>
          <label className="font-semibold">Skills</label>
          {skillsArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`Skills.${idx}.value`)} placeholder="Skill String" className="input" />
              <button type="button" onClick={() => skillsArray.remove(idx)} className="btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => skillsArray.append({ value: '' })} className="btn">Add Skill</button>
        </div>

        {/* Drops */}
        <div>
          <label className="font-semibold">Drops</label>
          {dropsArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`Drops.${idx}.value`)} placeholder="Drop String" className="input" />
              <button type="button" onClick={() => dropsArray.remove(idx)} className="btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => dropsArray.append({ value: '' })} className="btn">Add Drop</button>
        </div>

        {/* DamageModifiers */}
        <div>
          <label className="font-semibold">DamageModifiers</label>
          {dmgModsArray.fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`DamageModifiers.${idx}.value`)} placeholder="DamageType Multiplier (e.g. PROJECTILE 0.5)" className="input" />
              <button type="button" onClick={() => dmgModsArray.remove(idx)} className="btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => dmgModsArray.append({ value: '' })} className="btn">Add Modifier</button>
        </div>

        {/* Equipment */}
        <div>
          <label className="font-semibold">Equipment</label>
          <div className="flex gap-2 flex-wrap">
            <input {...register('Equipment.MainHand')} placeholder="MainHand" className="input w-28" />
            <input {...register('Equipment.Helmet')} placeholder="Helmet" className="input w-28" />
            <input {...register('Equipment.Chestplate')} placeholder="Chestplate" className="input w-28" />
            <input {...register('Equipment.Leggings')} placeholder="Leggings" className="input w-28" />
            <input {...register('Equipment.Boots')} placeholder="Boots" className="input w-28" />
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="font-semibold">Options</label>
          <div className="flex gap-4 flex-wrap items-center">
            <label>
              <input type="checkbox" {...register('Options.AlwaysShowName')} /> AlwaysShowName
            </label>
            <label>
              <input type="checkbox" {...register('Options.AttackSpeed')} /> AttackSpeed
            </label>
            <label>
              <input type="checkbox" {...register('Options.VisibleByDefault')} /> VisibleByDefault
            </label>
            <label>
              <input type="checkbox" {...register('Options.Invisible')} /> Invisible
            </label>
            <label>
              <input type="checkbox" {...register('Options.Collidable')} /> Collidable
            </label>
            <label>
              <input type="checkbox" {...register('Options.DigOutOfGround')} /> DigOutOfGround
            </label>
            <select {...register('Options.Despawn')}>
              <option value="">Despawn</option>
              {DespawnTypeArray.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input type="number" {...register('Options.FollowRange')} placeholder="FollowRange" className="input w-24" />
            <label>
              <input type="checkbox" {...register('Options.Glowing')} /> Glowing
            </label>
            <label>
              <input type="checkbox" {...register('Options.HealOnReload')} /> HealOnReload
            </label>
            <input type="number" {...register('Options.KnockbackResistance')} placeholder="KnockbackResistance" className="input w-24" />
            <input type="number" {...register('Options.MaxCombatDistance')} placeholder="MaxCombatDistance" className="input w-24" />
            <input type="number" {...register('Options.MovementSpeed')} placeholder="MovementSpeed" className="input w-24" />
            <label>
              <input type="checkbox" {...register('Options.Marker')} /> Marker
            </label>
            <label>
              <input type="checkbox" {...register('Options.Small')} /> Small
            </label>
            <label>
              <input type="checkbox" {...register('Options.LockPitch')} /> LockPitch
            </label>
            <label>
              <input type="checkbox" {...register('Options.Invincible')} /> Invincible
            </label>
            <label>
              <input type="checkbox" {...register('Options.Interactable')} /> Interactable
            </label>
            <label>
              <input type="checkbox" {...register('Options.NoAI')} /> NoAI
            </label>
            <input type="number" {...register('Options.NoDamageTicks')} placeholder="NoDamageTicks" className="input w-24" />
            <label>
              <input type="checkbox" {...register('Options.NoGravity')} /> NoGravity
            </label>
            <label>
              <input type="checkbox" {...register('Options.PassthroughDamage')} /> PassthroughDamage
            </label>
            <label>
              <input type="checkbox" {...register('Options.Persistent')} /> Persistent
            </label>
            <label>
              <input type="checkbox" {...register('Options.PreventItemPickup')} /> PreventItemPickup
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary">Generate YAML</button>
        <button type="button" className="btn ml-2" onClick={() => { reset(); setYamlOutput(''); }}>Reset</button>
      </form>

      {yamlOutput && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated YAML</h2>
          <pre className="bg-gray-600 p-4 rounded font-mono whitespace-pre-wrap">
            {yamlOutput}
          </pre>
        </div>
      )}
    </div>
  );
}

export function MythicMobOptionsForm({
  form,
  aiGoalArray,
  aiTargetArray,
  skillsArray,
  dropsArray,
  dmgModsArray,
}: {
  form: UseFormReturn<MobForm>,
  aiGoalArray: UseFieldArrayReturn<MobForm, "AIGoalSelectors">,
  aiTargetArray: UseFieldArrayReturn<MobForm, "AITargetSelectors">,
  skillsArray: UseFieldArrayReturn<MobForm, "Skills">,
  dropsArray: UseFieldArrayReturn<MobForm, "Drops">,
  dmgModsArray: UseFieldArrayReturn<MobForm, "DamageModifiers">,
}) {
  const { register } = form;

  return (
    <div>
      <input {...register('internalName', { required: true })} placeholder="Internal Name" className="input w-full" required />
      <select
        {...register('Type', { required: true })}
        className="input w-full"
        required
      >
        <option value="">Select Mob Type</option>
        {mobTypesArray.map((mob) => (
          <option key={mob} value={mob}>{mob}</option>
        ))}
      </select>
      <input {...register('Display')} placeholder="Display Name" className="input w-full" />
      <input {...register('Faction')} placeholder="Faction" className="input w-full" />
      <input {...register('Mount')} placeholder="Mount (InternalMobName)" className="input w-full" />
      <input type="number" {...register('Health')} placeholder="Health" className="input w-full" />
      <input type="number" {...register('Damage')} placeholder="Damage" className="input w-full" />
      <input type="number" {...register('Armor')} placeholder="Armor" className="input w-full" />

      {/* HealthBar */}
      <div>
        <label className="font-semibold">HealthBar</label>
        <div className="flex gap-2 items-center">
          <label>
            <input type="checkbox" {...register('HealthBar.Enabled')} /> Enabled
          </label>
          <input type="number" {...register('HealthBar.Offset')} placeholder="Offset" className="input w-24" />
        </div>
      </div>

      {/* BossBar */}
      <div>
        <label className="font-semibold">BossBar</label>
        <div className="flex gap-2 items-center flex-wrap">
          <label>
            <input type="checkbox" {...register('BossBar.Enabled')} /> Enabled
          </label>
          <input {...register('BossBar.Title')} placeholder="Title" className="input w-32" />
          <input type="number" {...register('BossBar.Range')} placeholder="Range" className="input w-20" />
          <select {...register('BossBar.Color')}>
            <option value="">Color</option>
            {BossBarColorArray.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select {...register('BossBar.Style')}>
            <option value="">Style</option>
            {BossBarStyleArray.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label>
            <input type="checkbox" {...register('BossBar.CreateFog')} /> CreateFog
          </label>
          <label>
            <input type="checkbox" {...register('BossBar.DarkenSky')} /> DarkenSky
          </label>
          <label>
            <input type="checkbox" {...register('BossBar.PlayMusic')} /> PlayMusic
          </label>
        </div>
      </div>

      {/* AIGoalSelectors */}
      <div>
        <label className="font-semibold">AIGoalSelectors</label>
        {aiGoalArray.fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`AIGoalSelectors.${idx}.value`)} placeholder="e.g. 0 clear" className="input" />
            <button type="button" onClick={() => aiGoalArray.remove(idx)} className="btn">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => aiGoalArray.append({ value: '' })} className="btn">Add Goal</button>
      </div>

      {/* AITargetSelectors */}
      <div>
        <label className="font-semibold">AITargetSelectors</label>
        {aiTargetArray.fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`AITargetSelectors.${idx}.value`)} placeholder="e.g. 0 clear" className="input" />
            <button type="button" onClick={() => aiTargetArray.remove(idx)} className="btn">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => aiTargetArray.append({ value: '' })} className="btn">Add Target</button>
      </div>

      {/* Skills */}
      <div>
        <label className="font-semibold">Skills</label>
        {skillsArray.fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`Skills.${idx}.value`)} placeholder="Skill String" className="input" />
            <button type="button" onClick={() => skillsArray.remove(idx)} className="btn">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => skillsArray.append({ value: '' })} className="btn">Add Skill</button>
      </div>

      {/* Drops */}
      <div>
        <label className="font-semibold">Drops</label>
        {dropsArray.fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`Drops.${idx}.value`)} placeholder="Drop String" className="input" />
            <button type="button" onClick={() => dropsArray.remove(idx)} className="btn">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => dropsArray.append({ value: '' })} className="btn">Add Drop</button>
      </div>

      {/* DamageModifiers */}
      <div>
        <label className="font-semibold">DamageModifiers</label>
        {dmgModsArray.fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input {...register(`DamageModifiers.${idx}.value`)} placeholder="DamageType Multiplier (e.g. PROJECTILE 0.5)" className="input" />
            <button type="button" onClick={() => dmgModsArray.remove(idx)} className="btn">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => dmgModsArray.append({ value: '' })} className="btn">Add Modifier</button>
      </div>

      {/* Equipment */}
      <div>
        <label className="font-semibold">Equipment</label>
        <div className="flex gap-2 flex-wrap">
          <input {...register('Equipment.MainHand')} placeholder="MainHand" className="input w-28" />
          <input {...register('Equipment.Helmet')} placeholder="Helmet" className="input w-28" />
          <input {...register('Equipment.Chestplate')} placeholder="Chestplate" className="input w-28" />
          <input {...register('Equipment.Leggings')} placeholder="Leggings" className="input w-28" />
          <input {...register('Equipment.Boots')} placeholder="Boots" className="input w-28" />
        </div>
      </div>

      {/* Options */}
      <div>
        <label className="font-semibold">Options</label>
        <div className="flex gap-4 flex-wrap items-center">
          <label>
            <input type="checkbox" {...register('Options.AlwaysShowName')} /> AlwaysShowName
          </label>
          <label>
            <input type="checkbox" {...register('Options.AttackSpeed')} /> AttackSpeed
          </label>
          <label>
            <input type="checkbox" {...register('Options.VisibleByDefault')} /> VisibleByDefault
          </label>
          <label>
            <input type="checkbox" {...register('Options.Invisible')} /> Invisible
          </label>
          <label>
            <input type="checkbox" {...register('Options.Collidable')} /> Collidable
          </label>
          <label>
            <input type="checkbox" {...register('Options.DigOutOfGround')} /> DigOutOfGround
          </label>
          <select {...register('Options.Despawn')}>
            <option value="">Despawn</option>
            {DespawnTypeArray.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input type="number" {...register('Options.FollowRange')} placeholder="FollowRange" className="input w-24" />
          <label>
            <input type="checkbox" {...register('Options.Glowing')} /> Glowing
          </label>
          <label>
            <input type="checkbox" {...register('Options.HealOnReload')} /> HealOnReload
          </label>
          <input type="number" {...register('Options.KnockbackResistance')} placeholder="KnockbackResistance" className="input w-24" />
          <input type="number" {...register('Options.MaxCombatDistance')} placeholder="MaxCombatDistance" className="input w-24" />
          <input type="number" {...register('Options.MovementSpeed')} placeholder="MovementSpeed" className="input w-24" />
          <label>
            <input type="checkbox" {...register('Options.Marker')} /> Marker
          </label>
          <label>
            <input type="checkbox" {...register('Options.Small')} /> Small
          </label>
          <label>
            <input type="checkbox" {...register('Options.LockPitch')} /> LockPitch
          </label>
          <label>
            <input type="checkbox" {...register('Options.Invincible')} /> Invincible
          </label>
          <label>
            <input type="checkbox" {...register('Options.Interactable')} /> Interactable
          </label>
          <label>
            <input type="checkbox" {...register('Options.NoAI')} /> NoAI
          </label>
          <input type="number" {...register('Options.NoDamageTicks')} placeholder="NoDamageTicks" className="input w-24" />
          <label>
            <input type="checkbox" {...register('Options.NoGravity')} /> NoGravity
          </label>
          <label>
            <input type="checkbox" {...register('Options.PassthroughDamage')} /> PassthroughDamage
          </label>
          <label>
            <input type="checkbox" {...register('Options.Persistent')} /> Persistent
          </label>
          <label>
            <input type="checkbox" {...register('Options.PreventItemPickup')} /> PreventItemPickup
          </label>
        </div>
      </div>
    </div>
  );
}

export function MythicMobCodeBlock({ values }: { values: MobForm }) {
  const yamlOutput = values.internalName && values.Type
    ? yaml.dump(mobFormToYaml(values), { lineWidth: 120 })
    : "";
  return (
    <pre className="overflow-x-auto text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded">
      <code className="whitespace-pre-wrap">{yamlOutput}</code>
    </pre>
  );
}